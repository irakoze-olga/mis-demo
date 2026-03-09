# School Management Information System

Front-end documentation. This file covers the UI layer only — backend and database are out of scope.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Modules](#modules)
- [Page Routes](#page-routes)
- [User Roles](#user-roles)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)

---

## Overview

The School MIS is a web application that manages the daily administrative and academic operations of a school. The interface serves four user roles: administrators, teachers, students, and parents. All data interactions are handled through a REST API.

---

## Tech Stack

| Technology       | Version | Purpose                        |
|------------------|---------|-------------------------------|
| React            | 18.x    | Core UI library                |
| TypeScript       | 5.x     | Type safety                    |
| Tailwind CSS     | 3.x     | Utility-first styling          |
| React Router     | v6      | Client-side routing            |
| Redux Toolkit    | 2.x     | Global state management        |
| Axios            | 1.x     | HTTP requests                  |
| Recharts         | 2.x     | Charts and data visualization  |
| React Hook Form  | 7.x     | Form handling and validation   |
| Zod              | 3.x     | Schema validation              |
| Vite             | 5.x     | Build tool and dev server      |

---

## Project Structure

```
school-mis-frontend/
├── public/
│   └── assets/
├── src/
│   ├── api/                # Axios instances and service calls
│   ├── assets/             # Images, icons, fonts
│   ├── components/
│   │   ├── common/         # Buttons, inputs, modals, tables
│   │   ├── layout/         # Sidebar, Header, Breadcrumbs
│   │   └── charts/         # Graph and analytics widgets
│   ├── pages/
│   │   ├── auth/           # Login, ForgotPassword
│   │   ├── dashboard/      # Role dashboards
│   │   ├── students/       # Student management
│   │   ├── teachers/       # Teacher management
│   │   ├── attendance/     # Attendance tracking
│   │   ├── grades/         # Grading and results
│   │   ├── timetable/      # Schedules
│   │   ├── fees/           # Fee management
│   │   ├── library/        # Library catalogue
│   │   ├── communication/  # Notices, messages
│   │   └── reports/        # Analytics and exports
│   ├── store/              # Redux slices and store config
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Helpers and constants
│   ├── types/              # TypeScript type definitions
│   ├── routes/             # Route guards and definitions
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## Modules

| Module          | Description                                                   |
|-----------------|---------------------------------------------------------------|
| Authentication  | Login, password reset, session management, JWT handling       |
| Dashboard       | Role-specific stat cards, charts, recent activity feed        |
| Students        | Enrollment, profiles, document uploads, academic history      |
| Teachers        | Profiles, subject assignments, workload, leave tracking       |
| Attendance      | Daily marking, bulk submission, absence notifications         |
| Grades          | Score entry, GPA calculation, report cards, term results      |
| Timetable       | Visual weekly schedule, builder, conflict detection           |
| Fees            | Invoices, payment status, receipts, overdue alerts            |
| Library         | Catalogue, book issue and return, borrower history            |
| Communication   | Announcements, internal messaging, event calendar             |
| Reports         | Analytics, exportable tables, printable report cards          |

---

## Page Routes

| Route              | Page               | Access              |
|--------------------|--------------------|---------------------|
| `/login`           | Login              | Public              |
| `/dashboard`       | Dashboard          | All roles           |
| `/students`        | Student list       | Admin, Teacher      |
| `/students/:id`    | Student profile    | Admin, Teacher      |
| `/students/add`    | Enroll student     | Admin               |
| `/teachers`        | Teacher list       | Admin               |
| `/attendance`      | Attendance sheet   | Admin, Teacher      |
| `/grades`          | Grade entry        | Teacher             |
| `/timetable`       | Class timetable    | All roles           |
| `/fees`            | Fee dashboard      | Admin               |
| `/library`         | Library catalogue  | Admin, Teacher      |
| `/messages`        | Communication hub  | All roles           |
| `/reports`         | Analytics reports  | Admin               |
| `/settings`        | System settings    | Admin               |

---

## User Roles

Access control is enforced at the route level using `ProtectedRoute` wrappers and Redux auth state.

| Role          | Description                                                      |
|---------------|------------------------------------------------------------------|
| super_admin   | Full system access. All modules, system settings, user creation. |
| admin         | Student and teacher management, reports, fee tracking.           |
| teacher       | Attendance marking, grade entry, timetable view, messaging.      |
| student       | View own results, timetable, notices, and library record.        |
| parent        | View child attendance, fee status, and results.                  |

---

## Getting Started

Node.js 18 or higher and npm 9 or higher are required.

```bash
# Clone the repository
git clone https://github.com/your-org/school-mis-frontend.git
cd school-mis-frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Environment Variables

Create a `.env` file in the project root. Never commit this file to version control.

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_APP_NAME=School MIS
VITE_APP_VERSION=1.0.0
VITE_JWT_SECRET_KEY=your_secret_key
VITE_MAX_UPLOAD_SIZE_MB=5
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_ONLINE_PAYMENT=false
```

| Variable                     | Description                                  |
|------------------------------|----------------------------------------------|
| `VITE_API_BASE_URL`          | Base URL of the backend REST API             |
| `VITE_APP_NAME`              | Display name shown in the browser tab and UI |
| `VITE_APP_VERSION`           | Current version string shown in the footer   |
| `VITE_JWT_SECRET_KEY`        | Secret used for local JWT parsing            |
| `VITE_MAX_UPLOAD_SIZE_MB`    | Maximum file upload size in megabytes        |
| `VITE_ENABLE_DARK_MODE`      | Toggle dark mode support (true / false)      |
| `VITE_ENABLE_ONLINE_PAYMENT` | Show or hide the online payment UI module    |

---

## Available Scripts

| Command                  | Description                          |
|--------------------------|--------------------------------------|
| `npm run dev`            | Start the development server         |
| `npm run build`          | Build for production                 |
| `npm run preview`        | Preview the production build locally |
| `npm run lint`           | Run ESLint across the project        |
| `npm run type-check`     | Run TypeScript type checks           |
| `npm run format`         | Format code with Prettier            |
| `npm run test`           | Run unit tests with Vitest           |
| `npm run test:coverage`  | Run tests with coverage report       |

---

## License

MIT. See [LICENSE](LICENSE) for details.
