from flask import Flask, jsonify
from flask_cors import CORS
from app.config import Config
from app.models import db

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

   
    db.init_app(app)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

   
    from app.routes.auth import auth_bp
    from app.routes.attendance import attendance_bp

    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(attendance_bp, url_prefix='/api')

    @app.route('/')
    def health_check():
        return jsonify({
            "status": "online",
            "service": "Student Attendance Management API"
        })

   
    @app.errorhandler(404)
    def not_found_error(error):
        return jsonify({
            "success": False,
            "message": "Resource not found"
        }), 404

    @app.errorhandler(500)
    def internal_error(error):
        db.session.rollback()
        return jsonify({
            "success": False,
            "message": "An internal server error occurred"
        }), 500

    return app
