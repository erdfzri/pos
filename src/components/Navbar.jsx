import React from 'react';
import { Search, Bell } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-left">
        {/* Dynamic header title could be injected here or handled per page */}
      </div>

      <div className="navbar-right">
        <div className="navbar-actions">
          <button className="icon-btn-round" aria-label="Search">
            <Search size={20} />
          </button>
          
          <button className="icon-btn-round notification-btn">
            <Bell size={20} />
            <span className="notification-dot"></span>
          </button>

          <div className="profile-section">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&auto=format&fit=crop" 
              alt="Ferra Alexandra" 
              className="profile-img"
            />
            <div className="profile-info">
              <span className="profile-name">Ferra Alexandra</span>
              <span className="profile-role">Admin store</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
