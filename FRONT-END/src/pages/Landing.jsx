import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, LayoutDashboard, BarChart2, Shield, Sparkles } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import '../styles/components.css';
import '../styles/landing.css';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-nav">
        <div className="landing-logo">
          <div className="landing-logo-icon">M</div>
          <span>MIS Dash</span>
        </div>
        <ThemeToggle />
      </div>

      <div className="landing-hero">
        <div className="landing-glow landing-glow-1"></div>
        <div className="landing-glow landing-glow-2"></div>
        <div className="landing-glow landing-glow-3"></div>

        <div className="landing-content">
          <div className="landing-badge">
            <Sparkles size={14} />
            Management Information System
          </div>
          <h1 className="landing-title">
            Streamline your operations with
            <span className="landing-title-accent"> intelligent insights</span>
          </h1>
          <p className="landing-subtitle">
            Monitor performance, generate reports, and manage your team in one unified dashboard. 
            Built for clarity and efficiency.
          </p>
          <button 
            className="btn btn-primary landing-cta" 
            onClick={() => navigate('/login')}
          >
            Get Started
            <ArrowRight size={20} strokeWidth={2.5} />
          </button>
        </div>

        <div className="landing-features">
          <div className="feature-card">
            <div className="feature-icon-wrap">
              <LayoutDashboard size={24} strokeWidth={2} />
            </div>
            <h3>Dashboard</h3>
            <p>Real-time overview of your system metrics</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrap">
              <BarChart2 size={24} strokeWidth={2} />
            </div>
            <h3>Reports</h3>
            <p>Generate and export detailed analytics</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrap">
              <Shield size={24} strokeWidth={2} />
            </div>
            <h3>Secure</h3>
            <p>Enterprise-grade security for your data</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
