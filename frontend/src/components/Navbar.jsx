import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  Plus, 
  CircleDollarSign, 
  FileText, 
  Sun, 
  Moon, 
  Menu,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';
import './Navbar.css';

const Navbar = ({ toggleDarkMode, isDarkMode, toggleMobileSidebar }) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  // Close notifications on clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      title: 'Stok Kopi Arabica Latte menipis',
      desc: 'Sisa stok tinggal 5 pcs. Segera lakukan restock.',
      time: '5 menit yang lalu',
      type: 'warning',
      icon: <AlertTriangle size={16} className="notif-warning" />
    },
    {
      id: 2,
      title: 'Transaksi baru berhasil',
      desc: 'Pembayaran QRIS Kopi Arabica Latte sebesar Rp 35.000.',
      time: '12 menit yang lalu',
      type: 'success',
      icon: <CheckCircle2 size={16} className="notif-success" />
    },
    {
      id: 3,
      title: 'Laporan bulanan siap diunduh',
      desc: 'Laporan penjualan bulan April 2026 telah di-generate.',
      time: '1 jam yang lalu',
      type: 'info',
      icon: <Info size={16} className="notif-info" />
    }
  ];

  return (
    <header className="navbar-modern">
      {/* Left Area: Mobile Hamburger & Search Bar */}
      <div className="navbar-modern-left">
        <button className="mobile-hamburger-btn" onClick={toggleMobileSidebar} title="Open Menu">
          <Menu size={20} />
        </button>

        <div className="search-bar-modern">
          <Search size={18} className="search-icon-svg" />
          <input 
            type="text" 
            placeholder="Search transactions, products, reports..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Right Area: Quick Actions, Dark/Light Mode, Notifications */}
      <div className="navbar-modern-right">
        {/* Quick Action Buttons */}
        <div className="quick-actions-wrapper">
          <button 
            className="btn-quick btn-quick-primary" 
            onClick={() => navigate('/dashboard/pos')}
            title="Transaksi Baru"
          >
            <CircleDollarSign size={16} />
            <span>New Transaction</span>
          </button>
          
          <button 
            className="btn-quick btn-quick-secondary" 
            onClick={() => navigate('/dashboard/products')}
            title="Tambah Produk"
          >
            <Plus size={16} />
            <span>Add Product</span>
          </button>

          <button 
            className="btn-quick btn-quick-secondary hide-tablet" 
            onClick={() => navigate('/dashboard/reports')}
            title="Generate Laporan"
          >
            <FileText size={16} />
            <span>Generate Report</span>
          </button>
        </div>

        {/* Separator */}
        <div className="navbar-divider"></div>

        {/* Action Icons */}
        <div className="action-icons-group">
          {/* Theme Toggle */}
          <button className="icon-action-btn" onClick={toggleDarkMode} title={isDarkMode ? 'Light Mode' : 'Dark Mode'}>
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications Trigger */}
          <div className="notification-trigger-wrapper" ref={dropdownRef}>
            <button 
              className={`icon-action-btn ${showNotifications ? 'active' : ''}`} 
              onClick={() => setShowNotifications(!showNotifications)}
              title="Notifications"
            >
              <Bell size={20} />
              <span className="notification-indicator-pill">3</span>
            </button>

            {/* Notification Dropdown Card */}
            {showNotifications && (
              <div className="notification-dropdown-card">
                <div className="dropdown-header">
                  <h3>Notifikasi</h3>
                  <span className="mark-read-btn">Tandai dibaca</span>
                </div>
                <div className="dropdown-list">
                  {notifications.map((n) => (
                    <div key={n.id} className="dropdown-item">
                      <div className={`dropdown-item-icon ${n.type}`}>
                        {n.icon}
                      </div>
                      <div className="dropdown-item-content">
                        <h4>{n.title}</h4>
                        <p>{n.desc}</p>
                        <span className="notif-time">{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="dropdown-footer" onClick={() => setShowNotifications(false)}>
                  Tutup Notifikasi
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
