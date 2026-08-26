# 🎓 Student Attendance Web Application

A full-stack, mobile-first **Student Attendance Management Web Application** engineered with a modern **React (JSX) + Vite** frontend, a **Flask RESTful API** backend with SQLAlchemy ORM, and a **PostgreSQL** relational database.

---

## 🌟 Key Features

* **Mobile-First Responsive Dashboard**: Tailored for screens down to 320px up to desktop viewports with glassmorphism UI, smooth micro-animations, and fluid typography.
* **Database-Driven Metrics**: Real-time calculated overall attendance percentage `(present_sessions / total_sessions * 100)` and consecutive **Present Streak** logic computed dynamically from PostgreSQL records.
* **JWT Authenticated Portal**: Password hashing with Werkzeug and secure JWT Bearer token authentication.
* **150+ Seeded Students**: Database seeder script creating 150+ realistic students, 6 active batches, 20+ attendance sessions per batch, and over 15,000+ session records.
* **Accessible Visual Indicators**: Explicit text labels and distinct color accents (`✓ Present` vs `✕ Absent`) ensuring full accessibility.
* **Batch Switching & Filtering**: Seamlessly toggle enrolled batches and filter session history by status (`All`, `Present`, `Absent`).

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React (JSX), Vite, React Router v6, Axios, Lucide Icons, CSS3 / Custom Glassmorphism System |
| **Backend** | Python 3.10+, Flask, Flask-RESTful APIs, Flask-CORS, PyJWT, Werkzeug |
| **Database & ORM** | PostgreSQL 15, SQLAlchemy ORM |
| **DevOps & Tools** | Docker, Docker Compose, Pytest, Dotenv |

---

## 🔑 Test Account Credentials

The database seeder automatically initializes a known test student account for evaluation:

```text
Student ID : STU1001
Password   : Student@123
Name       : Rahul Sharma
Email      : rahul@example.com
```

---

## 📁 Directory Structure

```text
student-attendance-app/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py          # Flask App Factory & CORS setup
│   │   ├── config.py            # Environment Configuration & DB Settings
│   │   ├── models/              # SQLAlchemy Models (User, Batch, Attendance)
│   │   ├── routes/              # REST API Blueprints (auth, attendance)
│   │   └── utils/               # JWT auth decorator & streak calculation engine
│   ├── tests/                   # Pytest API unit tests
│   │   └── test_api.py
│   ├── seed.py                  # Seeder (150+ students, batches, 15k+ records)
│   ├── run.py                   # App server entrypoint
│   ├── requirements.txt         # Python dependencies
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # LoginPage & DashboardPage
│   │   ├── services/            # Axios API & service layers
│   │   ├── context/             # AuthContext provider
│   │   ├── styles/              # Global Glassmorphism CSS design system
│   │   ├── App.jsx              # React Router setup & protected routes
│   │   └── main.jsx             # React entrypoint
│   ├── package.json
│   └── vite.config.js
│
├── database/
│   └── schema.sql               # PostgreSQL DDL table definitions
│
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

## 🚀 Local Development Setup

### 1. Prerequisites
Ensure you have the following installed:
* **Python** (v3.10 or higher)
* **Node.js** (v18 or higher) & `npm`
* **PostgreSQL** (v14 or higher)

---

### 2. Database Setup
1. Create a PostgreSQL database:
   ```sql
   CREATE DATABASE student_attendance;
   ```
2. (Optional) Run the raw SQL DDL schema script if not letting SQLAlchemy create tables automatically:
   ```bash
   psql -U postgres -d student_attendance -f database/schema.sql
   ```

---

### 3. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a Python virtual environment:
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS / Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create `.env` file inside `backend/`:
   ```bash
   cp .env.example .env
   ```
   *Edit `.env` to configure your PostgreSQL credentials (`DATABASE_URL`).*

5. Run the Database Seed Script (Generates 150+ students, batches, sessions & records):
   ```bash
   python seed.py
   ```

6. Start the Flask REST API server:
   ```bash
   python run.py
   ```
   *Backend server will start running on `http://localhost:5000`.*

---

### 4. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file inside `frontend/`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *Frontend application will open on `http://localhost:5173`.*

---

## 🧪 Running Backend Unit Tests

Run automated Pytest backend tests covering login authentication, token verification, batch authorization, and present streak calculation logic:

```bash
cd backend
pytest -v
```

---

## 🐳 Docker Deployment Setup

To launch the complete application stack (PostgreSQL + Flask + React) with Docker Compose:

```bash
docker-compose up --build
```
* Access Frontend: `http://localhost`
* Access Backend API: `http://localhost:5000`

---

## 📖 REST API Documentation

### 1. Student Login
* **POST** `/api/student/login`

**Request Body:**
```json
{
  "student_id": "STU1001",
  "password": "Student@123"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "student": {
    "id": 1,
    "student_id": "STU1001",
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "profile_image": "https://api.dicebear.com/7.x/avataaars/svg?seed=STU1001"
  }
}
```

---

### 2. Enrolled Batches
* **GET** `/api/student/batches`
* **Header**: `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "success": true,
  "batches": [
    {
      "id": 1,
      "batch_code": "FS-2026-01",
      "batch_name": "Full Stack Web Development",
      "course_name": "Full Stack Engineering",
      "description": "Master React, Node.js, Python Flask, SQL..."
    }
  ]
}
```

---

### 3. Attendance Summary
* **GET** `/api/student/batches/<batch_id>/attendance/summary`
* **Header**: `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "success": true,
  "batch": {
    "id": 1,
    "name": "Full Stack Web Development",
    "batch_code": "FS-2026-01",
    "course_name": "Full Stack Engineering"
  },
  "summary": {
    "attendance_percentage": 80,
    "total_sessions": 22,
    "present_sessions": 18,
    "absent_sessions": 4,
    "present_streak": 3
  }
}
```

---

### 4. Attendance Session History
* **GET** `/api/student/batches/<batch_id>/attendance`
* **Header**: `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "success": true,
  "batch": {
    "id": 1,
    "name": "Full Stack Web Development",
    "batch_code": "FS-2026-01"
  },
  "attendance": [
    {
      "session_id": 22,
      "session_title": "Final Project Code Review",
      "date": "2026-08-25",
      "status": "Present",
      "attended_duration": 90,
      "total_duration": 90,
      "attendance_percentage": 100
    },
    {
      "session_id": 21,
      "session_title": "Deployment to Render & Vercel",
      "date": "2026-08-23",
      "status": "Absent",
      "attended_duration": 0,
      "total_duration": 90,
      "attendance_percentage": 0
    }
  ]
}
```

---

## ⚙️ Environment Variables Reference

| Variable | Description | Default Value |
| :--- | :--- | :--- |
| `PORT` | Flask backend listening port | `5000` |
| `FLASK_ENV` | Environment mode (`development`/`production`) | `development` |
| `SECRET_KEY` | Secret key used for signing JWT tokens | `super-secret-jwt-attendance-key-2026` |
| `DATABASE_URL` | PostgreSQL connection URL | `postgresql://postgres:postgres@localhost:5432/student_attendance` |
| `VITE_API_URL` | Frontend API backend target endpoint | `http://localhost:5000/api` |

---

## 🌐 Production Deployment

* **Frontend**: Deploy `frontend/` to **Vercel** or **Netlify** (Set environment variable `VITE_API_URL=https://your-backend.onrender.com/api`).
* **Backend**: Deploy `backend/` to **Render** or **Railway** (Set `DATABASE_URL`, `SECRET_KEY`).
* **Database**: Provision PostgreSQL database on **Render PostgreSQL** or **Neon.tech**.
