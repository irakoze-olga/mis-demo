import React, { useState } from "react";

/**
 * Users Page
 * Manage system users
 */
const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@school.com", role: "Admin" },
    { id: 2, name: "Mary Smith", email: "mary@school.com", role: "Teacher" },
    { id: 3, name: "Alex Brown", email: "alex@school.com", role: "Student" },
  ]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Student",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    setUsers([
      ...users,
      { id: Date.now(), ...newUser },
    ]);

    setNewUser({ name: "", email: "", role: "Student" });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Users Management</h2>

      {/* Add User Form */}
      <form style={styles.form} onSubmit={handleAddUser}>
        <h3 style={styles.subtitle}>Add New User</h3>

        <div style={styles.formRow}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={newUser.name}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={newUser.email}
            onChange={handleChange}
            style={styles.input}
          />

          <select
            name="role"
            value={newUser.role}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="Admin">Admin</option>
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
          </select>
        </div>

        <button type="submit" style={styles.button}>
          Add User
        </button>
      </form>

      {/* Users Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/**
 * Internal CSS Styles - uses CSS variables for theme support
 */
const styles = {
  container: {
    padding: "1rem",
  },
  title: {
    marginBottom: "1rem",
    color: "var(--text-main)",
  },
  subtitle: {
    marginBottom: "0.625rem",
    color: "var(--text-main)",
  },
  form: {
    background: "var(--bg-card)",
    padding: "1.25rem",
    borderRadius: "var(--radius-md)",
    boxShadow: "var(--shadow-md)",
    border: "1px solid var(--border-color)",
    marginBottom: "1.5rem",
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "0.75rem",
    marginBottom: "0.75rem",
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
    padding: "0.625rem 1rem",
    backgroundColor: "var(--success)",
    color: "#fff",
    border: "none",
    borderRadius: "var(--radius-sm)",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600,
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "var(--bg-card)",
    boxShadow: "var(--shadow-md)",
    border: "1px solid var(--border-color)",
  },
  th: {
    textAlign: "left",
    padding: "0.75rem 1rem",
    background: "var(--bg-main)",
    borderBottom: "1px solid var(--border-color)",
    color: "var(--text-muted)",
    fontSize: "0.8rem",
  },
  td: {
    padding: "0.75rem 1rem",
    borderBottom: "1px solid var(--border-color)",
    color: "var(--text-main)",
  },
};

export default Users;
