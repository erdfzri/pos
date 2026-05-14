import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Package, List, Users, Receipt, PieChart, Settings, LogOut, Hexagon } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'POS / Kasir', icon: <ShoppingCart size={20} />, path: '/dashboard/pos' },
    { name: 'Products', icon: <Package size={20} />, path: '/dashboard/products' },
    { name: 'Categories', icon: <List size={20} />, path: '/dashboard/categories' },
    { name: 'Transactions', icon: <Receipt size={20} />, path: '/dashboard/transactions' },
    { name: 'Customers', icon: <Users size={20} />, path: '/dashboard/customers' },
    { name: 'Reports', icon: <PieChart size={20} />, path: '/dashboard/reports' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/dashboard/settings' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <Hexagon size={28} color="var(--accent-color)" strokeWidth={2.5} />
          <h2>DealDeck</h2>
        </div>
      </div>

      <div className="sidebar-menu">
        <p className="menu-label">MENU</p>
        <nav>
          {menuItems.slice(0, 4).map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
            >
              <div className="menu-icon-wrapper">
                {item.icon}
              </div>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <p className="menu-label mt-6">FINANCIAL</p>
        <nav>
          {menuItems.slice(4, 6).map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
            >
              <div className="menu-icon-wrapper">
                {item.icon}
              </div>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <p className="menu-label mt-6">TOOLS</p>
        <nav>
          {menuItems.slice(6, 8).map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
            >
              <div className="menu-icon-wrapper">
                {item.icon}
              </div>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="upgrade-card">
          <div className="upgrade-icon">
            <Hexagon size={24} color="white" />
          </div>
          <h4>Upgrade Pro</h4>
          <p>Discover the benefits of an upgraded account</p>
          <button className="btn btn-upgrade">Upgrade $30</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
