import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, ArrowLeft, RefreshCw, Mail } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import { useAuth } from '../context/AuthContext';
import '../styles/components.css';
import '../styles/login.css';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [pendingUser, setPendingUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('pending-signup');
    if (!stored) {
      navigate('/signup');
      return;
    }
    setPendingUser(JSON.parse(stored));

    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, [navigate]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value !== '') {
      element.nextSibling.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);

    // Focus the last filled input or the first empty one
    const lastIndex = Math.min(pastedData.length, 5);
    const inputs = document.querySelectorAll('.otp-field');
    if (inputs[lastIndex]) inputs[lastIndex].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '' && e.target.previousSibling) {
        e.target.previousSibling.focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join('');

    if (otpCode.length < 6) {
      setError('Please enter the full 6-digit code');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate OTP verification (demo code is 123456)
    setTimeout(() => {
      if (otpCode === '123456') {
        setLoading(false);
        const userData = JSON.parse(localStorage.getItem('pending-signup'));
        localStorage.removeItem('pending-signup');
        login(userData.username);
        navigate('/dashboard');
      } else {
        setLoading(false);
        setError('Invalid OTP code. Please use the code sent to your email.');
      }
    }, 1500);
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(30);
      // Logic to resend OTP
      const toast = document.createElement('div');
      toast.textContent = 'New OTP sent to your email!';
      toast.style.cssText = 'position:fixed;bottom:20px;right:20px;background:var(--primary);color:white;padding:12px 20px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);font-size:0.9rem;z-index:9999;';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }
  };

  return (
    <div className="login-page">
      <div className="login-theme-wrap">
        <ThemeToggle />
      </div>
      <div className="login-card card">
        <div className="login-header">
          <div className="otp-icon-wrap flex justify-center mb-md">
            <ShieldCheck size={48} className="text-primary" />
          </div>
          <h1 className="login-title">Welcome to MIS Dash!</h1>
          <p className="login-subtitle">
            We're excited to have you join MIS Dash community. <br />
            Please enter the 6-digit verification code sent to <br />
            <span className="font-bold text-primary">{pendingUser?.email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="login-error" role="alert">
              {error}
            </div>
          )}

          <div className="otp-input-group flex justify-between gap-xs mb-lg">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="otp-field"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>

          <div className="login-footer">
            <p>Didn't receive the code? Check your <Link to="/gmail" className="text-primary font-bold">Gmail Inbox</Link></p>
          </div>

          <button type="submit" className="btn btn-primary btn-full login-btn" disabled={loading}>
            {loading ? 'Verifying...' : (
              <>
                <ArrowRight size={20} />
                Verify & Continue
              </>
            )}
          </button>
        </form>

        <div className="login-footer flex-col gap-sm mt-lg">
          <p className="text-sm text-muted">Didn't receive the code?</p>
          <button
            className={`btn-link ${timer > 0 ? 'disabled' : ''}`}
            onClick={handleResend}
            disabled={timer > 0}
          >
            {timer > 0 ? `Resend code in ${timer}s` : (
              <span className="flex items-center gap-xs justify-center">
                <RefreshCw size={14} /> Resend OTP
              </span>
            )}
          </button>
        </div>

        <Link to="/signup" className="login-back">
          <ArrowLeft size={16} /> Change email address
        </Link>
      </div>

      <style>{`
        .otp-icon-wrap {
          background: rgba(99, 102, 241, 0.1);
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          border: 2px solid rgba(99, 102, 241, 0.2);
        }
        .otp-email-mock {
          background: var(--bg-main);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          overflow: hidden;
          text-align: left;
          box-shadow: var(--shadow-sm);
        }
        .email-header {
          background: rgba(99, 102, 241, 0.05);
          border-bottom: 1px solid var(--border-color);
        }
        .email-body {
          background: white;
          color: #333;
        }
        [data-theme='dark'] .email-body {
          background: #1e293b;
          color: #e2e8f0;
        }
        .email-text {
          font-size: 0.85rem;
          line-height: 1.6;
          margin: 0;
        }
        .email-otp-code {
          display: inline-block;
          padding: 8px 16px;
          background: rgba(99, 102, 241, 0.1);
          color: var(--primary);
          font-weight: 800;
          font-size: 1.2rem;
          letter-spacing: 4px;
          border-radius: 8px;
          border: 1px dashed var(--primary);
        }
        .otp-field {
          width: 45px;
          height: 55px;
          border: 2px solid var(--border-color);
          border-radius: 8px;
          background: var(--bg-main);
          color: var(--text-main);
          font-size: 1.5rem;
          font-weight: 700;
          text-align: center;
          transition: var(--transition);
        }
        .otp-field:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
          transform: translateY(-2px);
        }
        .btn-link {
          background: none;
          border: none;
          color: var(--primary);
          font-weight: 600;
          cursor: pointer;
          font-size: 0.9rem;
        }
        .btn-link:hover:not(:disabled) {
          text-decoration: underline;
        }
        .btn-link.disabled {
          color: var(--text-muted);
          cursor: not-allowed;
        }
        .font-bold {
          font-weight: 700;
        }
        @media (max-width: 480px) {
          .otp-field {
            width: 35px;
            height: 45px;
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default VerifyOTP;
