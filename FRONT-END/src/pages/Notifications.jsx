import React, { useState } from 'react';
import { Bell, Check, CheckCircle, AlertCircle, Info, X, Trash2 } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import '../styles/components.css';

const Notifications = () => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications
  } = useNotifications();

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle size={20} className="text-success" />;
      case 'warning': return <AlertCircle size={20} className="text-warning" />;
      case 'error': return <X size={20} className="text-danger" />;
      case 'info': return <Info size={20} className="text-primary" />;
      default: return <Bell size={20} className="text-muted" />;
    }
  };

  return (
    <div className="notifications-page flex-col gap-xl">
      <header className="page-header flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
          </p>
        </div>
        <div className="flex gap-sm">
          {unreadCount > 0 && (
            <button className="btn btn-secondary" onClick={markAllAsRead}>
              <Check size={18} /> Mark All Read
            </button>
          )}
          {notifications.length > 0 && (
            <button className="btn btn-outline" onClick={clearAllNotifications}>
              <Trash2 size={18} /> Clear All
            </button>
          )}
        </div>
      </header>

      <div className="notifications-list flex-col gap-md">
        {notifications.length === 0 ? (
          <div className="empty-state card flex-col items-center gap-lg" style={{ padding: '3rem' }}>
            <Bell size={48} className="text-muted" />
            <h3 className="text-xl font-bold text-muted">No notifications</h3>
            <p className="text-muted text-center">
              You're all caught up! New notifications will appear here.
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item card ${!notification.read ? 'unread' : ''}`}
            >
              <div className="notification-content flex gap-md">
                <div className="notification-icon flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="notification-details flex-1">
                  <div className="notification-header flex justify-between items-start">
                    <h4 className="notification-title font-bold">{notification.title}</h4>
                    <div className="notification-actions flex gap-xs">
                      {!notification.read && (
                        <button
                          className="icon-btn-sm"
                          onClick={() => markAsRead(notification.id)}
                          title="Mark as read"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      <button
                        className="icon-btn-sm"
                        onClick={() => deleteNotification(notification.id)}
                        title="Delete notification"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="notification-message text-muted">{notification.message}</p>
                  <span className="notification-time text-sm text-muted">{notification.time}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        .notifications-page {
          padding: 2rem;
          max-width: 800px;
          margin: 0 auto;
        }
        .notification-item {
          padding: 1.5rem;
          border-left: 4px solid transparent;
          transition: var(--transition);
          margin-bottom: 1rem;
        }
        .notification-item.unread {
          background: rgba(99, 102, 241, 0.05);
          border-left-color: var(--primary);
        }
        .notification-item:hover {
          transform: translateX(4px);
          box-shadow: var(--shadow-md);
        }
        .notification-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--bg-main);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-color);
        }
        .notification-title {
          margin: 0 0 0.75rem 0;
          font-size: 1.1rem;
        }
        .notification-message {
          margin: 0 0 0.75rem 0;
          line-height: 1.6;
          font-size: 0.95rem;
        }
        .notification-time {
          font-size: 0.85rem;
        }
        .notification-actions {
          opacity: 0;
          transition: var(--transition);
          display: flex;
          gap: 0.5rem;
        }
        .notification-item:hover .notification-actions {
          opacity: 1;
        }
        .icon-btn-sm {
          background: transparent;
          border: none;
          padding: 8px;
          border-radius: 6px;
          color: var(--text-muted);
          cursor: pointer;
          transition: var(--transition);
          min-width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icon-btn-sm:hover {
          background: var(--border-color);
          color: var(--text-main);
        }
        .empty-state {
          text-align: center;
          border-style: dashed;
          border-color: var(--border-color);
        }
      `}</style>
    </div>
  );
};

export default Notifications;
