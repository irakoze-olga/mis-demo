import React, { useState, useEffect } from "react";

/**
 * Settings Page
 * Manage school system settings
 */
const Settings = () => {
  const [settings, setSettings] = useState({
    schoolName: "Green Valley High School",
    schoolEmail: "info@greenvalley.edu",
    academicYear: "2025 / 2026",
    theme: localStorage.getItem("theme") || "light",
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", settings.theme);
    localStorage.setItem("theme", settings.theme);
  }, [settings.theme]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Later replace this with API call
    alert("Settings saved successfully!");
    console.log("Saved settings:", settings);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>System Settings</h2>

      <form style={styles.form} onSubmit={handleSave}>
        <div style={styles.formGroup}>
          <label style={styles.label}>School Name</label>
          <input
            type="text"
            name="schoolName"
            value={settings.schoolName}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>School Email</label>
          <input
            type="email"
            name="schoolEmail"
            value={settings.schoolEmail}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Academic Year</label>
          <input
            type="text"
            name="academicYear"
            value={settings.academicYear}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Theme</label>
          <select
            name="theme"
            value={settings.theme}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <button type="submit" style={styles.button}>
          Save Settings
        </button>
      </form>
    </div>
  );
};

/**
 * Internal CSS Styles - uses CSS variables for theme support
 */
const styles = {
  container: {
    padding: "1rem",
    maxWidth: "600px",
  },
  title: {
    marginBottom: "1rem",
    color: "var(--text-main)",
  },
  form: {
    background: "var(--bg-card)",
    padding: "1.25rem",
    borderRadius: "var(--radius-md)",
    boxShadow: "var(--shadow-md)",
    border: "1px solid var(--border-color)",
  },
  formGroup: {
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "0.375rem",
    fontSize: "14px",
    color: "var(--text-muted)",
  },
  input: {
    padding: "0.625rem 1rem",
    borderRadius: "var(--radius-sm)",
    border: "2px solid var(--border-color)",
    fontSize: "14px",
    background: "var(--bg-main)",
    color: "var(--text-main)",
  },
  select: {
    padding: "0.625rem 1rem",
    borderRadius: "var(--radius-sm)",
    border: "2px solid var(--border-color)",
    fontSize: "14px",
    background: "var(--bg-main)",
    color: "var(--text-main)",
  },
  button: {
    marginTop: "0.75rem",
    padding: "0.75rem 1.25rem",
    backgroundColor: "var(--primary)",
    color: "#fff",
    border: "none",
    borderRadius: "var(--radius-sm)",
    cursor: "pointer",
    fontSize: "0.9375rem",
    fontWeight: 600,
  },
};

export default Settings;
