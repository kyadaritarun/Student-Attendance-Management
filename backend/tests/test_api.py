import pytest
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash
from app import create_app
from app.config import TestConfig
from app.models import db, User, Batch, StudentBatch, AttendanceSession, AttendanceParticipant
from app.utils.calculations import calculate_attendance_summary

@pytest.fixture
def app():
    app = create_app(TestConfig)
    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def setup_test_data(app):
    with app.app_context():
        # User 1
        user1 = User(
            student_id="STU1001",
            name="Rahul Sharma",
            email="rahul@example.com",
            password_hash=generate_password_hash("Student@123")
        )
        # User 2
        user2 = User(
            student_id="STU1002",
            name="Priya Patel",
            email="priya@example.com",
            password_hash=generate_password_hash("Password@123")
        )
        db.session.add_all([user1, user2])
        db.session.commit()

        # Batch 1
        batch1 = Batch(
            batch_code="FS-2026-01",
            batch_name="Full Stack Development",
            course_name="Full Stack Web"
        )
        # Batch 2
        batch2 = Batch(
            batch_code="DS-2026-02",
            batch_name="Data Science",
            course_name="Data Science"
        )
        db.session.add_all([batch1, batch2])
        db.session.commit()

        # Enroll user1 in batch1, user2 in batch2
        sb1 = StudentBatch(student_id=user1.id, batch_id=batch1.id)
        sb2 = StudentBatch(student_id=user2.id, batch_id=batch2.id)
        db.session.add_all([sb1, sb2])
        db.session.commit()

        # Create sessions for batch 1
        s1 = AttendanceSession(batch_id=batch1.id, session_title="S1", session_date=datetime.now().date() - timedelta(days=4))
        s2 = AttendanceSession(batch_id=batch1.id, session_title="S2", session_date=datetime.now().date() - timedelta(days=3))
        s3 = AttendanceSession(batch_id=batch1.id, session_title="S3", session_date=datetime.now().date() - timedelta(days=2))
        s4 = AttendanceSession(batch_id=batch1.id, session_title="S4", session_date=datetime.now().date() - timedelta(days=1))
        db.session.add_all([s1, s2, s3, s4])
        db.session.commit()

        # Participants for user1 in batch1:
        # Aug 21 (S1): Present
        # Aug 22 (S2): Absent
        # Aug 23 (S3): Present
        # Aug 24 (S4): Present  -> Latest streak should be 2, Total=4, Present=3, Absent=1, % = 75
        p1 = AttendanceParticipant(session_id=s1.id, student_id=user1.id, status="Present", attended_duration_minutes=90, attendance_percentage=100)
        p2 = AttendanceParticipant(session_id=s2.id, student_id=user1.id, status="Absent", attended_duration_minutes=0, attendance_percentage=0)
        p3 = AttendanceParticipant(session_id=s3.id, student_id=user1.id, status="Present", attended_duration_minutes=90, attendance_percentage=100)
        p4 = AttendanceParticipant(session_id=s4.id, student_id=user1.id, status="Present", attended_duration_minutes=90, attendance_percentage=100)
        db.session.add_all([p1, p2, p3, p4])
        db.session.commit()

        return {
            "user1_id": user1.id,
            "user2_id": user2.id,
            "batch1_id": batch1.id,
            "batch2_id": batch2.id
        }

def test_login_success(client, setup_test_data):
    response = client.post('/api/student/login', json={
        "student_id": "STU1001",
        "password": "Student@123"
    })
    assert response.status_code == 200
    data = response.get_json()
    assert data["success"] is True
    assert "token" in data
    assert data["student"]["student_id"] == "STU1001"

def test_login_invalid_password(client, setup_test_data):
    response = client.post('/api/student/login', json={
        "student_id": "STU1001",
        "password": "WrongPassword"
    })
    assert response.status_code == 401
    data = response.get_json()
    assert data["success"] is False

def test_login_missing_fields(client):
    response = client.post('/api/student/login', json={
        "student_id": "STU1001"
    })
    assert response.status_code == 400

def test_get_batches_unauthorized(client):
    response = client.get('/api/student/batches')
    assert response.status_code == 401

def test_get_batches_success(client, setup_test_data):
    # Login to get token
    login_res = client.post('/api/student/login', json={
        "student_id": "STU1001",
        "password": "Student@123"
    })
    token = login_res.get_json()["token"]

    response = client.get('/api/student/batches', headers={
        "Authorization": f"Bearer {token}"
    })
    assert response.status_code == 200
    data = response.get_json()
    assert data["success"] is True
    assert len(data["batches"]) == 1
    assert data["batches"][0]["batch_code"] == "FS-2026-01"

def test_attendance_summary_calculation(client, setup_test_data):
    # Login user1
    login_res = client.post('/api/student/login', json={
        "student_id": "STU1001",
        "password": "Student@123"
    })
    token = login_res.get_json()["token"]
    batch1_id = setup_test_data["batch1_id"]

    response = client.get(f'/api/student/batches/{batch1_id}/attendance/summary', headers={
        "Authorization": f"Bearer {token}"
    })
    assert response.status_code == 200
    data = response.get_json()
    assert data["success"] is True
    summary = data["summary"]
    assert summary["total_sessions"] == 4
    assert summary["present_sessions"] == 3
    assert summary["absent_sessions"] == 1
    assert summary["attendance_percentage"] == 75
    assert summary["present_streak"] == 2

def test_unauthorized_batch_access(client, setup_test_data):
    # User1 attempts to access Batch2 (user1 is not enrolled in Batch2)
    login_res = client.post('/api/student/login', json={
        "student_id": "STU1001",
        "password": "Student@123"
    })
    token = login_res.get_json()["token"]
    batch2_id = setup_test_data["batch2_id"]

    response = client.get(f'/api/student/batches/{batch2_id}/attendance', headers={
        "Authorization": f"Bearer {token}"
    })
    assert response.status_code == 403
    data = response.get_json()
    assert data["success"] is False
