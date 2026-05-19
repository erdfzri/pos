import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoIcon from '../../assets/logo_icon.png';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll(".feat-card, .testi-card, .price-card, .stat-item");
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-container">
      {/* NAVBAR */}
      <nav className="landing-nav">
        <div className="nav-inner">
          <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.4rem' }}>
            <img src={logoIcon} alt="CassaSmart" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
            Cassa<span style={{ color: '#2563EB' }}>Smart</span>
          </div>
          <ul className="nav-links">
            <li><a href="#fitur">Fitur</a></li>
            <li><a href="#preview">Preview</a></li>
            <li><a href="#testimoni">Testimoni</a></li>
            <li><a href="#harga">Harga</a></li>
          </ul>
          <div className="nav-cta">
            <button onClick={() => navigate('/login')} className="btn-outline-nav">Login</button>
            <button onClick={() => navigate('/register')} className="btn-primary-nav">Mulai Gratis</button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="hero-inner">
          <div className="hero-text">
            <div className="badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
              Baru: Fitur Multi Kasir Tersedia
            </div>
            <h1>Kelola Bisnis dan<br /><span>Transaksi Lebih Mudah</span></h1>
            <p>Solusi POS modern untuk toko, cafe, restoran, dan usaha retail Anda. Catat transaksi, kelola stok, dan pantau laporan secara real-time.</p>
            <div className="hero-btns">
              <button onClick={() => navigate('/register')} className="btn-hero btn-hero-primary">Mulai Gratis Sekarang</button>
              <a href="#fitur" className="btn-hero btn-hero-secondary">Lihat Fitur</a>
            </div>
          </div>

          <div className="dashboard-mock">
            <div className="dash-header">
              <div className="dash-dot"></div>
              <div className="dash-dot"></div>
              <div className="dash-dot"></div>
              <span className="dash-title">CassaSmart Dashboard</span>
            </div>
            <div className="dash-body">
              <div className="stat-card">
                <div className="stat-num">Rp 4.2M</div>
                <div className="stat-label">Pendapatan Hari Ini</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">128</div>
                <div className="stat-label">Total Transaksi</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">94</div>
                <div className="stat-label">Produk Aktif</div>
              </div>
            </div>
            <div className="chart-area">
              <div className="chart-label">Penjualan Minggu Ini</div>
              <div className="bars">
                <div className="bar" style={{ height: '45%' }}></div>
                <div className="bar" style={{ height: '60%' }}></div>
                <div className="bar" style={{ height: '40%' }}></div>
                <div className="bar" style={{ height: '75%' }}></div>
                <div className="bar" style={{ height: '55%' }}></div>
                <div className="bar active" style={{ height: '90%' }}></div>
                <div className="bar" style={{ height: '65%' }}></div>
              </div>
            </div>
            <div className="tx-list">
              <div className="tx-item">
                <span className="tx-name">Kopi Arabica Latte</span>
                <span className="tx-amt">+Rp 35.000</span>
              </div>
              <div className="tx-item">
                <span className="tx-name">Nasi Goreng Spesial</span>
                <span className="tx-amt">+Rp 28.000</span>
              </div>
              <div className="tx-item">
                <span className="tx-name">Teh Tarik</span>
                <span className="tx-amt">+Rp 18.000</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="stats">
        <div className="stats-inner">
          <div className="stat-item">
            <div className="num">10.000+</div>
            <div className="desc">Transaksi Diproses</div>
          </div>
          <div className="stat-item">
            <div className="num">500+</div>
            <div className="desc">Toko Menggunakan</div>
          </div>
          <div className="stat-item">
            <div className="num">99.9%</div>
            <div className="desc">Uptime Server</div>
          </div>
          <div className="stat-item">
            <div className="num">24/7</div>
            <div className="desc">Dukungan Pelanggan</div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section" id="fitur">
        <div className="section-label">FITUR UNGGULAN</div>
        <div className="section-title">Semua yang Anda Butuhkan</div>
        <div className="section-sub">Dari transaksi harian hingga laporan analitik, CassaSmart hadir sebagai solusi lengkap untuk bisnis Anda berkembang.</div>
        <div className="feature-grid">
          <div className="feat-card">
            <div className="feat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
            </div>
            <h3>Manajemen Produk</h3>
            <p>Kelola katalog produk dengan mudah. Tambah, edit, dan kategorikan produk dalam hitungan detik.</p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polyline></svg>
            </div>
            <h3>Transaksi Cepat</h3>
            <p>Proses pembayaran tunai, QRIS, dan transfer bank dengan antarmuka yang intuitif dan responsif.</p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            </div>
            <h3>Laporan Penjualan</h3>
            <p>Analisis penjualan harian, mingguan, dan bulanan dengan grafik yang mudah dipahami.</p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14M5 8a2 2 0 1 0 0-4h14a2 2 0 1 0 0 4M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8m-9 4h4"></path></svg>
            </div>
            <h3>Manajemen Stok</h3>
            <p>Pantau stok secara real-time. Dapatkan notifikasi otomatis saat stok hampir habis.</p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <h3>Multi Kasir</h3>
            <p>Hubungkan beberapa kasir sekaligus. Ideal untuk restoran dan toko dengan banyak counter.</p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            </div>
            <h3>Dashboard Analitik</h3>
            <p>Lihat ringkasan bisnis dalam satu layar. Grafik interaktif untuk keputusan bisnis yang lebih cerdas.</p>
          </div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section className="preview" id="preview">
        <div className="preview-inner">
          <div>
            <div className="section-label">DASHBOARD PREVIEW</div>
            <h2>Antarmuka Modern yang Intuitif</h2>
            <p>Dirancang agar mudah digunakan siapa saja, tanpa perlu pelatihan panjang. Semua informasi penting tersaji dalam satu tampilan.</p>
            <ul className="preview-list">
              <li>
                <div className="check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                Tampilan real-time tanpa perlu refresh
              </li>
              <li>
                <div className="check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                Akses dari perangkat apa pun
              </li>
              <li>
                <div className="check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                Backup data otomatis setiap hari
              </li>
              <li>
                <div className="check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                Laporan dapat diunduh format PDF &amp; Excel
              </li>
            </ul>
          </div>

          <div className="big-dash">
            <div className="big-dash-top">
              <div className="top-stat">
                <div className="n">Rp 12.4M</div>
                <div className="l">Revenue Bulan Ini</div>
              </div>
              <div className="top-stat">
                <div className="n">342</div>
                <div className="l">Total Order</div>
              </div>
              <div className="top-stat">
                <div className="n">87</div>
                <div className="l">Pelanggan Baru</div>
              </div>
            </div>
            <div className="big-dash-body">
              <div className="sidebar">
                <div className="sidebar-item active">Dashboard</div>
                <div className="sidebar-item">Produk</div>
                <div className="sidebar-item">Transaksi</div>
                <div className="sidebar-item">Laporan</div>
                <div className="sidebar-item">Stok</div>
                <div className="sidebar-item">Pengaturan</div>
              </div>
              <div className="main-dash">
                <div className="prod-grid">
                  <div className="prod-card">
                    <div className="prod-name">Kopi Latte</div>
                    <div className="prod-price">Rp 35.000</div>
                    <div className="prod-stock">Stok: 42</div>
                  </div>
                  <div className="prod-card">
                    <div className="prod-name">Nasi Goreng</div>
                    <div className="prod-price">Rp 28.000</div>
                    <div className="prod-stock">Stok: 18</div>
                  </div>
                  <div className="prod-card">
                    <div className="prod-name">Teh Tarik</div>
                    <div className="prod-price">Rp 18.000</div>
                    <div className="prod-stock">Stok: 35</div>
                  </div>
                  <div className="prod-card">
                    <div className="prod-name">Roti Bakar</div>
                    <div className="prod-price">Rp 22.000</div>
                    <div className="prod-stock">Stok: 27</div>
                  </div>
                </div>
                <div className="mini-chart">
                  <div className="mini-bar" style={{ height: '40%' }}></div>
                  <div className="mini-bar" style={{ height: '65%' }}></div>
                  <div className="mini-bar" style={{ height: '50%' }}></div>
                  <div className="mini-bar hi" style={{ height: '90%' }}></div>
                  <div className="mini-bar" style={{ height: '70%' }}></div>
                  <div className="mini-bar" style={{ height: '55%' }}></div>
                  <div className="mini-bar hi" style={{ height: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="testimonials" id="testimoni">
        <div className="section-label">TESTIMONI</div>
        <div className="section-title">Dipercaya Ribuan Pebisnis</div>
        <div className="section-sub">Bergabung dengan ratusan pemilik usaha yang telah merasakan manfaat CassaSmart untuk bisnis mereka.</div>
        <div className="testi-grid">
          <div className="testi-card">
            <div className="stars">★★★★★</div>
            <div className="quote">"CassaSmart benar-benar mengubah cara saya mengelola kafe. Laporan penjualan jadi sangat mudah dipantau setiap hari."</div>
            <div className="reviewer">
              <div className="avatar">RD</div>
              <div className="reviewer-info">
                <div className="name">Randi Darmawan</div>
                <div className="role">Pemilik, Kafe Aruna</div>
              </div>
            </div>
          </div>
          <div className="testi-card">
            <div className="stars">★★★★★</div>
            <div className="quote">"Fitur multi kasir sangat membantu saat jam sibuk. Transaksi jadi lebih cepat dan tidak ada antrean panjang."</div>
            <div className="reviewer">
              <div className="avatar">SI</div>
              <div className="reviewer-info">
                <div className="name">Siti Indriani</div>
                <div className="role">Manajer, Resto Nusantara</div>
              </div>
            </div>
          </div>
          <div className="testi-card">
            <div className="stars">★★★★★</div>
            <div className="quote">"Stok saya tidak pernah kehabisan tiba-tiba lagi. Notifikasi otomatis dari CassaSmart benar-benar menyelamatkan toko saya."</div>
            <div className="reviewer">
              <div className="avatar">BH</div>
              <div className="reviewer-info">
                <div className="name">Budi Hartono</div>
                <div className="role">Pemilik, Toko Sembako Makmur</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="pricing" id="harga">
        <div className="section-label">HARGA</div>
        <div className="section-title">Paket yang Sesuai Kebutuhan</div>
        <div className="section-sub">Mulai gratis, upgrade kapan saja. Tidak ada biaya tersembunyi.</div>
        <div className="pricing-grid">
          <div className="price-card">
            <div className="plan-name">STARTER</div>
            <div className="plan-price">Gratis<span>/selamanya</span></div>
            <div className="plan-desc">Cocok untuk usaha baru yang baru memulai perjalanan.</div>
            <ul className="plan-features">
              <li>1 Kasir</li>
              <li>100 Produk</li>
              <li>Laporan Harian</li>
              <li>Dukungan Email</li>
            </ul>
            <button onClick={() => navigate('/register')} className="btn-plan btn-plan-outline">Mulai Gratis</button>
          </div>
          <div className="price-card popular">
            <div className="popular-badge">⭐ Paling Populer</div>
            <div className="plan-name">PROFESSIONAL</div>
            <div className="plan-price">Rp 199k<span>/bulan</span></div>
            <div className="plan-desc">Untuk bisnis yang berkembang dan butuh fitur lengkap.</div>
            <ul className="plan-features">
              <li>5 Kasir</li>
              <li>Produk Tidak Terbatas</li>
              <li>Laporan Lengkap</li>
              <li>Manajemen Stok</li>
              <li>Prioritas Dukungan</li>
            </ul>
            <button onClick={() => navigate('/register')} className="btn-plan btn-plan-filled">Coba 14 Hari Gratis</button>
          </div>
          <div className="price-card">
            <div className="plan-name">ENTERPRISE</div>
            <div className="plan-price">Rp 499k<span>/bulan</span></div>
            <div className="plan-desc">Untuk bisnis skala besar dengan kebutuhan khusus.</div>
            <ul className="plan-features">
              <li>Kasir Tidak Terbatas</li>
              <li>Multi Cabang</li>
              <li>API Access</li>
              <li>Custom Laporan</li>
              <li>Dedicated Manager</li>
            </ul>
            <button onClick={() => navigate('/register')} className="btn-plan btn-plan-outline">Hubungi Kami</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo" style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.4rem' }}>
              <img src={logoIcon} alt="CassaSmart" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
              Cassa<span style={{ color: '#2563EB' }}>Smart</span>
            </div>
            <p>Solusi POS modern untuk UMKM Indonesia. Kelola bisnis dengan lebih cerdas dan efisien.</p>
          </div>
          <div className="footer-col">
            <h4>Produk</h4>
            <ul>
              <li><a href="#fitur">Fitur</a></li>
              <li><a href="#harga">Harga</a></li>
              <li><a href="#preview">Preview</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Perusahaan</h4>
            <ul>
              <li><a href="#">Tentang Kami</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Kontak</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Dokumentasi</a></li>
              <li><a href="#">Panduan</a></li>
              <li><a href="#">Kebijakan Privasi</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 CassaSmart. Semua hak dilindungi.</p>
          <div className="social">
            <a href="#">
              <svg viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#">
              <svg viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
