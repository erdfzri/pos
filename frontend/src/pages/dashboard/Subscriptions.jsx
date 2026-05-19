import React, { useState } from 'react';
import { CreditCard, Search, CheckCircle2, AlertTriangle, XCircle, ShieldAlert, DollarSign, Users, Award, Calendar, RefreshCw } from 'lucide-react';

const initialSubscribers = [
  { id: 1, warungName: 'Warung Berkah', owner: 'Aditya Pratama', plan: 'Premium', status: 'Active', price: 'Rp 250.000/bln', startDate: '18 Mei 2026', endDate: '18 Jun 2026', cycle: 'Bulanan' },
  { id: 2, warungName: 'Warung Makmur', owner: 'Budi Santoso', plan: 'Basic', status: 'Active', price: 'Rp 150.000/bln', startDate: '10 Mei 2026', endDate: '10 Jun 2026', cycle: 'Bulanan' },
  { id: 3, warungName: 'Cafe Kopi', owner: 'Citra Amelia', plan: 'Enterprise', status: 'Active', price: 'Rp 2.400.000/thn', startDate: '01 Jan 2026', endDate: '01 Des 2026', cycle: 'Tahunan' },
  { id: 4, warungName: 'Ritel Utama', owner: 'Dedi Wijaya', plan: 'Premium', status: 'Expired', price: 'Rp 250.000/bln', startDate: '12 Apr 2026', endDate: '12 Mei 2026', cycle: 'Bulanan' },
  { id: 5, warungName: 'Toko Kue', owner: 'Eka Lestari', plan: 'Basic', status: 'Suspended', price: 'Rp 150.000/bln', startDate: '05 Apr 2026', endDate: '05 Mei 2026', cycle: 'Bulanan' },
  { id: 6, warungName: 'Susu Murni Lembang', owner: 'Ferry Kurnia', plan: 'Trial', status: 'Trial', price: 'Rp 0 (Uji Coba)', startDate: '15 Mei 2026', endDate: '29 Mei 2026', cycle: '14 Hari' },
];

const Subscriptions = () => {
  const [subscribers, setSubscribers] = useState(initialSubscribers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSub, setSelectedSub] = useState(null);
  const [showManageModal, setShowManageModal] = useState(false);

  // Modal edit states
  const [editPlan, setEditPlan] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [editEndDate, setEditEndDate] = useState('');

  const filteredSubs = subscribers.filter(s =>
    s.warungName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.plan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active':
        return { bg: '#D1FAE5', color: '#065F46', icon: <CheckCircle2 size={13} /> };
      case 'Trial':
        return { bg: '#EFF6FF', color: '#1E40AF', icon: <Calendar size={13} /> };
      case 'Suspended':
        return { bg: '#FEF3C7', color: '#B45309', icon: <ShieldAlert size={13} /> };
      case 'Expired':
      default:
        return { bg: '#FEE2E2', color: '#991B1B', icon: <XCircle size={13} /> };
    }
  };

  const handleOpenManage = (sub) => {
    setSelectedSub(sub);
    setEditPlan(sub.plan);
    setEditStatus(sub.status);
    // Parse current date to input-friendly format if needed
    setEditEndDate(sub.endDate);
    setShowManageModal(true);
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    if (!selectedSub) return;

    // Map plan to price and cycle automatically for demo
    let price = 'Rp 150.000/bln';
    let cycle = 'Bulanan';
    if (editPlan === 'Premium') price = 'Rp 250.000/bln';
    if (editPlan === 'Enterprise') {
      price = 'Rp 2.400.000/thn';
      cycle = 'Tahunan';
    }
    if (editPlan === 'Trial') {
      price = 'Rp 0 (Uji Coba)';
      cycle = '14 Hari';
    }

    setSubscribers(subscribers.map(s => {
      if (s.id === selectedSub.id) {
        return {
          ...s,
          plan: editPlan,
          status: editStatus,
          endDate: editEndDate,
          price,
          cycle
        };
      }
      return s;
    }));

    setShowManageModal(false);
    setSelectedSub(null);
  };

  const handleExtendOneMonth = (id) => {
    setSubscribers(subscribers.map(s => {
      if (s.id === id) {
        // Simple extension simulation: sets end date to 18 July 2026
        return {
          ...s,
          status: 'Active',
          endDate: '18 Jul 2026'
        };
      }
      return s;
    }));
    alert('Masa aktif berlangganan berhasil diperpanjang 1 bulan!');
  };

  // Metrics calculations
  const activeCount = subscribers.filter(s => s.status === 'Active' || s.status === 'Trial').length;
  const expiredCount = subscribers.filter(s => s.status === 'Expired').length;
  const mrr = subscribers
    .filter(s => s.status === 'Active')
    .reduce((acc, curr) => {
      if (curr.plan === 'Basic') return acc + 150000;
      if (curr.plan === 'Premium') return acc + 250000;
      if (curr.plan === 'Enterprise') return acc + 200000; // 2.4M divided by 12 months = 200k
      return acc;
    }, 0);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="animate-fade-in product-page-ui" style={{ padding: '0 0.5rem' }}>
      <div className="page-header-modern" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1>Manajemen Langganan SaaS</h1>
          <p>SaaS Owner Panel • Monitor penagihan, masa aktif lisensi, dan status paket SaaS pelanggan.</p>
        </div>
      </div>

      {/* Subscription KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', color: '#FFFFFF', padding: '1.25rem', borderRadius: '16px', boxShadow: '0 10px 25px rgba(37, 99, 235, 0.15)' }}>
          <span style={{ fontSize: '0.78rem', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Monthly Recurring Revenue (MRR)</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0.25rem 0 0.5rem 0', color: '#FFFFFF' }}>{formatCurrency(mrr)}</h2>
          <div style={{ fontSize: '0.78rem', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <DollarSign size={14} /> Total pendapatan lisensi per bulan
          </div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '1.25rem', borderRadius: '16px' }}>
          <span style={{ fontSize: '0.78rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pelanggan Aktif</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0.25rem 0 0.5rem 0', color: '#1E293B' }}>{activeCount} Toko</h2>
          <div style={{ fontSize: '0.78rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
            <CheckCircle2 size={14} /> Berstatus aktif & masa uji coba
          </div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '1.25rem', borderRadius: '16px' }}>
          <span style={{ fontSize: '0.78rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tunggakan / Expired</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0.25rem 0 0.5rem 0', color: '#EF4444' }}>{expiredCount} Toko</h2>
          <div style={{ fontSize: '0.78rem', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
            <AlertTriangle size={14} /> Membutuhkan tindak lanjut manual
          </div>
        </div>
      </div>

      <div className="card product-card-table">
        <div className="table-toolbar">
          <div className="table-search-box">
            <Search size={18} className="search-icon-inline" />
            <input 
              type="text" 
              placeholder="Cari berdasarkan nama warung, owner, atau paket..." 
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
                <th>Warung / Toko</th>
                <th>Pemilik (Owner)</th>
                <th>Paket Layanan</th>
                <th>Siklus Tagihan</th>
                <th>Biaya Berlangganan</th>
                <th>Masa Aktif Berakhir</th>
                <th>Status Lisensi</th>
                <th style={{ textAlign: 'center' }}>Kelola Langganan</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubs.map((sub, idx) => {
                const subStyle = getStatusStyle(sub.status);
                return (
                  <tr key={sub.id} style={{ animationDelay: `${idx * 0.05}s` }} className="animate-fade-in">
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ background: '#EFF6FF', color: '#2563EB', borderRadius: '10px', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <CreditCard size={18} />
                        </div>
                        <span className="font-semibold" style={{ color: '#1E293B' }}>{sub.warungName}</span>
                      </div>
                    </td>
                    <td style={{ color: '#475569', fontWeight: 600 }}>{sub.owner}</td>
                    <td>
                      <span style={{ 
                        background: sub.plan === 'Enterprise' ? '#F59E0B' : sub.plan === 'Premium' ? '#3B82F6' : '#64748B', 
                        color: '#FFFFFF', 
                        padding: '0.2rem 0.5rem', 
                        borderRadius: '6px', 
                        fontSize: '0.75rem', 
                        fontWeight: 700 
                      }}>
                        {sub.plan}
                      </span>
                    </td>
                    <td style={{ color: '#64748B' }}>{sub.cycle}</td>
                    <td style={{ fontWeight: 700, color: '#1E293B' }}>{sub.price}</td>
                    <td style={{ color: '#475569', fontWeight: 600 }}>{sub.endDate}</td>
                    <td>
                      <span style={{ 
                        background: subStyle.bg, 
                        color: subStyle.color, 
                        padding: '0.2rem 0.5rem', 
                        borderRadius: '6px', 
                        fontSize: '0.75rem', 
                        fontWeight: 700, 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '4px' 
                      }}>
                        {subStyle.icon} {sub.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                        <button 
                          onClick={() => handleOpenManage(sub)}
                          style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', padding: '0.35rem 0.75rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', transition: 'all 0.2s' }}
                          onMouseOver={(e) => { e.currentTarget.style.background = '#E2E8F0' }}
                          onMouseOut={(e) => { e.currentTarget.style.background = '#F1F5F9' }}
                        >
                          Atur
                        </button>
                        {sub.status === 'Expired' && (
                          <button 
                            onClick={() => handleExtendOneMonth(sub.id)}
                            style={{ background: '#2563EB', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, color: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', transition: 'all 0.2s' }}
                            onMouseOver={(e) => { e.currentTarget.style.background = '#1D4ED8' }}
                            onMouseOut={(e) => { e.currentTarget.style.background = '#2563EB' }}
                          >
                            <RefreshCw size={12} /> Perpanjang 1 Bln
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subscription Settings Adjustment Modal */}
      {showManageModal && selectedSub && (
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
            maxWidth: '440px',
            padding: '1.75rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ margin: '0 0 0.25rem 0', fontWeight: 800, color: '#1E293B' }}>Sesuaikan Berlangganan</h2>
            <p style={{ margin: '0 0 1.25rem 0', color: '#64748B', fontSize: '0.85rem' }}>Mengubah paket & hak operasional warung <strong>{selectedSub.warungName}</strong>.</p>
            
            <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>Paket Langganan</label>
                <select 
                  value={editPlan}
                  onChange={(e) => setEditPlan(e.target.value)}
                  style={{ padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', background: '#FFFFFF' }}
                >
                  <option value="Trial">Trial (Uji Coba 14 Hari)</option>
                  <option value="Basic">Basic (Rp 150K / Bln)</option>
                  <option value="Premium">Premium (Rp 250K / Bln)</option>
                  <option value="Enterprise">Enterprise (Rp 2.4M / Thn)</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>Status Berlangganan</label>
                <select 
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  style={{ padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', background: '#FFFFFF' }}
                >
                  <option value="Active">Active (Akses Terbuka)</option>
                  <option value="Trial">Trial (Masa Uji Coba)</option>
                  <option value="Expired">Expired (Masa Aktif Habis)</option>
                  <option value="Suspended">Suspended (Akses Diblokir Owner)</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>Tanggal Masa Aktif Selesai</label>
                <input 
                  type="text" 
                  value={editEndDate}
                  onChange={(e) => setEditEndDate(e.target.value)}
                  required
                  placeholder="Contoh: 18 Jun 2026"
                  style={{ padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
                <button 
                  type="button" 
                  onClick={() => { setShowManageModal(false); setSelectedSub(null); }}
                  style={{ flex: 1, padding: '0.75rem', border: '1px solid #E2E8F0', background: '#FFFFFF', color: '#64748B', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  style={{ flex: 1, padding: '0.75rem', border: 'none', background: '#2563EB', color: '#FFFFFF', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
