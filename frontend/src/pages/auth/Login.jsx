import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import API from '../../api/axios';
import logoIcon from '../../assets/logo_icon.png';
import logoFull from '../../assets/logo_full.png';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="advanture-auth-page">
      {/* Background soft circular decorations */}
      <div className="bg-deco bg-deco-1"></div>
      <div className="bg-deco bg-deco-2"></div>
      
      <div className="advanture-auth-card">
        {/* Left Side: Mockup Perfect Left Panel */}
        <div className="advanture-auth-left">
          {/* Logo brand top-left - Transparent Full Logo */}
          <div className="left-logo-container-full-transparent">
            <img src={logoFull} alt="CassaSmart" className="left-logo-full-img" />
          </div>

          {/* Decorative Floating shapes (Sama Persis Mockup) */}
          <div className="advanture-circle-deco-1"></div>
          <div className="advanture-circle-deco-2"></div>
          <div className="advanture-blob-deco"></div>
          
          {/* Dot Grid bottom-right */}
          <div className="advanture-dot-grid-deco"></div>
          
          {/* Wavy lines middle-right (5 parallel wave stripes) */}
          <svg className="advanture-wavy-lines-deco" viewBox="0 0 100 150" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="3.5" strokeLinecap="round">
            <path d="M10,10 Q25,25 10,40 T10,70 T10,100 T10,130" />
            <path d="M30,10 Q45,25 30,40 T30,70 T30,100 T30,130" />
            <path d="M50,10 Q65,25 50,40 T50,70 T50,100 T50,130" />
            <path d="M70,10 Q85,25 70,40 T70,70 T70,100 T70,130" />
            <path d="M90,10 Q105,25 90,40 T90,70 T90,100 T90,130" />
          </svg>
          
          <div className="advanture-left-content">
            <h1 className="advanture-title">Hello,<br />welcome!</h1>
            <p className="advanture-subtitle">
              Satu platform cerdas kelola kasir,<br />
              stok barang, & ekspansi cabang ritel Anda.
            </p>
          </div>
        </div>
        
        {/* Right Side: Clean White Form Panel */}
        <div className="advanture-auth-right">
          <div className="advanture-form-container">
            {/* Elegant Large Brand Icon Container */}
            <div className="brand-icon-box-large">
              <img src={logoIcon} alt="CassaSmart Icon" className="brand-icon-img-large" />
            </div>
            
            <h2 className="advanture-right-greeting">Hello ! Welcome back</h2>
            
            <form onSubmit={handleLogin} className="advanture-form">
              <div className="advanture-input-group">
                <label>Email</label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-field-icon" />
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
              </div>
              
              <div className="advanture-input-group">
                <label>Password</label>
                <div className="input-with-icon">
                  <Lock size={18} className="input-field-icon" />
                  <input 
                    type="password" 
                    placeholder="••••••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
              </div>

              {error && <div className="advanture-error-box">{error}</div>}
              
              <div className="advanture-form-options">
                <label className="remember-me-label">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <a href="#reset" className="forgot-password-link" onClick={(e) => { e.preventDefault(); alert('Hubungi Super Admin untuk menyetel ulang kata sandi Anda.'); }}>
                  Reset Password!
                </a>
              </div>
              
              <button type="submit" className="advanture-submit-btn" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            
            {/* Social Separator */}
            <div className="social-separator">
              <span>or</span>
            </div>
            
            {/* Social Logins */}
            <div className="social-logins-row">
              <button className="social-btn" onClick={() => alert('Integrasi Google Login segera hadir!')} title="Sign in with Google">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="#EA4335" d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.96 1 12 1 7.35 1 3.39 3.65 1.44 7.5l3.8 2.95C6.14 7.04 8.84 5.04 12 5.04z" />
                  <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.44c-.28 1.48-1.12 2.73-2.38 3.58l3.7 2.87c2.16-1.99 3.43-4.92 3.43-8.6z" />
                  <path fill="#FBBC05" d="M5.24 14.55c-.25-.75-.39-1.55-.39-2.38s.14-1.63.39-2.38L1.44 6.84C.52 8.68 0 10.77 0 13s.52 4.32 1.44 6.16l3.8-2.61z" />
                  <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.7-2.87c-1.11.75-2.53 1.19-4.26 1.19-3.16 0-5.86-2-6.76-4.96L1.44 16.1C3.39 20.35 7.35 23 12 23z" />
                </svg>
              </button>
              <button className="social-btn" onClick={() => alert('Integrasi Facebook Login segera hadir!')} title="Sign in with Facebook">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button className="social-btn" onClick={() => alert('Integrasi Apple Login segera hadir!')} title="Sign in with Apple">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#000000">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.51-.62.71-1.16 1.85-1.01 2.96 1.11.09 2.27-.57 2.96-1.41z" />
                </svg>
              </button>
            </div>
            
            {/* Dont have account footer */}
            <p className="advanture-right-footer">
              Dont Have an account? <Link to="/register">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
