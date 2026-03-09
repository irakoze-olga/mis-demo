import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { ProjectProvider } from './context/ProjectContext';
import { UserProvider } from './context/UserContext';
import ThemeInit from './components/ThemeInit';
import './App.css';
import './styles/layout.css';

// Pages
import Landing from './pages/Landing';
import Login from './pages/login';
import Signup from './pages/Signup';
import VerifyOTP from './pages/VerifyOTP';
import GmailSimulator from './pages/GmailSimulator';
import Dashboard from './pages/dashboard';
import Reports from './pages/reports';
import Settings from './pages/settings';
import Users from './pages/users';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import Projects from './pages/Projects';

// Layout components
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

function DashboardLayout({ children }) {
  const { user, updateAvatar, logout } = useAuth();

  return (
    <div className="app-container">
      <Header user={user} onAvatarChange={updateAvatar} />
      <div className="app-content">
        <Sidebar onLogout={logout} />
        <main className="main-content">{children}</main>
      </div>
      <Footer />
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <UserProvider>
          <ProjectProvider>
            <ThemeInit>
              <Router>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/verify-otp" element={<VerifyOTP />} />
                  <Route path="/gmail" element={<GmailSimulator />} />

                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <DashboardLayout>
                          <Dashboard />
                        </DashboardLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/reports"
                    element={
                      <ProtectedRoute>
                        <DashboardLayout>
                          <Reports />
                        </DashboardLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute>
                        <DashboardLayout>
                          <Settings />
                        </DashboardLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/users"
                    element={
                      <ProtectedRoute>
                        <DashboardLayout>
                          <Users />
                        </DashboardLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/notifications"
                    element={
                      <ProtectedRoute>
                        <DashboardLayout>
                          <Notifications />
                        </DashboardLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <DashboardLayout>
                          <Profile />
                        </DashboardLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/projects"
                    element={
                      <ProtectedRoute>
                        <DashboardLayout>
                          <Projects />
                        </DashboardLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Router>
            </ThemeInit>
          </ProjectProvider>
        </UserProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
