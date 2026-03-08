import React, { useState, useEffect } from 'react';
import { Bell, Search, Sun, Moon, Camera } from 'lucide-react';
import '../../styles/components.css';

const Header = ({ user, onAvatarChange }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      onAvatarChange?.(reader.result);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleNotifications = () => {
    setShowNotifications(prev => !prev);
    if (!showNotifications) {
      // Simple toast for demo
      const toast = document.createElement('div');
      toast.textContent = 'No new notifications';
      toast.style.cssText = 'position:fixed;bottom:20px;right:20px;background:var(--bg-card);padding:12px 20px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);font-size:0.9rem;z-index:9999;border:1px solid var(--border-color)';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2500);
    }
  };

  return (
    <header className="app-header card-glass" role="banner">
      <div className="header-container flex items-center justify-between">
        <div className="header-brand flex items-center gap-md">
          <div className="logo flex items-center gap-sm">
            <div className="logo-box">
              <span className="logo-icon">M</span>
            </div>
            <h1 className="logo-text">MIS <span className="text-muted" style={{ fontWeight: 400 }}>Dash</span></h1>
          </div>
        </div>

        <div className="header-search">
          <div className="search-wrapper flex items-center gap-sm">
            <Search size={18} className="text-muted" />
            <input
              type="search"
              className="form-input search-input"
              placeholder="Search reports, users..."
              aria-label="Search"
            />
          </div>
        </div>

        <div className="header-actions flex items-center gap-md">
          <button className="icon-btn" aria-label="Toggle Theme" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button className="icon-btn" aria-label="Notifications" onClick={handleNotifications}>
            <div className="btn-badge-container flex items-center justify-center">
              <Bell size={20} />
              <span className="notification-dot"></span>
            </div>
          </button>

          <div className="user-profile flex items-center gap-sm card-glass">
            <label className="avatar-wrapper avatar-upload-trigger" htmlFor="profile-upload" title="Upload profile picture">
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="avatar-input-hidden"
              />
              <img
                src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                alt="Profile"
                className="user-avatar"
              />
              <span className="avatar-upload-overlay" title="Click to upload"><Camera size={18} /></span>
              <span className="online-status"></span>
            </label>
            <div className="user-meta">
              <p className="user-name font-bold text-sm">{user?.name || "Guest"}</p>
              <p className="user-role text-muted" style={{ fontSize: '0.7rem' }}>{user?.role || "Visitor"}</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .app-header {
          height: var(--header-height);
          padding: 0 var(--space-lg);
          display: flex;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid var(--border-color);
        }
        .header-container { width: 100%; }
        .logo-box {
          background: var(--grad-primary);
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
        }
        .logo-text { 
           margin: 0; 
           font-size: 1.25rem;
           letter-spacing: -0.02em;
        }
        .search-wrapper { width: 300px; }
        .user-profile {
          padding: 4px 12px 4px 4px;
          border-radius: 30px;
          border: 1px solid var(--border-color);
        }
        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid var(--bg-card);
        }
        .avatar-wrapper { position: relative; cursor: pointer; display: block; }
        .avatar-input-hidden { position: absolute; width: 0; height: 0; opacity: 0; }
        .avatar-upload-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.5);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          opacity: 0;
          transition: var(--transition);
        }
        .avatar-wrapper:hover .avatar-upload-overlay { opacity: 1; }
        .online-status {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 10px;
          height: 10px;
          background: var(--success);
          border: 2px solid var(--bg-card);
          border-radius: 50%;
        }
        .icon-btn {
          background: transparent;
          border: none;
          font-size: 1.2rem;
          padding: 8px;
          border-radius: 50%;
          transition: var(--transition);
        }
        .icon-btn {
          color: var(--text-main);
        }
        .icon-btn:hover { background: var(--border-color); opacity: 0.8; }
        .btn-badge-container { position: relative; }
        .notification-dot {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 8px;
          height: 8px;
          background: var(--danger);
          border-radius: 50%;
          border: 1px solid var(--bg-card);
        }
      `}</style>
    </header>
  );
};

export default Header;
