import React, { useState, useEffect } from 'react';
import { Users, Plus, Shield, Mail, Phone, Store, Search, Trash2, CheckCircle2, Lock, Building } from 'lucide-react';
import API from '../../api/axios';

const Tenants = () => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPlan, setNewPlan] = useState('Basic');

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await API.get('/tenants');
      setTenants(response.data);
    } catch (err) {
      console.error(err);
      setError('Gagal mengambil data tenant dari backend.');
    } finally {
      setLoading(false);
    }
  };

  const filteredTenants = tenants.filter(t =>
    (t.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.owner || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTenant = async (e) => {
    e.preventDefault();
    if (!newCompanyName || !newOwner || !newEmail) return;

    try {
      const response = await API.post('/tenants', {
        name: newCompanyName,
        owner: newOwner,
        email: newEmail,
        plan: newPlan
      });
      
      setTenants([response.data, ...tenants]);
      
      // Reset Form
      setNewCompanyName('');
      setNewOwner('');
      setNewEmail('');
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Gagal mendaftarkan tenant baru.');
    }
  };

  const handleDeleteTenant = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menangguhkan seluruh bisnis tenant ini? Seluruh cabang dan staff kasir mereka akan diblokir dari POSmart.')) {
      try {
        await API.delete(`/tenants/${id}`);
        setTenants(tenants.filter(t => t.id !== id));
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.error || 'Gagal menghapus tenant.');
      }
    }
  };

  return (
    <div className="animate-fade-in product-page-ui" style={{ padding: '0 0.5rem' }}>
      <div className="page-header-modern" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1>Manajemen Bisnis / Tenants</h1>
          <p>SaaS Owner Panel • Pantau perusahaan berlangganan yang mengoperasikan POSmart.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={20} /> Daftarkan Bisnis Baru
        </button>
      </div>

      <div className="card product-card-table">
        <div className="table-toolbar">
          <div className="table-search-box">
            <Search size={18} className="search-icon-inline" />
            <input 
              type="text" 
              placeholder="Cari berdasarkan nama bisnis, pemilik, atau email..." 
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
                <th>Nama Perusahaan / Bisnis</th>
                <th>Pemilik Utama (Merchant Owner)</th>
                <th>Email Kontak</th>
                <th>Jumlah Outlet (Warung)</th>
                <th>Paket Lisensi</th>
                <th>Tanggal Bergabung</th>
                <th>Status Langganan</th>
                <th style={{ textAlign: 'center' }}>Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '3rem 0', color: '#64748B' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        border: '3px solid #F3F3F3',
                        borderTop: '3px solid #2563EB',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      <style>{`
                        @keyframes spin {
                          0% { transform: rotate(0deg); }
                          100% { transform: rotate(360deg); }
                        }
                      `}</style>
                      <span>Sedang memuat data tenant...</span>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '3rem 0', color: '#EF4444', fontWeight: 600 }}>
                    {error}
                  </td>
                </tr>
              ) : filteredTenants.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '3rem 0', color: '#94A3B8' }}>
                    Tidak ada tenant yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredTenants.map((tenant, idx) => (
                  <tr key={tenant.id} style={{ animationDelay: `${idx * 0.05}s` }} className="animate-fade-in">
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ background: '#EFF6FF', color: '#2563EB', borderRadius: '10px', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Building size={18} />
                        </div>
                        <span className="font-semibold" style={{ color: '#1E293B' }}>{tenant.name}</span>
                      </div>
                    </td>
                    <td style={{ fontWeight: 600, color: '#334155' }}>{tenant.owner}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B' }}>
                        <Mail size={14} /> {tenant.email}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#475569' }}>
                        <Store size={14} style={{ color: '#94A3B8' }} /> {tenant.warungCount} Cabang / Warung
                      </div>
                    </td>
                    <td>
                      <span style={{ 
                        background: tenant.plan === 'Enterprise' ? '#F59E0B' : tenant.plan === 'Premium' ? '#3B82F6' : '#64748B', 
                        color: '#FFFFFF', 
                        padding: '0.2rem 0.5rem', 
                        borderRadius: '6px', 
                        fontSize: '0.75rem', 
                        fontWeight: 700 
                      }}>
                        {tenant.plan}
                      </span>
                    </td>
                    <td style={{ color: '#64748B' }}>{tenant.joinedDate}</td>
                    <td>
                      <span style={{ 
                        background: tenant.status === 'Active' ? '#D1FAE5' : tenant.status === 'Suspended' ? '#FEF3C7' : '#FEE2E2', 
                        color: tenant.status === 'Active' ? '#065F46' : tenant.status === 'Suspended' ? '#B45309' : '#991B1B', 
                        padding: '0.2rem 0.5rem', 
                        borderRadius: '6px', 
                        fontSize: '0.75rem', 
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <CheckCircle2 size={12} /> {tenant.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons-cell" style={{ justifyContent: 'center' }}>
                        <button 
                          onClick={() => handleDeleteTenant(tenant.id)}
                          className="icon-action delete" 
                          aria-label="Tangguhkan Akses Bisnis"
                          title="Tangguhkan Bisnis"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Tenant */}
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
            <h2 style={{ margin: '0 0 0.25rem 0', fontWeight: 800, color: '#1E293B' }}>Daftarkan Bisnis Baru</h2>
            <p style={{ margin: '0 0 1.25rem 0', color: '#64748B', fontSize: '0.85rem' }}>Daftarkan perusahaan / tenant baru dan berikan hak Merchant Owner kepada owner bisnis.</p>
            
            <form onSubmit={handleAddTenant} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>Nama Perusahaan / Bisnis</label>
                <input 
                  type="text" 
                  placeholder="Contoh: CV Berkah Abadi"
                  value={newCompanyName}
                  onChange={(e) => setNewCompanyName(e.target.value)}
                  required
                  style={{ padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>Nama Pemilik (Merchant Owner)</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Aditya Pratama"
                  value={newOwner}
                  onChange={(e) => setNewOwner(e.target.value)}
                  required
                  style={{ padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>Email Kontak Utama</label>
                <input 
                  type="email" 
                  placeholder="Contoh: owner@berkah.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                  style={{ padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>Paket Langganan Awal</label>
                <select 
                  value={newPlan}
                  onChange={(e) => setNewPlan(e.target.value)}
                  style={{ padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', background: '#FFFFFF' }}
                >
                  <option value="Basic">Basic (Rp 150K/bln)</option>
                  <option value="Premium">Premium (Rp 250K/bln)</option>
                  <option value="Enterprise">Enterprise (Rp 2.4M/thn)</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  style={{ flex: 1, padding: '0.75rem', border: '1px solid #E2E8F0', background: '#FFFFFF', color: '#64748B', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  style={{ flex: 1, padding: '0.75rem', border: 'none', background: '#2563EB', color: '#FFFFFF', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  Daftarkan Tenant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tenants;
