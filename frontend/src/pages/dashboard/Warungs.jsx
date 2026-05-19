import React, { useState, useEffect } from 'react';
import { Store, Plus, MapPin, Phone, DollarSign, Users, Trash2, Search, CheckCircle } from 'lucide-react';
import API from '../../api/axios';

const Warungs = () => {
  const [warungs, setWarungs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  // Form states
  const [newWarungName, setNewWarungName] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newAdmin, setNewAdmin] = useState('');

  useEffect(() => {
    fetchWarungs();
  }, []);

  const fetchWarungs = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await API.get('/warungs');
      setWarungs(response.data);
    } catch (err) {
      console.error(err);
      setError('Gagal mengambil data warung dari backend.');
    } finally {
      setLoading(false);
    }
  };

  const filteredWarungs = warungs.filter(w =>
    (w.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (w.address || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddWarung = async (e) => {
    e.preventDefault();
    if (!newWarungName || !newAddress) return;

    try {
      const response = await API.post('/warungs', {
        name: newWarungName,
        address: newAddress,
        phone: newPhone,
        admins: newAdmin
      });

      setWarungs([response.data, ...warungs]);
      
      // Reset Form
      setNewWarungName('');
      setNewAddress('');
      setNewPhone('');
      setNewAdmin('');
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Gagal mendaftarkan warung baru.');
    }
  };

  const handleDeleteWarung = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus warung ini dari jaringan POSmart?')) {
      try {
        await API.delete(`/warungs/${id}`);
        setWarungs(warungs.filter(w => w.id !== id));
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.error || 'Gagal menghapus warung.');
      }
    }
  };

  return (
    <div className="animate-fade-in product-page-ui" style={{ padding: '0 0.5rem' }}>
      <div className="page-header-modern" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1>Jaringan Warung / Outlet</h1>
          <p>Merchant Owner Panel • Kelola dan monitoring seluruh cabang warung dalam jaringan bisnis Anda.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={20} /> Tambah Warung
        </button>
      </div>

      <div className="card product-card-table">
        <div className="table-toolbar">
          <div className="table-search-box">
            <Search size={18} className="search-icon-inline" />
            <input 
              type="text" 
              placeholder="Cari warung berdasarkan nama atau lokasi..." 
              className="table-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Warung Grid Card */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: '#64748B', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
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
            <span>Sedang memuat data warung...</span>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: '#EF4444', fontWeight: 600, width: '100%' }}>
            {error}
          </div>
        ) : filteredWarungs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: '#94A3B8', width: '100%' }}>
            Belum ada warung yang terdaftar di jaringan bisnis Anda.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem', padding: '1.5rem', width: '100%', boxSizing: 'border-box' }}>
            {filteredWarungs.map(w => (
              <div key={w.id} className="animate-fade-in" style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                padding: '1.25rem',
                boxShadow: '0 4px 15px rgba(15, 23, 42, 0.02)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ background: '#EFF6FF', color: '#2563EB', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Store size={20} />
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontWeight: 700, fontSize: '1.05rem', color: '#1E293B' }}>{w.name}</h3>
                      <span style={{ fontSize: '0.75rem', background: '#D1FAE5', color: '#065F46', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 700 }}>{w.status}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleDeleteWarung(w.id)}
                    style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', transition: 'color 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#EF4444'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#94A3B8'}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: '#64748B', marginBottom: '1rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={14} style={{ color: '#94A3B8' }} /> {w.address}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={14} style={{ color: '#94A3B8' }} /> {w.phone}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={14} style={{ color: '#94A3B8' }} /> Penanggung Jawab: <strong style={{ color: '#334155' }}>{w.admins}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#94A3B8', display: 'block' }}>Omzet Jaringan</span>
                    <strong style={{ fontSize: '1.15rem', color: '#2563EB', fontWeight: 800 }}>{w.revenue}</strong>
                  </div>
                  
                  <div style={{ background: '#F8FAFC', padding: '0.4rem 0.75rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>
                    <Users size={14} style={{ color: '#64748B' }} /> {w.staff_count || w.staffCount || 0} Staff
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Add Warung */}
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
            <h2 style={{ margin: '0 0 0.25rem 0', fontWeight: 800, color: '#1E293B' }}>Daftarkan Warung Baru</h2>
            <p style={{ margin: '0 0 1.25rem 0', color: '#64748B', fontSize: '0.85rem' }}>Hubungkan outlet fisik Anda ke sistem manajemen pusat POSmart.</p>
            
            <form onSubmit={handleAddWarung} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>Nama Warung / Outlet</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Warung Berkah Cikutra"
                  value={newWarungName}
                  onChange={(e) => setNewWarungName(e.target.value)}
                  required
                  style={{ padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>Alamat Lengkap</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Jl. Merdeka No. 12, Bandung"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  required
                  style={{ padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>Nomor Telepon Outlet</label>
                <input 
                  type="text" 
                  placeholder="Contoh: 0812-XXXX-XXXX"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  style={{ padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>Penanggung Jawab (Store Admin)</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Budi Santoso"
                  value={newAdmin}
                  onChange={(e) => setNewAdmin(e.target.value)}
                  style={{ padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
                />
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
                  Daftarkan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Warungs;
