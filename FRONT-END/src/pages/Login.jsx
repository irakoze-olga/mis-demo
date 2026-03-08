import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LogIn, User, Lock, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';
import '../styles/components.css';
import '../styles/login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Please enter your username');
      return;
    }

    login(username.trim());
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-theme-wrap">
        <ThemeToggle />
      </div>
      <div className="login-card card">
        <div className="login-header">
          <h1 className="login-title">Login to MIS</h1>
          <p className="login-subtitle">Enter your credentials to access the dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="login-error" role="alert">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                autoComplete="username"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-full login-btn">
            <LogIn size={20} />
            Login
          </button>
        </form>

        <p className="login-hint">
          Demo: Enter any username to proceed.
        </p>
        <Link to="/" className="login-back">
          <ArrowLeft size={16} /> Back to home
        </Link>
      </div>
    </div>
  );
};

export default Login;
