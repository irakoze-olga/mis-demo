import React, { useEffect, useState } from "react";

/**
 * Reports Page
 * Displays summary reports for the school management system
 */
const Reports = () => {
  const [reports, setReports] = useState({
    students: 0,
    teachers: 0,
    attendanceRate: 0,
    feesCollected: 0,
  });

  const [loading, setLoading] = useState(true);

  // Simulated API call
  useEffect(() => {
    // Replace this with real API call later
    setTimeout(() => {
      setReports({
        students: 520,
        teachers: 42,
        attendanceRate: 92,
        feesCollected: 185000,
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div style={styles.loading}>Loading reports...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>School Reports</h2>

      <div style={styles.grid}>
        <ReportCard
          title="Total Students"
          value={reports.students}
          color="var(--success)"
        />

        <ReportCard
          title="Total Teachers"
          value={reports.teachers}
          color="var(--primary)"
        />

        <ReportCard
          title="Attendance Rate"
          value={`${reports.attendanceRate}%`}
          color="var(--warning)"
        />

        <ReportCard
          title="Fees Collected"
          value={`$${reports.feesCollected.toLocaleString()}`}
          color="var(--primary-light)"
        />
      </div>
    </div>
  );
};

/**
 * Reusable Report Card Component
 */
const ReportCard = ({ title, value, color }) => {
  return (
    <div style={{ ...styles.card, borderTop: `5px solid ${color}` }}>
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={{ ...styles.cardValue, color }}>{value}</p>
    </div>
  );
};

/**
 * Inline styles - uses CSS variables for theme support
 */
const styles = {
  container: {
    padding: "1rem",
  },
  title: {
    marginBottom: "1rem",
    color: "var(--text-main)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "var(--space-md)",
  },
  card: {
    background: "var(--bg-card)",
    padding: "1.25rem",
    borderRadius: "var(--radius-md)",
    boxShadow: "var(--shadow-md)",
    border: "1px solid var(--border-color)",
  },
  cardTitle: {
    marginBottom: "0.5rem",
    fontSize: "1rem",
    color: "var(--text-muted)",
  },
  cardValue: {
    fontSize: "1.75rem",
    fontWeight: "bold",
  },
  loading: {
    padding: "1rem",
    textAlign: "center",
    fontSize: "1.125rem",
    color: "var(--text-muted)",
  },
};

export default Reports;
