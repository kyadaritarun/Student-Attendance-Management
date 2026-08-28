import os
import random
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash
from app import create_app
from app.models import db, User, Batch, StudentBatch, AttendanceSession, AttendanceParticipant

FIRST_NAMES = [
    "Rahul", "Priya", "Amit", "Sneha", "Rohan", "Ananya", "Vikas", "Pooja",
    "Siddharth", "Kavya", "Aditya", "Neha", "Manish", "Riya", "Karan", "Shreya",
    "Deepak", "Nisha", "Arjun", "Tanvi", "Sanjay", "Swati", "Nikhil", "Divya",
    "Varun", "Megha", "Gaurav", "Ishita", "Aakash", "Simran", "Yash", "Bhavna",
    "Abhishek", "Preeti", "Kartik", "Sonam", "Alok", "Rashmi", "Tarun", "Jyoti",
    "Dev", "Aarti", "Harsh", "Komal", "Mayank", "Pallavi", "Rajesh", "Sakshi"
]

LAST_NAMES = [
    "Sharma", "Verma", "Gupta", "Singh", "Kumar", "Patel", "Reddy", "Nair",
    "Joshi", "Mehta", "Chawla", "Deshmukh", "Rao", "Bhat", "Agarwal", "Shah",
    "Kapoor", "Malhotra", "Saxena", "Choudhury", "Pillai", "Trivedi", "Banerjee", "Dutta"
]

BATCH_DATA = [
    {
        "batch_code": "FS-2026-01",
        "batch_name": "Full Stack Web Development",
        "course_name": "Full Stack Engineering",
        "description": "Master React, Node.js, Python Flask, SQL, and DevOps workflows."
    },
    {
        "batch_code": "MAD-2026-02",
        "batch_name": "Mobile Application Development",
        "course_name": "Cross-Platform Mobile Dev",
        "description": "Build high performance mobile applications with React Native & Flutter."
    },
    {
        "batch_code": "DS-2026-03",
        "batch_name": "Data Science & Analytics",
        "course_name": "Applied Data Science",
        "description": "Exploratory data analysis, Machine Learning models, Pandas, and SQL."
    },
    {
        "batch_code": "AIML-2026-04",
        "batch_name": "Artificial Intelligence & ML",
        "course_name": "AI Systems Architecture",
        "description": "Deep learning, Neural Networks, PyTorch, and Large Language Models."
    },
    {
        "batch_code": "CLOUD-2026-05",
        "batch_name": "Cloud & DevOps Engineering",
        "course_name": "Cloud Solutions Architecture",
        "description": "Docker, Kubernetes, AWS, CI/CD pipelines, and infrastructure as code."
    },
    {
        "batch_code": "CYBER-2026-06",
        "batch_name": "Cybersecurity & Ethical Hacking",
        "course_name": "Information Security",
        "description": "Network security, vulnerability assessment, penetration testing, and cryptography."
    }
]

SESSION_TOPICS = {
    "FS-2026-01": [
        "HTML5 & Semantic Web Structure", "CSS3 Grid & Flexbox Masterclass", "Modern JS & ES6 Concepts",
        "Asynchronous JS & Promises", "React Functional Components & Props", "React State & Hooks (useState, useEffect)",
        "React Context API & State Management", "React Router v6 Navigation", "Form Handling & Client Validation",
        "Custom Hooks in React", "Flask REST API Basics", "SQLAlchemy Models & Migrations",
        "RESTful Endpoints & Request Handling", "Password Hashing & JWT Auth", "PostgreSQL Joins & Queries",
        "API Error Handling & Middleware", "Full Stack Integration & Axios", "State Persistence & LocalStorage",
        "Unit Testing Backend with Pytest", "Docker Containerization", "Deployment to Render & Vercel", "Final Project Code Review"
    ],
    "MAD-2026-02": [
        "Mobile UX Principles", "React Native CLI Setup", "JSX Components & Styling",
        "Flexbox Mobile Layouts", "Navigation Stacks & Tabs", "State Management in Mobile",
        "Fetching Remote APIs", "Handling Touch & Gestures", "Native Camera Integration",
        "AsyncStorage & Local Storage", "Push Notifications Setup", "App Performance Tuning"
    ],
    "DS-2026-03": [
        "Python Data Structures", "NumPy Vectorized Operations", "Pandas DataFrames Wrangling",
        "Data Cleaning & Imputation", "Matplotlib & Seaborn Visualization", "Statistical Analysis Basics",
        "Linear & Logistic Regression", "Decision Trees & Random Forests", "Feature Engineering Strategies",
        "Model Evaluation & Cross-Validation", "SQL for Data Science", "Deploying Models with Flask"
    ],
    "AIML-2026-04": [
        "Intro to Artificial Intelligence", "Linear Algebra for ML", "Gradient Descent & Optimization",
        "PyTorch Tensor Operations", "Building Neural Networks", "Activation Functions & Loss",
        "Convolutional Neural Networks (CNN)", "Recurrent Neural Networks (RNN)", "Transformers Architecture",
        "Fine-tuning Open Source Models", "Prompt Engineering Techniques", "Model Deployment Pipelines"
    ],
    "CLOUD-2026-05": [
        "Linux Fundamentals for Cloud", "Git Branching & GitHub Actions", "Docker Build & Image Management",
        "Docker Compose Multi-Container Setup", "Kubernetes Pods & Deployments", "Kubernetes Services & Ingress",
        "AWS EC2 & Security Groups", "AWS S3 & Relational Databases", "Terraform Infrastructure as Code",
        "Monitoring with Prometheus & Grafana", "CI/CD Pipeline Optimization", "Production Troubleshooting"
    ],
    "CYBER-2026-06": [
        "Networking Fundamentals & TCP/IP", "Linux Security & Command Line", "Wireshark Packet Analysis",
        "Vulnerability Scanning with Nmap", "Web Application Vulnerabilities (OWASP)", "SQL Injection & XSS Lab",
        "Authentication & OAuth Security", "Cryptography & SSL/TLS Protocols", "Incident Response Basics",
        "Penetration Testing Methodology", "Security Auditing & Compliance", "Ethical Hacking Capstone"
    ]
}

def seed_database():
    app = create_app()
    with app.app_context():
        print("[SEED] Resetting and initializing database (using CASCADE drop)...")
       
        try:
            db.session.execute(db.text("DROP TABLE IF EXISTS attendance_participants CASCADE;"))
            db.session.execute(db.text("DROP TABLE IF EXISTS attendance_sessions CASCADE;"))
            db.session.execute(db.text("DROP TABLE IF EXISTS student_batches CASCADE;"))
            db.session.execute(db.text("DROP TABLE IF EXISTS batches CASCADE;"))
            db.session.execute(db.text("DROP TABLE IF EXISTS users CASCADE;"))
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            print(f"[SEED Warning] Cascade table drop note: {e}")

      
        try:
            db.drop_all()
        except Exception:
            pass
            
        db.create_all()

      
        print("[SEED] Creating batches...")
        batches = []
        for b_info in BATCH_DATA:
            batch = Batch(
                batch_code=b_info["batch_code"],
                batch_name=b_info["batch_name"],
                course_name=b_info["course_name"],
                description=b_info["description"],
                start_date=datetime.now().date() - timedelta(days=60),
                end_date=datetime.now().date() + timedelta(days=60)
            )
            db.session.add(batch)
            batches.append(batch)
        db.session.commit()

      
        print("[SEED] Creating 150+ students...")
        default_hash = generate_password_hash("Student@123")
        
        test_student = User(
            student_id="STU1001",
            name="Rahul Sharma",
            email="rahul@example.com",
            password_hash=default_hash,
            phone="+91 9876543210",
            profile_image="https://api.dicebear.com/7.x/avataaars/svg?seed=STU1001"
        )
        db.session.add(test_student)

       
        all_students = [test_student]
        for i in range(1002, 1151):
            s_id = f"STU{i}"
            fname = random.choice(FIRST_NAMES)
            lname = random.choice(LAST_NAMES)
            name = f"{fname} {lname}"
            email = f"{fname.lower()}.{lname.lower()}{i}@example.com"
            student = User(
                student_id=s_id,
                name=name,
                email=email,
                password_hash=default_hash,
                phone=f"+91 98{random.randint(10000000, 99999999)}",
                profile_image=f"https://api.dicebear.com/7.x/avataaars/svg?seed={s_id}"
            )
            db.session.add(student)
            all_students.append(student)

        db.session.commit()


        print("[SEED] Enrolling students into batches...")
      
        db.session.add(StudentBatch(student_id=test_student.id, batch_id=batches[0].id))
        db.session.add(StudentBatch(student_id=test_student.id, batch_id=batches[2].id))
        db.session.add(StudentBatch(student_id=test_student.id, batch_id=batches[4].id))

       
        for student in all_students[1:]:
            enrolled = random.sample(batches, k=random.randint(2, 4))
            for b in enrolled:
                db.session.add(StudentBatch(student_id=student.id, batch_id=b.id))
        
        db.session.commit()

    
        print("[SEED] Generating attendance sessions & student records...")
        today = datetime.now().date()
        
        total_participants_count = 0
        
        for batch in batches:
            topics = SESSION_TOPICS.get(batch.batch_code, ["Session General"])
            enrolled_student_ids = [
                sb.student_id for sb in StudentBatch.query.filter_by(batch_id=batch.id).all()
            ]

            num_sessions = len(topics)
            for idx, topic in enumerate(topics):
                session_date = today - timedelta(days=(num_sessions - idx) * 2)
                
                session = AttendanceSession(
                    batch_id=batch.id,
                    session_title=topic,
                    session_date=session_date,
                    start_time=datetime.strptime("10:00", "%H:%M").time(),
                    end_time=datetime.strptime("11:30", "%H:%M").time(),
                    total_duration_minutes=90
                )
                db.session.add(session)
                db.session.flush()

                for s_id in enrolled_student_ids:
                    if s_id == test_student.id and batch.batch_code == "FS-2026-01":
                        if idx >= len(topics) - 3:
                            status = "Present"
                        elif idx == len(topics) - 4:
                            status = "Absent"
                        else:
                            status = "Present" if idx % 5 != 0 else "Absent"
                    else:
                        status = "Present" if random.random() < 0.85 else "Absent"

                    attended_duration = 90 if status == "Present" else 0
                    pct = 100.0 if status == "Present" else 0.0

                    participant = AttendanceParticipant(
                        session_id=session.id,
                        student_id=s_id,
                        status=status,
                        attended_duration_minutes=attended_duration,
                        attendance_percentage=pct
                    )
                    db.session.add(participant)
                    total_participants_count += 1

        db.session.commit()

        print("\n" + "="*50)
        print("DATABASE SEEDING COMPLETED SUCCESSFULLY!")
        print("="*50)
        print(f" Students Created      : {len(all_students)}")
        print(f" Batches Created       : {len(batches)}")
        print(f" Attendance Sessions   : {sum(len(v) for v in SESSION_TOPICS.values())}")
        print(f" Attendance Records    : {total_participants_count}")
        print("-"*50)
        print("TEST ACCOUNT CREDENTIALS:")
        print("   Student ID : STU1001")
        print("   Password   : Student@123")
        print("   Email      : rahul@example.com")
        print("="*50 + "\n")

if __name__ == '__main__':
    seed_database()
