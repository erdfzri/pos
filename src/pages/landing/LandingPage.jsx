import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <nav className="landing-nav">
        <div className="logo">POSmart</div>
        <div className="nav-links">
          <button onClick={() => navigate('/login')} className="btn-login-nav">Login</button>
          <button onClick={() => navigate('/register')} className="btn-register-nav">Get Started</button>
        </div>
      </nav>

      <main className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Modernize Your Business with <span className="gradient-text">POSmart</span>
          </h1>
          <p className="hero-description">
            The ultimate Point of Sale solution for modern merchants. 
            Manage inventory, track sales, and grow your business with ease and style.
          </p>
          <div className="hero-actions">
            <button onClick={() => navigate('/register')} className="btn-primary">
              Start Free Trial
            </button>
            <button onClick={() => navigate('/login')} className="btn-secondary">
              Sign In to Your Store
            </button>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="abstract-shape shape-1"></div>
          <div className="abstract-shape shape-2"></div>
          <div className="preview-card">
            <div className="card-header">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            <div className="card-body">
              <div className="skeleton-line long"></div>
              <div className="skeleton-line medium"></div>
              <div className="skeleton-grid">
                <div className="skeleton-box"></div>
                <div className="skeleton-box"></div>
                <div className="skeleton-box"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <section className="features">
        <div className="feature-card">
          <div className="icon">🚀</div>
          <h3>Fast & Reliable</h3>
          <p>Process transactions in seconds with our optimized interface.</p>
        </div>
        <div className="feature-card">
          <div className="icon">📊</div>
          <h3>Detailed Analytics</h3>
          <p>Gain insights into your sales patterns and customer behavior.</p>
        </div>
        <div className="feature-card">
          <div className="icon">🔒</div>
          <h3>Secure Data</h3>
          <p>Your business data is protected with industry-standard security.</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
