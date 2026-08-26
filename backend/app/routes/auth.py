from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from app.models import User
from app.utils.auth_decorator import generate_token

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/student/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    student_id = data.get('student_id')
    password = data.get('password')

    if not student_id or not password:
        return jsonify({
            "success": False,
            "message": "Student ID and password are required"
        }), 400

    student = User.query.filter_by(student_id=student_id.strip()).first()
    
    if not student or not check_password_hash(student.password_hash, password):
        return jsonify({
            "success": False,
            "message": "Invalid student ID or password"
        }), 401

    token = generate_token(student.id, student.student_id)

    return jsonify({
        "success": True,
        "message": "Login successful",
        "token": token,
        "student": student.to_dict()
    }), 200
