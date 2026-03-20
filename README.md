<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=40&pause=1000&color=2A6FDB&center=true&vCenter=true&width=500&lines=MIS+System;+Scool+Data+Management;Built+for+Education" alt="Typing SVG" />

<br/>

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0b1628,2a6fdb&height=120&section=header&text=Management%20Information%20System&fontSize=28&fontColor=eef3fb&fontAlignY=65&animation=fadeIn" />

<br/>

![Version](https://img.shields.io/badge/version-1.0.0-2a6fdb?style=for-the-badge&labelColor=060d1a)
![License](https://img.shields.io/badge/license-MIT-e8b84b?style=for-the-badge&labelColor=060d1a)
![Build](https://img.shields.io/badge/build-passing-2d6a4f?style=for-the-badge&labelColor=060d1a)
![Coverage](https://img.shields.io/badge/coverage-87%25-4a7c59?style=for-the-badge&labelColor=060d1a)
![Status](https://img.shields.io/badge/status-active-b84c2a?style=for-the-badge&labelColor=060d1a)

<br/>

*A comprehensive school data management platform — centralizing academic records, administrative workflows, and institutional reporting into one unified system.*

</div>

---

## Overview

MIS is a robust school data management system built to centralize and automate the administrative operations of educational institutions. From enrollment and grading to staff payroll and performance reporting, MIS serves as the operational backbone of a modern school — eliminating fragmented spreadsheets and manual record-keeping.

The system is organized into purpose-built modules, each addressing a distinct domain of school operations. Together they form an integrated, cohesive platform accessible to administrators, teachers, finance officers, parents, and students through role-based access control.

**Key goals:**

- Centralize all student, staff, and institutional data in one system
- Automate repetitive administrative tasks such as report card generation and fee notifications
- Enforce data privacy through granular, role-based access control
- Provide data-driven dashboards and exportable reports for institutional leadership

---

## Core Modules

### 01 — Student Information Management

Complete lifecycle management for student records, covering enrollment, class assignment, progression tracking, and graduation archives. Supports bulk import and export of student data.

### 02 — Attendance Tracking

Daily and period-level attendance recording with automated alerts for excessive absences. Summary reporting is available by class, term, or academic year, with exportable CSV and PDF formats.

### 03 — Grades and Academic Records

Structured gradebook with configurable grading schemes, continuous assessment tracking, end-of-term scoring, and automatic GPA computation. Supports multiple grading systems and custom subject weighting.

### 04 — Staff and HR Management

Staff profiles, employment history, teaching load assignments, leave management, and payroll integration for all school personnel. Tracks qualifications, contracts, and performance reviews.

### 05 — Fee and Finance Management

Invoice generation, fee payment tracking, outstanding balance notifications, scholarship management, and end-of-period financial summaries. Integrates with payment gateways for online fee collection.

### 06 — Timetable and Scheduling

Visual class schedule builder with conflict detection, room assignment, teacher availability management, and calendar export support. Handles recurring schedules and term-based changes.

### 07 — Reports and Analytics

Institution-wide dashboards with drill-down capability, exportable PDF reports for parents, and data-driven insights for school leadership. Includes performance trends, attendance rates, and financial summaries.

## User Roles

| Role | Description | Key Permissions |
|------|-------------|-----------------|
| Super Admin | Full system access | System configuration, user role management, audit logs, school setup |
| School Admin | Daily institutional operations | Student enrollment, staff management, academic calendar, reports |
| Teacher | Classroom-level access | Attendance entry, grade submission, timetable, student performance |
| Finance Officer | Financial data only | Fee invoices, payment processing, financial reports, scholarships |
| Parent / Guardian | Read-only child data | Child profile, attendance summary, fee statements, report cards |
| Student | Read-only personal data | Own grades, attendance, timetable, and school notices |

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React.js + Vite + TailwindCSS | Component-driven UI for all dashboards and portals |
| Backend | Node.js + Express | Business logic, authentication, and data processing |
| Database | PostgreSQL via Prisma ORM | Relational data storage for all institutional records |
| Authentication | JWT + Refresh Tokens + bcrypt | Secure session management and role enforcement |
| File Storage | AWS S3 / Local Storage (configurable) | Document uploads, profile photos, and report PDFs |
| Email | Nodemailer + SMTP / SendGrid | Automated notifications, fee alerts, report delivery |
| Testing | Jest + Supertest + GitHub Actions | Unit, integration, and end-to-end test coverage |
| Deployment | Docker + docker-compose + Nginx | Containerized deployment for on-premise or cloud hosting |

---

## Installation

### Prerequisites

Ensure the following are installed on your system before proceeding:

- Node.js v18 or higher
- PostgreSQL 14 or higher
- npm v9 or higher
- Docker and docker-compose (for production deployment)

### Step 1 — Clone the Repository

```bash
git clone https://github.com/your-org/mis.git
cd mis
```

### Step 2 — Configure Environment Variables

```bash
cp .env.example .env
# Open .env and update the required values
```

See the [Environment Variables](#environment-variables) section for a full reference.

### Step 3 — Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client && npm install
```

### Step 4 — Run Database Migrations

```bash
npx prisma migrate dev --name init

# Optional: seed the database with demo data
npx prisma db seed
```

### Step 5 — Start the Development Server

```bash
# From the project root — starts both API and frontend concurrently
npm run dev
```

- Backend API runs on `http://localhost:5000`
- Frontend application runs on `http://localhost:3000`

### Step 6 — Production Deployment with Docker

```bash
docker-compose -f docker-compose.prod.yml up --build -d
```

The application will be available at your configured domain. Nginx handles reverse proxying and SSL termination.

---

## Project Structure

```
mis/
├── client/                  # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route-level page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API call abstractions
│   │   └── store/           # Global state management
│   └── public/
├── server/                  # Node.js + Express API
│   ├── controllers/         # Route handler logic
│   ├── routes/              # API route definitions
│   ├── middleware/           # Auth, logging, error handling
│   ├── services/            # Business logic layer
│   └── utils/               # Helpers and shared utilities
├── prisma/                  # Database schema and migrations
│   ├── schema.prisma
│   ├── seed.js
│   └── migrations/
├── tests/                   # Unit and integration test suites
│   ├── unit/
│   └── integration/
├── docs/                    # API documentation and diagrams
├── docker-compose.yml
├── docker-compose.prod.yml
├── .env.example
└── README.md
```

---

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/mis_db

# Authentication
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=your-refresh-token-secret

# Email
SMTP_HOST=smtp.yourmailprovider.com
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASS=your-email-password

# File Storage
STORAGE_PROVIDER=local            # or 's3'
AWS_ACCESS_KEY_ID=                 # required if STORAGE_PROVIDER=s3
AWS_SECRET_ACCESS_KEY=             # required if STORAGE_PROVIDER=s3
AWS_S3_BUCKET=                     # required if STORAGE_PROVIDER=s3

# Application
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

---

## Running Tests

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Run tests with coverage report
npm run test:coverage

# Run linter
npm run lint

# Auto-fix linting issues
npm run lint:fix
```

---

## Contributing

Contributions are welcome and appreciated. MIS follows a standard Git-based workflow to ensure code quality and maintainability are preserved.

### Workflow

1. **Fork the repository** and clone your fork locally.
2. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Write tests** for any new feature or bug fix. Pull requests without test coverage will not be merged.
4. **Follow the code style.** Run `npm run lint` before committing.
5. **Commit with a clear message** following conventional commit format:
   ```
   feat: add guardian email notification on fee overdue
   fix: correct GPA calculation for weighted subjects
   docs: update installation guide for Docker deployment
   ```
6. **Open a pull request** against `main` with a clear description of the change and the problem it solves.

### Branch Naming Convention

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/name` | `feature/attendance-export` |
| Bug fix | `fix/name` | `fix/login-redirect-loop` |
| Documentation | `docs/name` | `docs/api-reference-update` |
| Refactor | `refactor/name` | `refactor/grade-service-logic` |

---
<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=2a6fdb,0b1628&height=100&section=footer&animation=fadeIn" />

*MIS — Built for educational institutions. Maintained by the MIS development team.*

</div>
