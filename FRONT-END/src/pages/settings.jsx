import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Moon, Sun, Bell, Shield, Globe, Mail, Calendar, Save, RotateCcw } from 'lucide-react';
import '../styles/components.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    schoolName: "Green Valley High School",
    schoolEmail: "info@greenvalley.edu",
    academicYear: "2025 / 2026",
    theme: localStorage.getItem("theme") || "light",
    notifications: true,
    emailAlerts: true,
    autoBackup: true,
    language: "English",
    timezone: "UTC+2",
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", settings.theme);
    localStorage.setItem("theme", settings.theme);
  }, [settings.theme]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setSettings({ ...settings, [name]: newValue });
    setHasChanges(true);
  };

  const handleSave = (e) => {
    e.preventDefault();

    // Show success message
    const toast = document.createElement('div');
    toast.textContent = 'Settings saved successfully!';
    toast.style.cssText = 'position:fixed;bottom:20px;right:20px;background:var(--success);color:white;padding:12px 20px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);font-size:0.9rem;z-index:9999;';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);

    setHasChanges(false);
    console.log("Saved settings:", settings);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      setSettings({
        schoolName: "Green Valley High School",
        schoolEmail: "info@greenvalley.edu",
        academicYear: "2025 / 2026",
        theme: "light",
        notifications: true,
        emailAlerts: true,
        autoBackup: true,
        language: "English",
        timezone: "UTC+2",
      });
      setHasChanges(true);
    }
  };

  const toggleTheme = () => {
    const newTheme = settings.theme === 'light' ? 'dark' : 'light';
    setSettings({ ...settings, theme: newTheme });
  };

  return (
    <div className="settings-page flex-col gap-xl">
      <header className="page-header flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted">Manage your system preferences and configuration</p>
        </div>
        <div className="flex gap-sm">
          <button
            className="btn btn-outline"
            onClick={handleReset}
            disabled={!hasChanges}
          >
            <RotateCcw size={18} /> Reset
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={!hasChanges}
          >
            <Save size={18} /> Save Changes
          </button>
        </div>
      </header>

      <div className="settings-grid">
        {/* General Settings */}
        <div className="settings-section card">
          <div className="section-header flex items-center gap-md">
            <SettingsIcon size={20} className="text-primary" />
            <h2 className="text-xl font-bold">General Settings</h2>
          </div>

          <div className="settings-content flex-col gap-lg">
            <div className="form-group">
              <label className="form-label">
                <Globe size={16} /> School Name
              </label>
              <input
                type="text"
                name="schoolName"
                value={settings.schoolName}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter school name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Mail size={16} /> School Email
              </label>
              <input
                type="email"
                name="schoolEmail"
                value={settings.schoolEmail}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter school email"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Calendar size={16} /> Academic Year
              </label>
              <input
                type="text"
                name="academicYear"
                value={settings.academicYear}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 2025 / 2026"
              />
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="settings-section card">
          <div className="section-header flex items-center gap-md">
            <Sun size={20} className="text-warning" />
            <h2 className="text-xl font-bold">Appearance</h2>
          </div>

          <div className="settings-content flex-col gap-lg">
            <div className="form-group">
              <label className="form-label">Theme</label>
              <div className="theme-selector flex gap-md">
                <button
                  className={`theme-option ${settings.theme === 'light' ? 'active' : ''}`}
                  onClick={() => setSettings({ ...settings, theme: 'light' })}
                >
                  <Sun size={16} /> Light
                </button>
                <button
                  className={`theme-option ${settings.theme === 'dark' ? 'active' : ''}`}
                  onClick={() => setSettings({ ...settings, theme: 'dark' })}
                >
                  <Moon size={16} /> Dark
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Language</label>
              <select
                name="language"
                value={settings.language}
                onChange={handleChange}
                className="form-input"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Timezone</label>
              <select
                name="timezone"
                value={settings.timezone}
                onChange={handleChange}
                className="form-input"
              >
                <option value="UTC-12">UTC-12 (Baker Island)</option>
                <option value="UTC-8">UTC-8 (Pacific)</option>
                <option value="UTC-5">UTC-5 (Eastern)</option>
                <option value="UTC+0">UTC+0 (London)</option>
                <option value="UTC+1">UTC+1 (Paris)</option>
                <option value="UTC+2">UTC+2 (Cairo)</option>
                <option value="UTC+8">UTC+8 (Beijing)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="settings-section card">
          <div className="section-header flex items-center gap-md">
            <Bell size={20} className="text-success" />
            <h2 className="text-xl font-bold">Notifications</h2>
          </div>

          <div className="settings-content flex-col gap-lg">
            <div className="checkbox-group">
              <label className="checkbox-label flex items-center gap-md">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={settings.notifications}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                <span>Enable desktop notifications</span>
              </label>
            </div>

            <div className="checkbox-group">
              <label className="checkbox-label flex items-center gap-md">
                <input
                  type="checkbox"
                  name="emailAlerts"
                  checked={settings.emailAlerts}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                <span>Email alerts for important updates</span>
              </label>
            </div>

            <div className="checkbox-group">
              <label className="checkbox-label flex items-center gap-md">
                <input
                  type="checkbox"
                  name="autoBackup"
                  checked={settings.autoBackup}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                <span>Automatic data backup</span>
              </label>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="settings-section card">
          <div className="section-header flex items-center gap-md">
            <Shield size={20} className="text-danger" />
            <h2 className="text-xl font-bold">Security</h2>
          </div>

          <div className="settings-content flex-col gap-lg">
            <div className="security-info">
              <p className="text-muted">Last password change: 30 days ago</p>
              <button className="btn btn-outline">Change Password</button>
            </div>

            <div className="security-info">
              <p className="text-muted">Two-factor authentication: <span className="text-success">Enabled</span></p>
              <button className="btn btn-outline">Configure 2FA</button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .settings-page {
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }
        .settings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 2rem;
        }
        .settings-section {
          padding: 2rem;
          border-radius: 12px;
        }
        .section-header {
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }
        .settings-content {
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
        .form-input {
          padding: 0.75rem 1rem;
          border-radius: 8px;
          border: 2px solid var(--border-color);
          font-size: 0.9rem;
          background: var(--bg-main);
          color: var(--text-main);
          transition: var(--transition);
        }
        .form-input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        .theme-selector {
          display: flex;
          background: var(--bg-main);
          padding: 0.25rem;
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }
        .theme-option {
          flex: 1;
          padding: 0.75rem 1rem;
          border: none;
          background: transparent;
          color: var(--text-muted);
          border-radius: 6px;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .theme-option.active {
          background: var(--primary);
          color: white;
        }
        .theme-option:hover:not(.active) {
          background: var(--border-color);
          color: var(--text-main);
        }
        .checkbox-group {
          padding: 1rem;
          background: var(--bg-main);
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }
        .checkbox-label {
          cursor: pointer;
          font-size: 0.9rem;
          color: var(--text-main);
        }
        .checkbox-input {
          width: 20px;
          height: 20px;
          accent-color: var(--primary);
        }
        .security-info {
          padding: 1rem;
          background: var(--bg-main);
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }
        .security-info p {
          margin-bottom: 0.75rem;
        }
        
        @media (max-width: 768px) {
          .settings-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Settings;
