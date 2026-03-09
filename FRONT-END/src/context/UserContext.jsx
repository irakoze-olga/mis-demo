import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@school.com", role: "Admin" },
    { id: 2, name: "Mary Smith", email: "mary@school.com", role: "Teacher" },
    { id: 3, name: "Alex Brown", email: "alex@school.com", role: "Student" },
  ]);

  const addUser = (user) => {
    setUsers(prev => [...prev, { ...user, id: Date.now() }]);
  };

  const deleteUser = (userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const value = {
    users,
    addUser,
    deleteUser,
    totalUsers: users.length
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
