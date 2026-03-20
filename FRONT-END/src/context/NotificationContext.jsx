import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Project Completed',
      message: 'Project Alpha has been successfully completed and marked as done.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Deadline Approaching',
      message: 'Project Beta deadline is approaching in 3 days. Current progress: 75%.',
      time: '5 hours ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'System Update',
      message: 'MIS Dashboard has been updated to version 2.4.0 with new features.',
      time: '1 day ago',
      read: true
    },
    {
      id: 4,
      type: 'error',
      title: 'Failed Login Attempt',
      message: 'Multiple failed login attempts detected from unknown IP address.',
      time: '2 days ago',
      read: true
    },
    {
      id: 5,
      type: 'success',
      title: 'New User Registered',
      message: 'John Doe has successfully registered and joined the team.',
      time: '3 days ago',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const addNotification = (notification) => {
    const newNotif = {
      id: Date.now(),
      read: false,
      time: 'Just now',
      ...notification
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const value = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    addNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
