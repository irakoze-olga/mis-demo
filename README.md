<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>MIS-Demo — README</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #0d0f14;
      --surface: #13161e;
      --border: #1e2230;
      --accent: #4f8ef7;
      --accent2: #7dd3a8;
      --text: #d8dce8;
      --muted: #5a6278;
      --heading: #eef0f6;
    }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'DM Sans', sans-serif;
      font-size: 15px;
      line-height: 1.75;
      min-height: 100vh;
    }

    /* ── Hero ── */
    .hero {
      position: relative;
      overflow: hidden;
      padding: 80px 40px 60px;
      text-align: center;
      border-bottom: 1px solid var(--border);
    }

    /* Animated grid background */
    .hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(var(--border) 1px, transparent 1px),
        linear-gradient(90deg, var(--border) 1px, transparent 1px);
      background-size: 40px 40px;
      animation: gridDrift 20s linear infinite;
      opacity: 0.5;
    }

    @keyframes gridDrift {
      0%   { background-position: 0 0; }
      100% { background-position: 40px 40px; }
    }

    /* Glowing orbs */
    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.18;
      animation: pulse 6s ease-in-out infinite alternate;
    }
    .orb1 { width: 320px; height: 320px; background: var(--accent);  top: -80px; left: -60px; animation-delay: 0s; }
    .orb2 { width: 260px; height: 260px; background: var(--accent2); bottom: -60px; right: 0;  animation-delay: 2s; }

    @keyframes pulse {
      from { transform: scale(1);   opacity: 0.14; }
      to   { transform: scale(1.2); opacity: 0.22; }
    }

    .hero-content { position: relative; z-index: 1; }

    .badge {
      display: inline-block;
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--accent);
      border: 1px solid var(--accent);
      border-radius: 20px;
      padding: 3px 14px;
      margin-bottom: 20px;
      animation: fadeUp 0.6s ease both;
    }

    h1 {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(2.4rem, 6vw, 4rem);
      color: var(--heading);
      letter-spacing: -0.01em;
      line-height: 1.15;
      animation: fadeUp 0.7s ease both 0.1s;
    }

    h1 span { color: var(--accent); }

    .subtitle {
      margin-top: 14px;
      font-size: 16px;
      color: var(--muted);
      max-width: 520px;
      margin-left: auto;
      margin-right: auto;
      animation: fadeUp 0.7s ease both 0.2s;
    }

    /* Animated data flow line under hero */
    .dataline {
      position: relative;
      height: 3px;
      background: var(--border);
      overflow: hidden;
    }
    .dataline::after {
      content: '';
      position: absolute;
      top: 0; left: -40%;
      width: 40%;
      height: 100%;
      background: linear-gradient(90deg, transparent, var(--accent), var(--accent2), transparent);
      animation: sweep 2.4s ease-in-out infinite;
    }
    @keyframes sweep {
      0%   { left: -40%; }
      100% { left: 140%; }
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(18px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ── Layout ── */
    .container {
      max-width: 860px;
      margin: 0 auto;
      padding: 56px 32px 80px;
    }

    section { margin-bottom: 56px; animation: fadeUp 0.6s ease both; }
    section:nth-child(1) { animation-delay: 0.05s; }
    section:nth-child(2) { animation-delay: 0.1s; }
    section:nth-child(3) { animation-delay: 0.15s; }
    section:nth-child(4) { animation-delay: 0.2s; }
    section:nth-child(5) { animation-delay: 0.25s; }
    section:nth-child(6) { animation-delay: 0.3s; }
    section:nth-child(7) { animation-delay: 0.35s; }
    section:nth-child(8) { animation-delay: 0.4s; }

    h2 {
      font-family: 'DM Serif Display', serif;
      font-size: 1.55rem;
      color: var(--heading);
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--border);
    }

    h3 {
      font-size: 0.92rem;
      font-family: 'DM Mono', monospace;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--accent2);
      margin: 24px 0 10px;
    }

    p { color: var(--text); margin-bottom: 12px; }

    ul { padding-left: 20px; }
    ul li { margin-bottom: 6px; color: var(--text); }
    ul li::marker { color: var(--accent); }

    /* ── Feature Cards ── */
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
      gap: 14px;
      margin-top: 8px;
    }

    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 20px 18px;
      transition: border-color 0.25s, transform 0.25s;
    }
    .card:hover {
      border-color: var(--accent);
      transform: translateY(-3px);
    }
    .card-title {
      font-family: 'DM Mono', monospace;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--accent);
      margin-bottom: 8px;
    }
    .card p { font-size: 13.5px; color: var(--muted); margin: 0; }

    /* ── Tables ── */
    table { width: 100%; border-collapse: collapse; font-size: 14px; }
    th {
      background: var(--surface);
      color: var(--accent);
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      text-align: left;
      padding: 10px 14px;
      border-bottom: 1px solid var(--border);
    }
    td {
      padding: 9px 14px;
      border-bottom: 1px solid var(--border);
      color: var(--text);
      vertical-align: top;
    }
    tr:last-child td { border-bottom: none; }
    tr:hover td { background: var(--surface); }
    code {
      font-family: 'DM Mono', monospace;
      font-size: 12.5px;
      background: #1a1e2a;
      border: 1px solid var(--border);
      border-radius: 4px;
      padding: 1px 6px;
      color: var(--accent2);
    }

    /* ── Code blocks ── */
    pre {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 20px 22px;
      overflow-x: auto;
      font-family: 'DM Mono', monospace;
      font-size: 13px;
      line-height: 1.7;
      color: #9eb3d8;
    }
    pre .comment { color: var(--muted); }
    pre .cmd     { color: var(--accent2); }

    /* ── Method badges ── */
    .method {
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      font-weight: 500;
      padding: 2px 8px;
      border-radius: 4px;
    }
    .GET    { background: #1a3a28; color: #5fe3a1; }
    .POST   { background: #1a2e4a; color: #5baaff; }
    .PUT    { background: #3a2e10; color: #f0b429; }
    .DELETE { background: #3a1616; color: #f47171; }

    /* ── Blockquote ── */
    blockquote {
      border-left: 3px solid var(--accent);
      margin: 14px 0;
      padding: 10px 18px;
      background: var(--surface);
      border-radius: 0 8px 8px 0;
      color: var(--muted);
      font-size: 13.5px;
    }

    /* ── Steps ── */
    .steps { counter-reset: step; }
    .step {
      display: flex;
      gap: 16px;
      margin-bottom: 12px;
      align-items: flex-start;
    }
    .step-num {
      counter-increment: step;
      min-width: 28px; height: 28px;
      background: var(--accent);
      color: #fff;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-family: 'DM Mono', monospace;
      font-size: 12px;
      flex-shrink: 0;
      margin-top: 2px;
    }
    .step p { margin: 0; }

    /* ── Footer ── */
    footer {
      text-align: center;
      padding: 28px;
      border-top: 1px solid var(--border);
      font-size: 13px;
      color: var(--muted);
      font-family: 'DM Mono', monospace;
    }
  </style>
</head>
<body>

<!-- Hero -->
<div class="hero">
  <div class="orb orb1"></div>
  <div class="orb orb2"></div>
  <div class="hero-content">
    <div class="badge">v1.0.0 — Demo</div>
    <h1><span>MIS</span>-Demo</h1>
    <p class="subtitle">Management Information System for Student &amp; School Data</p>
  </div>
</div>
<div class="dataline"></div>

<div class="container">

  <!-- Overview -->
  <section>
    <h2>Overview</h2>
    <p>MIS-Demo is a Management Information System designed to streamline the administration of educational institutions. It provides a structured and reliable way to store, manage, and access both student records and school operational data.</p>
  </section>

  <!-- Features -->
  <section>
    <h2>Features</h2>
    <div class="cards">
      <div class="card">
        <div class="card-title">Student Data</div>
        <p>Profiles, grades, attendance, enrollment, and performance tracking.</p>
      </div>
      <div class="card">
        <div class="card-title">School Data</div>
        <p>Staff records, timetables, curriculum, and departmental administration.</p>
      </div>
      <div class="card">
        <div class="card-title">Access &amp; Security</div>
        <p>Role-based access, secure auth, and full audit logs.</p>
      </div>
      <div class="card">
        <div class="card-title">Reporting</div>
        <p>Export reports in PDF, CSV, and Excel with dashboard metrics.</p>
      </div>
    </div>
  </section>

  <!-- Tech Stack -->
  <section>
    <h2>Tech Stack</h2>
    <blockquote>Update this table to reflect your actual tech stack.</blockquote>
    <table>
      <thead><tr><th>Layer</th><th>Technology</th></tr></thead>
      <tbody>
        <tr><td>Frontend</td><td>React / HTML / CSS</td></tr>
        <tr><td>Backend</td><td>Node.js / Python</td></tr>
        <tr><td>Database</td><td>PostgreSQL / MySQL</td></tr>
        <tr><td>Auth</td><td>JWT / OAuth 2.0</td></tr>
        <tr><td>Deployment</td><td>Docker / Cloud</td></tr>
      </tbody>
    </table>
  </section>

  <!-- Getting Started -->
  <section>
    <h2>Getting Started</h2>
    <h3>Prerequisites</h3>
    <ul>
      <li>Node.js >= 16.x (or your relevant runtime)</li>
      <li>A supported database (PostgreSQL / MySQL)</li>
      <li>Git</li>
    </ul>
    <h3>Installation</h3>
    <pre><span class="comment"># Clone the repository</span>
<span class="cmd">git clone</span> https://github.com/your-org/MIS-demo.git

<span class="comment"># Navigate into the project directory</span>
<span class="cmd">cd</span> MIS-demo

<span class="comment"># Install dependencies</span>
<span class="cmd">npm install</span>

<span class="comment"># Configure environment variables</span>
<span class="cmd">cp</span> .env.example .env

<span class="comment"># Run database migrations</span>
<span class="cmd">npm run</span> migrate

<span class="comment"># Start the development server</span>
<span class="cmd">npm run</span> dev</pre>
    <p style="margin-top:12px;">The app will be available at <code>http://localhost:3000</code>.</p>
  </section>

  <!-- Data Models -->
  <section>
    <h2>Data Models</h2>
    <h3>Student</h3>
    <table>
      <thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><code>student_id</code></td><td>UUID</td><td>Unique student identifier</td></tr>
        <tr><td><code>first_name</code></td><td>String</td><td>Student's first name</td></tr>
        <tr><td><code>last_name</code></td><td>String</td><td>Student's last name</td></tr>
        <tr><td><code>date_of_birth</code></td><td>Date</td><td>Date of birth</td></tr>
        <tr><td><code>gender</code></td><td>String</td><td>Gender</td></tr>
        <tr><td><code>guardian_name</code></td><td>String</td><td>Parent/guardian name</td></tr>
        <tr><td><code>contact_email</code></td><td>String</td><td>Contact email address</td></tr>
        <tr><td><code>enrolled_class</code></td><td>String</td><td>Current class/grade</td></tr>
        <tr><td><code>enrollment_date</code></td><td>Date</td><td>Date of enrollment</td></tr>
      </tbody>
    </table>

    <h3>School</h3>
    <table>
      <thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><code>school_id</code></td><td>UUID</td><td>Unique school identifier</td></tr>
        <tr><td><code>school_name</code></td><td>String</td><td>Name of the institution</td></tr>
        <tr><td><code>address</code></td><td>String</td><td>Physical address</td></tr>
        <tr><td><code>phone</code></td><td>String</td><td>Contact phone number</td></tr>
        <tr><td><code>email</code></td><td>String</td><td>Official email</td></tr>
        <tr><td><code>principal</code></td><td>String</td><td>Name of the principal</td></tr>
        <tr><td><code>established</code></td><td>Date</td><td>Year of establishment</td></tr>
        <tr><td><code>total_students</code></td><td>Integer</td><td>Current student enrollment</td></tr>
      </tbody>
    </table>
  </section>

  <!-- API Endpoints -->
  <section>
    <h2>API Endpoints</h2>
    <h3>Students</h3>
    <table>
      <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><span class="method GET">GET</span></td><td><code>/api/students</code></td><td>List all students</td></tr>
        <tr><td><span class="method GET">GET</span></td><td><code>/api/students/:id</code></td><td>Get a specific student</td></tr>
        <tr><td><span class="method POST">POST</span></td><td><code>/api/students</code></td><td>Add a new student</td></tr>
        <tr><td><span class="method PUT">PUT</span></td><td><code>/api/students/:id</code></td><td>Update student record</td></tr>
        <tr><td><span class="method DELETE">DELETE</span></td><td><code>/api/students/:id</code></td><td>Delete a student record</td></tr>
      </tbody>
    </table>
    <h3>School</h3>
    <table>
      <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><span class="method GET">GET</span></td><td><code>/api/school</code></td><td>Get school information</td></tr>
        <tr><td><span class="method PUT">PUT</span></td><td><code>/api/school</code></td><td>Update school details</td></tr>
        <tr><td><span class="method GET">GET</span></td><td><code>/api/school/staff</code></td><td>List all staff members</td></tr>
      </tbody>
    </table>
  </section>

  <!-- Running Tests -->
  <section>
    <h2>Running Tests</h2>
    <pre><span class="comment"># Run all tests</span>
<span class="cmd">npm test</span>

<span class="comment"># Run with coverage</span>
<span class="cmd">npm run</span> test:coverage</pre>
  </section>

  <!-- Contributing -->
  <section>
    <h2>Contributing</h2>
    <div class="steps">
      <div class="step"><div class="step-num">1</div><p>Fork the repository</p></div>
      <div class="step"><div class="step-num">2</div><p>Create a feature branch — <code>git checkout -b feature/your-feature</code></p></div>
      <div class="step"><div class="step-num">3</div><p>Commit your changes — <code>git commit -m 'Add your feature'</code></p></div>
      <div class="step"><div class="step-num">4</div><p>Push to your branch — <code>git push origin feature/your-feature</code></p></div>
      <div class="step"><div class="step-num">5</div><p>Open a Pull Request</p></div>
    </div>
  </section>

  <!-- License & Contact -->
  <section>
    <h2>License</h2>
    <p>This project is licensed under the <a href="LICENSE" style="color: var(--accent);">MIT License</a>.</p>
  </section>

  <section>
    <h2>Contact</h2>
    <p>For questions or support, please open an issue or reach out to the project maintainers.</p>
  </section>

</div>

<footer>MIS-Demo &mdash; Built for educational data management</footer>

</body>
</html>
