import jwt
from functools import wraps
from flask import request, jsonify, current_app
from app.models import User, StudentBatch

def generate_token(user_id, student_id):
    """Generates a JWT token for authenticated student."""
    payload = {
        'user_id': user_id,
        'student_id': student_id
    }
    secret = current_app.config['SECRET_KEY']
    return jwt.encode(payload, secret, algorithm='HS256')

def jwt_required(f):
    """Decorator to enforce JWT Bearer Token on protected endpoints."""
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify({
                "success": False,
                "message": "Authorization header missing"
            }), 401
        
        parts = auth_header.split()
        if len(parts) != 2 or parts[0].lower() != 'bearer':
            return jsonify({
                "success": False,
                "message": "Invalid Authorization header format. Expected 'Bearer <token>'"
            }), 401

        token = parts[1]
        try:
            payload = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = User.query.get(payload['user_id'])
            if not current_user:
                return jsonify({
                    "success": False,
                    "message": "User not found"
                }), 401
        except jwt.ExpiredSignatureError:
            return jsonify({
                "success": False,
                "message": "Token has expired"
            }), 401
        except jwt.InvalidTokenError:
            return jsonify({
                "success": False,
                "message": "Invalid token"
            }), 401

        return f(current_user, *args, **kwargs)
    return decorated

def check_student_batch_access(student_id, batch_id):
    """Checks if student is enrolled in specified batch."""
    return StudentBatch.query.filter_by(student_id=student_id, batch_id=batch_id).first() is not None
