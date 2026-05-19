import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  List, 
  Users, 
  Receipt, 
  PieChart, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight, 
  X,
  Store,
  CreditCard,
  Building
} from 'lucide-react';
import logoIcon from '../assets/logo_icon.png';
import './Sidebar.css';

const Sidebar = ({ isCollapsed, toggleCollapse, isMobileOpen, toggleMobile }) => {
  const navigate = useNavigate();
  
  // Get user data from localStorage
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : { username: 'Ferra Alexandra', role: 'Staff / Kasir', warung_name: 'Warung POSmart' };

  // Generate dynamic navigation menu sections based on user role
  const sections = [];
  
  if (user.role === 'Super Admin') {
    sections.push(
      {
        title: 'SaaS SYSTEM MENU',
        items: [
          { name: 'SaaS Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
        ]
      },
      {
        title: 'SaaS PLATFORM CONTROL',
        items: [
          { name: 'Manage Tenants', icon: <Building size={20} />, path: '/dashboard/tenants' },
          { name: 'SaaS Subscriptions', icon: <CreditCard size={20} />, path: '/dashboard/subscriptions' },
        ]
      },
      {
        title: 'GLOBAL MONITORING',
        items: [
          { name: 'Global Transactions', icon: <Receipt size={20} />, path: '/dashboard/transactions' },
        ]
      }
    );
  } else if (user.role === 'Merchant Owner') {
    sections.push(
      {
        title: 'MAIN MENU',
        items: [
          { name: 'Dashboard Jaringan', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
        ]
      },
      {
        title: 'OUTLET MANAGEMENT',
        items: [
          { name: 'Manage Warung', icon: <Store size={20} />, path: '/dashboard/warungs' },
          { name: 'Manage Store Admins', icon: <Users size={20} />, path: '/dashboard/admins' },
        ]
      },
      {
        title: 'MONITORING & REPORTS',
        items: [
          { name: 'Transactions Monitor', icon: <Receipt size={20} />, path: '/dashboard/transactions' },
          { name: 'Consolidated Reports', icon: <PieChart size={20} />, path: '/dashboard/reports' },
        ]
      }
    );
  } else if (user.role === 'Admin Warung') {
    sections.push(
      {
        title: 'MAIN MENU',
        items: [
          { name: 'Dashboard Toko', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
          { name: 'POS / Kasir', icon: <ShoppingCart size={20} />, path: '/dashboard/pos', badge: 'Live', badgeType: 'live' },
        ]
      },
      {
        title: 'MANAGEMENT',
        items: [
          { name: 'Products & Stock', icon: <Package size={20} />, path: '/dashboard/products' },
          { name: 'Categories', icon: <List size={20} />, path: '/dashboard/categories' },
          { name: 'Manage Staff', icon: <Users size={20} />, path: '/dashboard/staff' },
        ]
      },
      {
        title: 'REPORT',
        items: [
          { name: 'Transactions', icon: <Receipt size={20} />, path: '/dashboard/transactions' },
          { name: 'Reports', icon: <PieChart size={20} />, path: '/dashboard/reports' },
        ]
      },
      {
        title: 'SETTINGS',
        items: [
          { name: 'Store Settings', icon: <Settings size={20} />, path: '/dashboard/settings' },
        ]
      }
    );
  } else { // Staff / Kasir
    sections.push(
      {
        title: 'TRANSACTIONS',
        items: [
          { name: 'POS / Kasir', icon: <ShoppingCart size={20} />, path: '/dashboard/pos', badge: 'Live', badgeType: 'live' },
          { name: 'My Transactions', icon: <Receipt size={20} />, path: '/dashboard/transactions' },
        ]
      },
      {
        title: 'INVENTORY (READ-ONLY)',
        items: [
          { name: 'View Products & Stock', icon: <Package size={20} />, path: '/dashboard/products' },
        ]
      }
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="logo-container" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <img src={logoIcon} alt="CassaSmart Logo" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
          {!isCollapsed && (
            <span className="logo-text" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.5px' }}>
              Cassa<span style={{ color: '#2563EB' }}>Smart</span>
            </span>
          )}
        </div>
        
        {/* Mobile close button */}
        <button className="mobile-close-btn" onClick={toggleMobile}>
          <X size={20} />
        </button>

        {/* Desktop collapse button */}
        <button className="collapse-toggle-btn" onClick={toggleCollapse}>
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Sidebar Menu */}
      <div className="sidebar-menu">
        {sections.map((section, idx) => (
          <div key={idx} className="menu-section">
            {!isCollapsed && <p className="menu-section-title">{section.title}</p>}
            <nav className="menu-nav">
              {section.items.map((item, itemIdx) => (
                <NavLink
                  key={itemIdx}
                  to={item.path}
                  end={item.path === '/dashboard'}
                  className={({ isActive }) => `menu-item-modern ${isActive ? 'active' : ''}`}
                  onClick={isMobileOpen ? toggleMobile : undefined}
                  title={isCollapsed ? item.name : ''}
                >
                  <div className="menu-icon-inner">
                    {item.icon}
                  </div>
                  {!isCollapsed && <span className="menu-text">{item.name}</span>}
                  
                  {/* Badge Notification */}
                  {item.badge && (
                    isCollapsed ? (
                      <span className={`badge-dot ${item.badgeType}`}></span>
                    ) : (
                      <span className={`menu-badge ${item.badgeType}`}>{item.badge}</span>
                    )
                  )}
                  
                  {/* Active Indicator Line */}
                  <div className="active-indicator"></div>
                </NavLink>
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* Sidebar Footer - Modern Profile Section */}
      <div className="sidebar-profile-footer">
        <div className="profile-container-inner">
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&auto=format&fit=crop" 
            alt={user.username || user.name} 
            className="profile-avatar"
          />
          {!isCollapsed && (
            <div className="profile-details-wrapper">
              <span className="profile-user-name">{user.username || user.name}</span>
              <span className="profile-user-role">{user.role}</span>
              {user.warung_name && (
                <span className="profile-user-warung" style={{ fontSize: '0.68rem', color: '#2563EB', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.warung_name}</span>
              )}
            </div>
          )}
          {!isCollapsed && (
            <button className="profile-logout-btn" onClick={handleLogout} title="Sign Out">
              <LogOut size={18} />
            </button>
          )}
        </div>
        {isCollapsed && (
          <button className="profile-logout-btn collapsed-logout" onClick={handleLogout} title="Sign Out">
            <LogOut size={18} />
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
