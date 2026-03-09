import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, User, Mail, Lock, ArrowLeft, ShieldCheck } from 'lucide-react';
import emailjs from '@emailjs/browser';
import ThemeToggle from '../components/ThemeToggle';
import '../styles/components.css';
import '../styles/login.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const sendRealEmail = async (userData) => {
    try {
      // These should ideally be in .env file, but for demo we can place placeholders
      const SERVICE_ID = "service_xxxx";
      const TEMPLATE_ID = "template_xxxx";
      const PUBLIC_KEY = "your_public_key";

      const templateParams = {
        to_name: userData.username,
        to_email: userData.email,
        from_name: "MIS Dash Admin",
        otp_code: "123456",
        message: "Welcome to MIS Dash! Your registration is almost complete."
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      console.log('Real email sent successfully via EmailJS');
    } catch (err) {
      console.error('EmailJS Error:', err);
      // We still proceed for demo purposes even if email fails
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    // Save pending signup data
    const userData = {
      username: formData.username,
      email: formData.email
    };
    localStorage.setItem('pending-signup', JSON.stringify(userData));

    // Try to send real email
    await sendRealEmail(userData);

    // Simulate short delay for UX
    setTimeout(() => {
      setLoading(false);
      navigate('/verify-otp');
    }, 1000);
  };

  return (
    <div className="login-page">
      <div className="login-theme-wrap">
        <ThemeToggle />
      </div>
      <div className="login-card card">
        <div className="login-header">
          <h1 className="login-title">Create MIS Dash Account</h1>
          <p className="login-subtitle">Join MIS Dash to manage your school system</p>
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
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
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
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-wrapper">
              <ShieldCheck size={18} className="input-icon" />
              <input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-full login-btn" disabled={loading}>
            {loading ? 'Creating Account...' : (
              <>
                <UserPlus size={20} />
                Sign Up
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Already have an account? <Link to="/login" className="text-primary font-bold">Login here</Link></p>
        </div>

        <Link to="/" className="login-back">
          <ArrowLeft size={16} /> Back to home
        </Link>
      </div>

      <style>{`
        .login-footer {
          margin-top: 1.5rem;
          text-align: center;
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .text-primary {
          color: var(--primary);
          text-decoration: none;
        }
        .text-primary:hover {
          text-decoration: underline;
        }
        .font-bold {
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};

export default Signup;
