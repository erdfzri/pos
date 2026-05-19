import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Info } from 'lucide-react';
import API from '../../api/axios';
import logoFull from '../../assets/logo_full.png';
import './Auth.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Public signup is exclusively for Merchant Owners (SaaS Subscribing Clients)
      await API.post('/auth/register', { 
        username, 
        email, 
        password, 
        role: 'Merchant Owner', 
        warung_name: businessName 
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: '480px' }}>
        <div className="auth-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={logoFull} alt="CassaSmart Logo" style={{ height: '90px', objectFit: 'contain', marginBottom: '1.25rem' }} />
          <p>Registrasi Akun Merchant Owner / Pemilik Jaringan Ritel & Warung.</p>
        </div>

        {/* Info Banner for SaaS Roles Provisioning policy */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          background: '#EFF6FF',
          border: '1px solid #DBEAFE',
          color: '#1E40AF',
          padding: '0.85rem 1rem',
          borderRadius: '12px',
          fontSize: '0.8rem',
          lineHeight: '1.4',
          marginBottom: '1.5rem',
          textAlign: 'left'
        }}>
          <Info size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>
            <strong>SaaS Multi-Tenant:</strong> Halaman registrasi publik ini dikhususkan untuk akun **Merchant Owner (Pemilik Jaringan Warung)**. Akun **Admin Warung (Kepala Cabang)** dan **Staff / Kasir** hanya dapat dibuat secara mandiri di dalam Dashboard CassaSmart Anda.
          </span>
        </div>
        
        <form onSubmit={handleRegister} className="auth-form">
          <div className="form-group">
            <label>Nama Bisnis / Perusahaan (Company Name)</label>
            <input 
              type="text" 
              placeholder="Contoh: CV Berkah Abadi" 
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Username Pemilik</label>
            <input 
              type="text" 
              placeholder="Contoh: aditya_owner" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="owner@business.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Mendaftarkan Bisnis...' : 'Daftar Sebagai Merchant Owner'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
