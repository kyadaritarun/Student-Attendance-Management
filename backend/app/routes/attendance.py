from flask import Blueprint, jsonify
from app.models import db, Batch, StudentBatch, AttendanceSession, AttendanceParticipant
from app.utils.auth_decorator import jwt_required, check_student_batch_access
from app.utils.calculations import calculate_attendance_summary

attendance_bp = Blueprint('attendance', __name__)

@attendance_bp.route('/student/batches', methods=['GET'])
@jwt_required
def get_student_batches(current_user):
    """Return the authenticated student's enrolled batches."""
    student_batches = StudentBatch.query.filter_by(student_id=current_user.id).all()
    batch_ids = [sb.batch_id for sb in student_batches]
    
    batches = Batch.query.filter(Batch.id.in_(batch_ids)).all() if batch_ids else []
    
    return jsonify({
        "success": True,
        "batches": [b.to_dict() for b in batches]
    }), 200


@attendance_bp.route('/student/batches/<int:batch_id>/attendance/summary', methods=['GET'])
@jwt_required
def get_attendance_summary(current_user, batch_id):
    """Return attendance summary metrics for the selected batch."""
    batch = Batch.query.get(batch_id)
    if not batch:
        return jsonify({
            "success": False,
            "message": "Batch not found"
        }), 404

    # Verify authorization
    if not check_student_batch_access(current_user.id, batch_id):
        return jsonify({
            "success": False,
            "message": "You are not enrolled in this batch"
        }), 403

    summary = calculate_attendance_summary(current_user.id, batch_id)

    return jsonify({
        "success": True,
        "batch": {
            "id": batch.id,
            "name": batch.batch_name,
            "batch_code": batch.batch_code,
            "course_name": batch.course_name
        },
        "summary": summary
    }), 200


@attendance_bp.route('/student/batches/<int:batch_id>/attendance', methods=['GET'])
@jwt_required
def get_attendance_details(current_user, batch_id):
    """Return session-by-session attendance records for student and batch, sorted newest date first."""
    batch = Batch.query.get(batch_id)
    if not batch:
        return jsonify({
            "success": False,
            "message": "Batch not found"
        }), 404

    # Verify authorization
    if not check_student_batch_access(current_user.id, batch_id):
        return jsonify({
            "success": False,
            "message": "You are not enrolled in this batch"
        }), 403

    records = db.session.query(AttendanceParticipant, AttendanceSession)\
        .join(AttendanceSession, AttendanceParticipant.session_id == AttendanceSession.id)\
        .filter(AttendanceSession.batch_id == batch_id)\
        .filter(AttendanceParticipant.student_id == current_user.id)\
        .order_by(AttendanceSession.session_date.desc(), AttendanceSession.id.desc())\
        .all()

    attendance_list = []
    for participant, session in records:
        attendance_list.append({
            "session_id": session.id,
            "session_title": session.session_title,
            "date": session.session_date.isoformat(),
            "status": participant.status,
            "attended_duration": participant.attended_duration_minutes,
            "total_duration": session.total_duration_minutes,
            "attendance_percentage": float(participant.attendance_percentage) if participant.attendance_percentage is not None else (100 if participant.status == 'Present' else 0)
        })

    return jsonify({
        "success": True,
        "batch": {
            "id": batch.id,
            "name": batch.batch_name,
            "batch_code": batch.batch_code,
            "course_name": batch.course_name
        },
        "attendance": attendance_list
    }), 200
