from app.models import db, AttendanceSession, AttendanceParticipant

def calculate_attendance_summary(student_id, batch_id):
    """
    Calculates overall attendance metrics and present streak for a student in a batch.
    
    Formula:
      attendance_percentage = (present_sessions / total_sessions) * 100
      present_streak = consecutive Present records starting from most recent session.
    """

    records = db.session.query(AttendanceParticipant, AttendanceSession)\
        .join(AttendanceSession, AttendanceParticipant.session_id == AttendanceSession.id)\
        .filter(AttendanceSession.batch_id == batch_id)\
        .filter(AttendanceParticipant.student_id == student_id)\
        .order_by(AttendanceSession.session_date.desc(), AttendanceSession.id.desc())\
        .all()

    total_sessions = len(records)
    if total_sessions == 0:
        return {
            "attendance_percentage": 0,
            "total_sessions": 0,
            "present_sessions": 0,
            "absent_sessions": 0,
            "present_streak": 0
        }

    present_sessions = 0
    absent_sessions = 0
    present_streak = 0
    streak_broken = False

    for participant, session in records:
        if participant.status == 'Present':
            present_sessions += 1
            if not streak_broken:
                present_streak += 1
        else:
            absent_sessions += 1
            streak_broken = True

    
    attendance_pct = round((present_sessions / total_sessions) * 100, 1)

    if attendance_pct.is_integer():
        attendance_pct = int(attendance_pct)

    return {
        "attendance_percentage": attendance_pct,
        "total_sessions": total_sessions,
        "present_sessions": present_sessions,
        "absent_sessions": absent_sessions,
        "present_streak": present_streak
    }
