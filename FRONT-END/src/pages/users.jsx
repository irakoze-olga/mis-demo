import React, { useState } from "react";
import { Plus, Trash2, Search, User, Mail, Shield } from 'lucide-react';
import { useUsers } from "../context/UserContext";
import '../styles/components.css';

const Users = () => {
  const { users, addUser, deleteUser } = useUsers();

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Student",
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!newUser.name.trim()) {
      newErrors.name = "Name is required";
    } else if (newUser.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!newUser.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleAddUser = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Check if email already exists
    if (users.some(user => user.email.toLowerCase() === newUser.email.toLowerCase())) {
      setErrors({ email: "Email already exists" });
      return;
    }

    const userToAdd = {
      name: newUser.name.trim(),
      email: newUser.email.trim(),
      role: newUser.role,
    };

    addUser(userToAdd);
    setNewUser({ name: "", email: "", role: "Student" });
    setShowAddForm(false);
    setErrors({});

    // Show success message
    const toast = document.createElement('div');
    toast.textContent = `User "${userToAdd.name}" added successfully!`;
    toast.style.cssText = 'position:fixed;bottom:20px;right:20px;background:var(--success);color:white;padding:12px 20px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);font-size:0.9rem;z-index:9999;';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const handleDeleteUser = (userId) => {
    const userToDelete = users.find(u => u.id === userId);
    if (window.confirm(`Are you sure you want to delete "${userToDelete.name}"?`)) {
      deleteUser(userId);

      // Show success message
      const toast = document.createElement('div');
      toast.textContent = `User "${userToDelete.name}" deleted!`;
      toast.style.cssText = 'position:fixed;bottom:20px;right:20px;background:var(--danger);color:white;padding:12px 20px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);font-size:0.9rem;z-index:9999;';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="users-page flex-col gap-xl">
      <header className="page-header flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Users Management</h1>
          <p className="text-muted">Manage system users and their roles</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus size={18} /> {showAddForm ? 'Cancel' : 'Add User'}
        </button>
      </header>

      {/* Search Bar */}
      <div className="search-section">
        <div className="search-wrapper">
          <Search size={18} className="text-muted" />
          <input
            type="text"
            placeholder="Search users by name, email, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      {/* Add User Form */}
      {showAddForm && (
        <div className="add-user-form card flex-col gap-lg">
          <h3 className="text-xl font-bold">Add New User</h3>

          <form onSubmit={handleAddUser} className="flex-col gap-md">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  <User size={16} /> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={newUser.name}
                  onChange={handleChange}
                  className={`form-input ${errors.name ? 'error' : ''}`}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Mail size={16} /> Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={newUser.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Shield size={16} /> Role
                </label>
                <select
                  name="role"
                  value={newUser.role}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>

            <div className="form-actions flex gap-sm">
              <button type="submit" className="btn btn-primary">
                <Plus size={18} /> Add User
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setShowAddForm(false);
                  setNewUser({ name: "", email: "", role: "Student" });
                  setErrors({});
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users Table */}
      <div className="users-table card">
        <div className="table-header flex justify-between items-center">
          <h3 className="text-lg font-bold">Users ({filteredUsers.length})</h3>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    {searchTerm ? 'No users found matching your search' : 'No users available'}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="user-info flex items-center gap-sm">
                        <div className="user-avatar">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="text-muted">{user.email}</td>
                    <td>
                      <span className={`badge badge-${user.role.toLowerCase()}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions flex gap-xs">
                        <button
                          className="btn btn-sm btn-outline"
                          onClick={() => handleDeleteUser(user.id)}
                          title="Delete user"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .flex-col {
          display: flex;
          flex-direction: column;
        }
        .flex {
          display: flex;
        }
        .gap-xl {
          gap: var(--space-xl);
        }
        .gap-lg {
          gap: var(--space-lg);
        }
        .gap-md {
          gap: var(--space-md);
        }
        .gap-sm {
          gap: var(--space-sm);
        }
        .items-center {
          align-items: center;
        }
        .justify-between {
          justify-content: space-between;
        }
        .text-2xl {
          font-size: 1.5rem;
          line-height: 2rem;
        }
        .text-muted {
          color: var(--text-muted);
        }
        .font-bold {
          font-weight: 700;
        }
        
        .users-page {
          padding: var(--space-lg);
          max-width: 1200px;
          margin: 0 auto;
        }
        .page-header {
          margin-bottom: var(--space-xl);
        }
        .page-header h1 {
          font-size: 2rem;
          margin-bottom: var(--space-sm);
          color: var(--text-main);
        }
        .page-header p {
          color: var(--text-muted);
          font-size: 1rem;
        }
        .users-content {
          display: flex;
          flex-direction: column;
          gap: var(--space-xl);
        }
        .section-card {
          background: var(--bg-card);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
        }
        .section-header {
          padding: var(--space-lg);
          border-bottom: 1px solid var(--border-color);
          background: var(--bg-main);
        }
        .section-header h2 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-main);
          margin: 0;
        }
        .section-body {
          padding: var(--space-lg);
        }
        .search-bar {
          position: relative;
          max-width: 400px;
        }
        .search-wrapper {
          position: relative;
        max-width: 400px;
        }
        .search-wrapper input {
          padding - left: 2.5rem;
        }
        .search-wrapper svg {
          position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        }
        .add-user-form {
          padding: 2rem;
        margin-bottom: 2rem;
        }
        .form-grid {
          display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
        }
        .form-group {
          display: flex;
        flex-direction: column;
        gap: 0.5rem;
        }
        .form-label {
          display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        color: var(--text-main);
        font-size: 0.9rem;
        }
        .form-input.error {
          border - color: var(--danger);
        }
        .error-message {
          color: var(--danger);
        font-size: 0.8rem;
        }
        .form-actions {
          margin - top: 1.5rem;
        display: flex;
        gap: 1rem;
        }
        .users-table {
          padding: 2rem;
        }
        .user-avatar {
          width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--grad-primary);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 1rem;
        }
        .badge {
          padding: 6px 12px;
        border-radius: 16px;
        font-size: 0.8rem;
        font-weight: 600;
        }
        .badge-admin {
          background: rgba(239, 68, 68, 0.1);
        color: var(--danger);
        }
        .badge-teacher {
          background: rgba(59, 130, 246, 0.1);
        color: var(--primary);
        }
        .badge-student {
          background: rgba(34, 197, 94, 0.1);
        color: var(--success);
        }
        .table-wrapper {
          overflow - x: auto;
        margin-top: 1.5rem;
        }
        .data-table {
          width: 100%;
        border-collapse: collapse;
        }
        .data-table th {
          text - align: left;
        padding: 1rem;
        background: var(--bg-main);
        border-bottom: 1px solid var(--border-color);
        color: var(--text-muted);
        font-weight: 600;
        font-size: 0.9rem;
        }
        .data-table td {
          padding: 1rem;
        border-bottom: 1px solid var(--border-color);
        }
        .data-table tr:hover {
          background: var(--bg-main);
        }
        .table-actions {
          opacity: 0;
        transition: var(--transition);
        }
        .data-table tr:hover .table-actions {
          opacity: 1;
        }
        .btn-sm {
          padding: 8px 12px;
        font-size: 0.85rem;
        border-radius: 8px;
        min-width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        }

        @media (max-width: 768px) {
          .form - grid {
          grid - template - columns: 1fr;
          }
        .table-wrapper {
          overflow - x: scroll;
          }
        }
      `}</style>
    </div>
  );
};

export default Users;
