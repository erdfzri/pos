import React, { useState } from 'react';
import { Users, Plus, Shield, Mail, Calendar, Search, Trash2, CheckCircle2, UserCheck, Lock, Loader2 } from 'lucide-react';
import API from '../../api/axios';

const initialStaff = [
  { id: 1, name: 'Ahmad Faisal', email: 'ahmad.faisal@posmart.com', phone: '0812-4455-6677', shift: 'Shift Pagi (08:00 - 16:00)', transactions: '67 Transaksi', revenue: 'Rp 3,250,000', rating: '4.8/5.0', status: 'Active' },
  { id: 2, name: 'Siti Rahma', email: 'siti.rahma@posmart.com', phone: '0821-5566-7788', shift: 'Shift Sore (16:00 - 24:00)', transactions: '54 Transaksi', revenue: 'Rp 2,820,000', rating: '4.9/5.0', status: 'Active' },
  { id: 3, name: 'Rian Hidayat', email: 'rian.hidayat@posmart.com', phone: '0857-8899-0011', shift: 'Shift Pagi (08:00 - 16:00)', transactions: '39 Transaksi', revenue: 'Rp 1,980,000', rating: '4.7/5.0', status: 'Active' },
];

const Staff = () => {
  const [staffList, setStaffList] = useState(initialStaff);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form states
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newShift, setNewShift] = useState('Shift Pagi (08:00 - 16:00)');

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : { username: 'Ferra Alexandra', role: 'Admin Warung', warung_name: 'Warung POSmart' };

  const filteredStaff = staffList.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStaff = async (e) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim() || !newPassword.trim()) {
      setError('Nama, Email, dan Password wajib diisi.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Call GIN Gonic backend API to securely register the Staff / Kasir account
      // Automatically binds them to the current logged-in admin's Warung name
      const response = await API.post('/auth/register', {
        username: newName,
        email: newEmail,
        password: newPassword,
        role: 'Staff / Kasir',
        warung_name: user.warung_name || 'Warung POSmart'
      });

      const registeredUser = response.data.user;

      // Append new cashier to local dashboard listing
      const newStaffMember = {
        id: registeredUser.id || Date.now(),
        name: registeredUser.username,
        email: registeredUser.email,
        phone: newPhone || 'N/A',
        shift: newShift,
        transactions: '0 Transaksi',
        revenue: 'Rp 0',
        rating: '5.0/5.0',
        status: 'Active'
      };

      setStaffList([newStaffMember, ...staffList]);

      // Reset Form fields
      setNewName('');
      setNewEmail('');
      setNewPassword('');
      setNewPhone('');
      setShowModal(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Pendaftaran Kasir gagal. Email/Username mungkin sudah terpakai.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStaff = (id) => {
    if (window.confirm('Apakah Anda yakin ingin memberhentikan kasir/staff ini?')) {
      setStaffList(staffList.filter(s => s.id !== id));
    }
  };

  return (
    <div className="animate-fade-in product-page-ui" style={{ padding: '0 0.5rem' }}>
      <div className="page-header-modern" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1>Manajemen Staff & Kasir</h1>
          <p>Admin Warung Panel • Kelola staff kasir untuk <strong>{user.warung_name || 'Warung Anda'}</strong>.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={20} /> Daftarkan Staff Baru
        </button>
      </div>

      <div className="card product-card-table">
        <div className="table-toolbar">
          <div className="table-search-box">
            <Search size={18} className="search-icon-inline" />
            <input 
              type="text" 
              placeholder="Cari nama staff kasir..." 
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
                <th>Nama Staff / Kasir</th>
                <th>Email Akun</th>
                <th>No. Telepon</th>
                <th>Jadwal Shift Kerja</th>
                <th>Transaksi Hari Ini</th>
                <th>Omzet Penjualan</th>
                <th>Rating Pelayanan</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((staff, idx) => (
                <tr key={staff.id} style={{ animationDelay: `${idx * 0.05}s` }} className="animate-fade-in">
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ background: '#ECFDF5', color: '#10B981', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
                        {staff.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-semibold" style={{ color: '#1E293B', display: 'block' }}>{staff.name}</span>
                        <span style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 600 }}>ID Staff: STF-{staff.id.toString().slice(-4)}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ color: '#64748B' }}>{staff.email}</div>
                  </td>
                  <td>
                    <div style={{ color: '#64748B' }}>{staff.phone}</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#475569', fontSize: '0.82rem' }}>
                      <Calendar size={13} style={{ color: '#94A3B8' }} /> {staff.shift}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.78rem', background: '#EFF6FF', color: '#2563EB', padding: '0.2rem 0.5rem', borderRadius: '6px', fontWeight: 700 }}>
                      {staff.transactions}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700, color: '#1E293B' }}>{staff.revenue}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700, color: '#F59E0B' }}>
                      ★ {staff.rating}
                    </div>
                  </td>
                  <td>
                    <span style={{ background: '#D1FAE5', color: '#065F46', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={12} /> {staff.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons-cell" style={{ justifyContent: 'center' }}>
                      <button 
                        onClick={() => handleDeleteStaff(staff.id)}
                        className="icon-action delete" 
                        aria-label="Pecat Staff"
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

      {/* Modal Add Staff */}
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
            <h2 style={{ margin: '0 0 0.25rem 0', fontWeight: 800, color: '#1E293B' }}>Hadirkan Staff Kasir Baru</h2>
            <p style={{ margin: '0 0 1.25rem 0', color: '#64748B', fontSize: '0.85rem' }}>Daftarkan akun kasir baru untuk shift operasional warung Anda.</p>
            
            <form onSubmit={handleAddStaff} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>Nama Lengkap Staff / Username</label>
                <input 
                  type="text" 
                  placeholder="Contoh: ahmad_faisal"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                  disabled={loading}
                  style={{ padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>Email Akun Kasir</label>
                <input 
                  type="email" 
                  placeholder="Contoh: ahmad.f@posmart.com"
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
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>Jadwal Shift Tugas</label>
                <select 
                  value={newShift}
                  onChange={(e) => setNewShift(e.target.value)}
                  disabled={loading}
                  style={{ padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', background: '#FFFFFF' }}
                >
                  <option value="Shift Pagi (08:00 - 16:00)">Shift Pagi (08:00 - 16:00)</option>
                  <option value="Shift Sore (16:00 - 24:00)">Shift Sore (16:00 - 24:00)</option>
                  <option value="Shift Full-Day (08:00 - 20:00)">Shift Full-Day (08:00 - 20:00)</option>
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
                  style={{ flex: 1, padding: '0.75rem', border: 'none', background: '#10B981', color: '#FFFFFF', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                >
                  {loading ? 'Mendaftarkan...' : 'Daftarkan Staff'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;
