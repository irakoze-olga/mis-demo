import React from 'react';
import '../../styles/components.css';

const showToast = (msg) => {
  const toast = document.createElement('div');
  toast.textContent = msg;
  toast.style.cssText = 'position:fixed;bottom:20px;right:20px;background:var(--bg-card);padding:12px 20px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);font-size:0.9rem;z-index:9999;border:1px solid var(--border-color);color:var(--text-main)';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
};

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content flex justify-between items-center">
        <div className="footer-left flex items-center gap-md">
          <span className="text-muted text-sm">© 2026 MIS Dashboard</span>
          <span className="badge badge-primary" style={{ fontSize: '0.6rem' }}>v2.4.0-pro</span>
        </div>

        <div className="footer-right flex gap-lg">
          <button type="button" className="footer-link" onClick={() => showToast('Privacy policy')}>Privacy</button>
          <button type="button" className="footer-link" onClick={() => showToast('Terms of service')}>Terms</button>
          <button type="button" className="footer-link" onClick={() => showToast('Support')}>Support</button>
        </div>
      </div>

      <style>{`
        .app-footer {
          padding: var(--space-md) var(--space-lg);
          background: var(--bg-card);
          border-top: 1px solid var(--border-color);
          margin-top: auto;
        }
        .footer-link {
          font-size: 0.8rem;
          color: var(--text-muted);
          transition: var(--transition);
        }
        .footer-link {
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          padding: 0;
        }
        .footer-link:hover { color: var(--primary); }
      `}</style>
    </footer>
  );
};

export default Footer;