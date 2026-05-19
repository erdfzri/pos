import React from 'react';
import './DashboardCard.css';

const DashboardCard = ({ title, value, icon, change, isPositive, comparisonText, isPrimary }) => {
  return (
    <div className={`dashboard-card card ${isPrimary ? 'card-primary' : ''}`}>
      <div className="dash-card-header">
        <div className="dash-card-icon-modern">
          {icon}
        </div>
        {change && (
          <div className={`dash-change-badge ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? '+' : ''}{change}%
          </div>
        )}
      </div>
      <div className="dash-card-body">
        <h3 className="dash-card-title">{title}</h3>
        <div className="dash-card-value">{value}</div>
        {comparisonText && (
          <div className="dash-card-comparison">
            <span className="dot"></span>
            {comparisonText}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
