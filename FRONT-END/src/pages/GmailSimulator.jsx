import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Star, Clock, Trash2, Mail, ExternalLink, ArrowLeft, Archive, Menu, Grid, HelpCircle, Settings, User } from 'lucide-react';
import '../styles/components.css';

const GmailSimulator = () => {
  const navigate = useNavigate();
  const [pendingUser, setPendingUser] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedEmail, setSelectedEmail] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('pending-signup');
    if (!stored) {
      navigate('/signup');
      return;
    }
    setPendingUser(JSON.parse(stored));

    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, [navigate]);

  const emailTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="gmail-container">
      {/* Gmail Header */}
      <header className="gmail-header">
        <div className="header-left">
          <Menu size={20} className="header-icon" />
          <div className="gmail-logo">
            <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png" alt="Gmail" />
          </div>
        </div>
        <div className="header-center">
          <div className="search-bar">
            <Search size={20} className="search-icon" />
            <input type="text" placeholder="Search mail" />
          </div>
        </div>
        <div className="header-right">
          <HelpCircle size={20} className="header-icon" />
          <Settings size={20} className="header-icon" />
          <Grid size={20} className="header-icon" />
          <div className="avatar-circle">
            {pendingUser?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
        </div>
      </header>

      <div className="gmail-main">
        {/* Sidebar */}
        <aside className="gmail-sidebar">
          <button className="compose-btn">
            <img src="https://www.gstatic.com/images/icons/material/system_gm/1x/create_black_24dp.png" alt="" />
            <span>Compose</span>
          </button>
          <div className="sidebar-nav">
            <div className="nav-item active">
              <Mail size={18} /> <span>Inbox</span> <span className="inbox-count">1</span>
            </div>
            <div className="nav-item"><Star size={18} /> <span>Starred</span></div>
            <div className="nav-item"><Clock size={18} /> <span>Snoozed</span></div>
            <div className="nav-item"><Trash2 size={18} /> <span>Trash</span></div>
          </div>
        </aside>

        {/* Email List/Detail Area */}
        <main className="gmail-content">
          {!selectedEmail ? (
            <div className="email-list">
              <div className="list-toolbar">
                <div className="flex items-center gap-md">
                  <input type="checkbox" />
                  <Archive size={18} />
                  <Trash2 size={18} />
                </div>
              </div>
              <div className="email-row unread" onClick={() => setSelectedEmail(true)}>
                <div className="row-left">
                  <input type="checkbox" onClick={(e) => e.stopPropagation()} />
                  <Star size={18} className="star-icon" />
                  <span className="sender-name">MIS Dash Admin</span>
                </div>
                <div className="row-center">
                  <span className="subject">Welcome to MIS Dash!</span>
                  <span className="snippet"> - Hi {pendingUser?.username}, We're excited to have you join MIS Dash...</span>
                </div>
                <div className="row-right">
                  <span className="time">{emailTime}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="email-detail">
              <div className="detail-toolbar">
                <button className="back-btn" onClick={() => setSelectedEmail(false)}>
                  <ArrowLeft size={18} />
                </button>
                <div className="flex gap-md">
                  <Archive size={18} />
                  <Trash2 size={18} />
                  <Mail size={18} />
                </div>
              </div>
              <div className="detail-content">
                <h2 className="detail-subject">Welcome to MIS Dash!</h2>
                <div className="detail-header">
                  <div className="avatar-circle">M</div>
                  <div className="header-info">
                    <div className="flex items-center gap-sm">
                      <span className="font-bold">MIS Dash Admin</span>
                      <span className="text-xs text-muted">&lt;admin@mis-dash.com&gt;</span>
                    </div>
                    <div className="text-xs text-muted">to me</div>
                  </div>
                  <div className="header-time text-xs text-muted">{emailTime}</div>
                </div>
                <div className="email-body-text">
                  <p>Hi <strong>{pendingUser?.username}</strong>,</p>
                  <p>We're excited to have you join <strong>MIS Dash</strong>! To complete your registration and start managing your school system efficiently, please use the following verification code:</p>
                  <div className="otp-display-box">
                    <span className="otp-code-text">123456</span>
                    <button className="copy-hint" onClick={() => {
                      navigator.clipboard.writeText('123456');
                      const toast = document.createElement('div');
                      toast.textContent = 'Code copied to clipboard!';
                      toast.style.cssText = 'position:fixed;bottom:20px;right:20px;background:var(--success);color:white;padding:12px 20px;border-radius:8px;z-index:9999;';
                      document.body.appendChild(toast);
                      setTimeout(() => toast.remove(), 2000);
                    }}>Copy Code</button>
                  </div>
                  <p>This code will expire in 10 minutes. If you didn't request this, please ignore this email.</p>
                  <p>Best regards,<br/><strong>The MIS Dash Team</strong></p>
                </div>
                <div className="detail-footer">
                  <Link to="/verify-otp" className="btn btn-primary">
                    <ExternalLink size={16} /> Return to Verify Page
                  </Link>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <style>{`
        .gmail-container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: #f6f8fc;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #202124;
        }
        .gmail-header {
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          background: white;
          border-bottom: 1px solid #e0e0e0;
        }
        .header-left, .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .header-icon {
          color: #5f6368;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
        }
        .header-icon:hover { background: #f1f3f4; }
        .gmail-logo img { height: 24px; }
        .header-center { flex: 1; max-width: 720px; margin: 0 32px; }
        .search-bar {
          display: flex;
          align-items: center;
          background: #f1f3f4;
          padding: 0 16px;
          border-radius: 8px;
          height: 48px;
        }
        .search-icon { color: #5f6368; margin-right: 12px; }
        .search-bar input {
          border: none;
          background: transparent;
          width: 100%;
          outline: none;
          font-size: 16px;
        }
        .avatar-circle {
          width: 32px;
          height: 32px;
          background: #4361ee;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
        .gmail-main { display: flex; flex: 1; overflow: hidden; }
        .gmail-sidebar {
          width: 256px;
          padding: 16px 8px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .compose-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #c2e7ff;
          border: none;
          padding: 16px 24px;
          border-radius: 16px;
          font-weight: 500;
          cursor: pointer;
          width: fit-content;
          margin-bottom: 16px;
          transition: box-shadow 0.2s;
        }
        .compose-btn:hover { box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
        .sidebar-nav { display: flex; flex-direction: column; }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 24px;
          border-radius: 0 20px 20px 0;
          cursor: pointer;
          color: #202124;
          font-size: 14px;
        }
        .nav-item:hover { background: #e8eaed; }
        .nav-item.active {
          background: #d3e3fd;
          color: #041e49;
          font-weight: bold;
        }
        .inbox-count { margin-left: auto; font-size: 12px; }
        .gmail-content { flex: 1; background: white; margin: 8px; border-radius: 16px; display: flex; flex-direction: column; overflow: hidden; }
        .list-toolbar, .detail-toolbar {
          height: 48px;
          padding: 0 16px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #f1f3f4;
          gap: 20px;
          color: #5f6368;
        }
        .email-row {
          display: flex;
          align-items: center;
          padding: 0 16px;
          height: 40px;
          border-bottom: 1px solid #f1f3f4;
          cursor: pointer;
          font-size: 14px;
        }
        .email-row:hover { box-shadow: inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0, 0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15); z-index: 1; }
        .email-row.unread { background: #f2f6fc; font-weight: bold; }
        .row-left { display: flex; align-items: center; gap: 12px; width: 200px; }
        .star-icon { color: #f8bc04; }
        .row-center { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .snippet { font-weight: normal; color: #5f6368; }
        .row-right { margin-left: 16px; }
        .email-detail { padding: 20px 32px; overflow-y: auto; }
        .detail-subject { font-size: 22px; margin-bottom: 24px; }
        .detail-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
        .header-info { flex: 1; }
        .email-body-text { font-size: 14px; line-height: 1.6; color: #202124; }
        .otp-display-box {
          margin: 24px 0;
          padding: 24px;
          background: #f8f9fa;
          border: 1px dashed #4361ee;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .otp-code-text {
          font-size: 32px;
          font-weight: 800;
          letter-spacing: 8px;
          color: #4361ee;
        }
        .copy-hint {
          padding: 6px 12px;
          background: white;
          border: 1px solid #dadce0;
          border-radius: 4px;
          font-size: 12px;
          cursor: pointer;
        }
        .copy-hint:hover { background: #f1f3f4; }
        .detail-footer { margin-top: 48px; border-top: 1px solid #f1f3f4; padding-top: 24px; }
        .back-btn { background: none; border: none; cursor: pointer; color: #5f6368; padding: 8px; border-radius: 50%; }
        .back-btn:hover { background: #f1f3f4; }
      `}</style>
    </div>
  );
};

export default GmailSimulator;
