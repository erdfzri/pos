import React, { useState } from 'react';
import { Users, Plus, Shield, Mail, Phone, Store, Search, Trash2, CheckCircle2, Lock, Loader2 } from 'lucide-react';
import API from '../../api/axios';

const initialAdmins = [
  { id: 1, name: 'Aditya Pratama', email: 'aditya.pratama@posmart.com', phone: '0812-3456-7890', warungName: 'Warung Berkah', status: 'Active', joinedDate: '12 Jan 2026' },
  { id: 2, name: 'Budi Santoso', email: 'budi.santoso@posmart.com', phone: '0821-9876-5432', warungName: 'Warung Makmur', status: 'Active', joinedDate: '15 Jan 2026' },
  { id: 3, name: 'Citra Amelia', email: 'citra.amelia@posmart.com', phone: '0857-1122-3344', warungName: 'Cafe Kopi', status: 'Active', joinedDate: '20 Feb 2026' },
  { id: 4, name: 'Dedi Wijaya', email: 'dedi.wijaya@posmart.com', phone: '0819-5566-7788', warungName: 'Ritel Utama', status: 'Active', joinedDate: '01 Mar 2026' },
  { id: 5, name: 'Eka Lestari', email: 'eka.lestari@posmart.com', phone: '0813-4455-6677', warungName: 'Toko Kue', status: 'Active', joinedDate: '10 Apr 2026' },
];

const Admins = () => {
  const [admins, setAdmins] = useState(initialAdmins);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form states
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newWarungName, setNewWarungName] = useState('Warung Berkah');

  const filteredAdmins = admins.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.warungName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim() || !newPassword.trim()) {
      setError('Nama, Email, dan Password wajib diisi.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Call GIN Gonic backend API to securely register the Admin Warung account
      const response = await API.post('/auth/register', {
        username: newName,
        email: newEmail,
        password: newPassword,
        role: 'Admin Warung',
        warung_name: newWarungName
      });

      const registeredUser = response.data.user;

      // Append new account to local dashboard listing
      const newAdmin = {
        id: registeredUser.id || Date.now(),
        name: registeredUser.username,
        email: registeredUser.email,
        phone: newPhone || 'N/A',
        warungName: registeredUser.warung_name || newWarungName,
        status: 'Active',
        joinedDate: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
      };

      setAdmins([newAdmin, ...admins]);

      // Reset Form fields
      setNewName('');
      setNewEmail('');
      setNewPassword('');
      setNewPhone('');
      setShowModal(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Pendaftaran Admin Toko gagal. Email/Username mungkin sudah terpakai.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAdmin = (id) => {
    if (window.confirm('Apakah Anda yakin ingin mencabut hak akses Admin Warung ini?')) {
      setAdmins(admins.filter(a => a.id !== id));
    }
  };

  return (
    <div className="animate-fade-in product-page-ui" style={{ padding: '0 0.5rem' }}>
      <div className="page-header-modern" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1>Kelola Admin Warung</h1>
          <p>Merchant Owner Panel • Kelola hak akses akun penanggung jawab masing-masing warung Anda.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={20} /> Tambah Admin Toko
        </button>
      </div>

      <div className="card product-card-table">
        <div className="table-toolbar">
          <div className="table-search-box">
            <Search size={18} className="search-icon-inline" />
            <input 
              type="text" 
              placeholder="Cari admin berdasarkan nama, email, atau warung..." 
              className="table-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="saas-table">
            <thead>
              <tr>
                <th>Nama Lengkap</th>
                <th>Email Akun</th>
                <th>No. Telepon</th>
                <th>Warung yang Dikelola</th>
                <th>Tanggal Bergabung</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.map((admin, idx) => (
                <tr key={admin.id} style={{ animationDelay: `${idx * 0.05}s` }} className="animate-fade-in">
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ background: '#EFF6FF', color: '#2563EB', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
                        {admin.name.charAt(0)}
                      </div>
                      <span className="font-semibold" style={{ color: '#1E293B' }}>{admin.name}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B' }}>
                      <Mail size={14} /> {admin.email}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B' }}>
                      <Phone size={14} /> {admin.phone}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#2563EB' }}>
                      <Store size={14} /> {admin.warungName}
                    </div>
                  </td>
                  <td style={{ color: '#64748B' }}>{admin.joinedDate}</td>
                  <td>
                    <span style={{ background: '#D1FAE5', color: '#065F46', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={12} /> {admin.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons-cell" style={{ justifyContent: 'center' }}>
                      <button 
                        onClick={() => handleDeleteAdmin(admin.id)}
                        className="icon-action delete" 
                        aria-label="Cabut Hak Akses"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Admin */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999
        }}>
          <div className="animate-fade-in" style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '460px',
            padding: '1.75rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}>
            <h2 style={{ margin: '0 0 0.25rem 0', fontWeight: 800, color: '#1E293B' }}>Daftarkan Admin Toko Baru</h2>
            <p style={{ margin: '0 0 1.25rem 0', color: '#64748B', fontSize: '0.85rem' }}>Berikan kredensial Admin Warung kepada penanggung jawab outlet terpilih.</p>
            
            <form onSubmit={handleAddAdmin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>Nama Lengkap Admin / Username</label>
                <input 
                  type="text" 
                  placeholder="Contoh: aditya_pratama"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                  disabled={loading}
                  style={{ padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>Email Akun Admin</label>
                <input 
                  type="email" 
                  placeholder="Contoh: aditya.p@posmart.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                  disabled={loading}
                  style={{ padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>Kata Sandi (Password)</label>
                <input 
                  type="password" 
                  placeholder="Minimal 6 karakter"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={loading}
                  style={{ padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>Nomor Telepon Seluler</label>
                <input 
                  type="text" 
                  placeholder="Contoh: 0812-XXXX-XXXX"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  disabled={loading}
                  style={{ padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>Tugaskan ke Warung</label>
                <select 
                  value={newWarungName}
                  onChange={(e) => setNewWarungName(e.target.value)}
                  disabled={loading}
                  style={{ padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', background: '#FFFFFF' }}
                >
                  <option value="Warung Berkah">Warung Berkah (Bandung)</option>
                  <option value="Warung Makmur">Warung Makmur (Jakarta)</option>
                  <option value="Cafe Kopi">Cafe Kopi (Bandung)</option>
                  <option value="Ritel Utama">Ritel Utama (Surabaya)</option>
                  <option value="Toko Kue">Toko Kue (Medan)</option>
                </select>
              </div>

              {error && <div style={{ color: '#EF4444', fontSize: '0.85rem', fontWeight: 600 }}>{error}</div>}

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  disabled={loading}
                  style={{ flex: 1, padding: '0.75rem', border: '1px solid #E2E8F0', background: '#FFFFFF', color: '#64748B', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  style={{ flex: 1, padding: '0.75rem', border: 'none', background: '#2563EB', color: '#FFFFFF', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                >
                  {loading ? 'Mendaftarkan...' : 'Daftarkan Admin'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admins;
