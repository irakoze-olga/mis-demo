import React, { useState, useEffect } from 'react';
import { Camera, Upload, Save, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/components.css';

const Profile = () => {
  const { user, updateAvatar } = useAuth();
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setAvatarPreview(user?.avatar || '');
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target.result;
      setAvatarPreview(result);
      updateAvatar?.(result);
      setIsUploading(false);

      // Show success message
      const toast = document.createElement('div');
      toast.textContent = 'Profile picture updated successfully!';
      toast.style.cssText = 'position:fixed;bottom:20px;right:20px;background:var(--success);color:white;padding:12px 20px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);font-size:0.9rem;z-index:9999;';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    };
    reader.onerror = () => {
      setIsUploading(false);
      alert('Failed to read file');
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview('');
    updateAvatar?.('');

    // Show success message
    const toast = document.createElement('div');
    toast.textContent = 'Profile picture removed!';
    toast.style.cssText = 'position:fixed;bottom:20px;right:20px;background:var(--warning);color:white;padding:12px 20px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);font-size:0.9rem;z-index:9999;';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  return (
    <div className="profile-page flex-col gap-xl">
      <header className="page-header">
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted">Manage your account settings and profile information</p>
      </header>

      <div className="profile-content grid gap-xl">
        <div className="profile-section card flex-col gap-lg">
          <h2 className="text-xl font-bold">Profile Picture</h2>

          <div className="avatar-section flex-col items-center gap-lg">
            <div className="avatar-display">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Profile"
                  className="profile-avatar-large"
                />
              ) : (
                <div className="avatar-placeholder flex-col items-center gap-md">
                  <User size={64} className="text-muted" />
                  <span className="text-muted">No profile picture</span>
                </div>
              )}
            </div>

            <div className="avatar-controls flex-col gap-md">
              <label className="btn btn-primary" htmlFor="avatar-upload">
                <Upload size={18} />
                {isUploading ? 'Uploading...' : 'Upload New Picture'}
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden-input"
                disabled={isUploading}
              />

              {avatarPreview && (
                <button
                  className="btn btn-outline"
                  onClick={handleRemoveAvatar}
                  disabled={isUploading}
                >
                  Remove Current
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="profile-section card flex-col gap-lg">
          <h2 className="text-xl font-bold">Account Information</h2>

          <div className="info-grid">
            <div className="info-item">
              <label className="info-label">Name</label>
              <div className="info-value">{user?.name || 'Not set'}</div>
            </div>

            <div className="info-item">
              <label className="info-label">Email</label>
              <div className="info-value">{user?.email || 'Not set'}</div>
            </div>

            <div className="info-item">
              <label className="info-label">Role</label>
              <div className="info-value">
                <span className="badge badge-primary">{user?.role || 'Visitor'}</span>
              </div>
            </div>

            <div className="info-item">
              <label className="info-label">Member Since</label>
              <div className="info-value">{user?.joinDate || 'Unknown'}</div>
            </div>
          </div>
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
        .gap-xs {
          gap: var(--space-xs);
        }
        .items-center {
          align-items: center;
        }
        .justify-center {
          justify-content: center;
        }
        .text-3xl {
          font-size: 1.875rem;
          line-height: 2.25rem;
        }
        .text-xl {
          font-size: 1.25rem;
          line-height: 1.75rem;
        }
        .text-muted {
          color: var(--text-muted);
        }
        .font-bold {
          font-weight: 700;
        }
        .grid {
          display: grid;
        }
        
        .profile-page {
          padding: var(--space-lg);
          max-width: 1000px;
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
        .profile-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: var(--space-xl);
        }
        .profile-section {
          padding: var(--space-xl);
          background: var(--bg-card);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
        }
        .profile-section h2 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: var(--space-lg);
        }
        .avatar-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .avatar-display {
          position: relative;
          margin-bottom: var(--space-lg);
        }
        .profile-avatar-large {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 4px solid var(--border-color);
          object-fit: cover;
          box-shadow: var(--shadow-md);
        }
        .avatar-placeholder {
          width: 120px;
          height: 120px;
          border: 2px dashed var(--border-color);
          border-radius: 50%;
          background: var(--bg-main);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
        }
        .avatar-controls {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
          width: 100%;
          max-width: 250px;
        }
        .avatar-controls label {
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .info-grid {
          display: grid;
          gap: var(--space-lg);
        }
        .info-item {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
          padding: var(--space-md);
          background: var(--bg-main);
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
        }
        .info-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .info-value {
          font-size: 1rem;
          color: var(--text-main);
          padding: var(--space-xs) 0;
          font-weight: 500;
        }
        .hidden-input {
          display: none;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.6rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .badge-primary {
          background: rgba(99, 102, 241, 0.1);
          color: var(--primary);
        }
        
        @media (max-width: 768px) {
          .profile-content {
            grid-template-columns: 1fr;
          }
          .page-header h1 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;
