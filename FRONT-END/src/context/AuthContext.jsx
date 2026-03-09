import { createContext, useContext, useState, useEffect } from 'react';

const AUTH_STORAGE_KEY = 'mis-logged-in-user';
const AVATAR_STORAGE_KEY = 'mis-admin-avatar';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser({
          ...parsed,
          avatar: localStorage.getItem(AVATAR_STORAGE_KEY) || 
            "https://api.dicebear.com/7.x/avataaars/svg?seed=" + (parsed.name || 'Alex'),
        });
      } catch {
        setUser(null);
      }
    }
  }, []);

  const login = (username) => {
    const userData = { name: username.trim(), role: 'Admin' };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
    setUser({
      ...userData,
      avatar: localStorage.getItem(AVATAR_STORAGE_KEY) || 
        "https://api.dicebear.com/7.x/avataaars/svg?seed=" + username,
    });
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  };

  const updateAvatar = (avatarUrl) => {
    setUser(prev => prev ? { ...prev, avatar: avatarUrl } : null);
    if (avatarUrl) {
      localStorage.setItem(AVATAR_STORAGE_KEY, avatarUrl);
    } else {
      localStorage.removeItem(AVATAR_STORAGE_KEY);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateAvatar }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export { AUTH_STORAGE_KEY };
