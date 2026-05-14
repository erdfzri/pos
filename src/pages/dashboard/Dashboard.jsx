import React from 'react';
import { ShoppingBag, Users, Calendar, BarChart3, ChevronDown, Monitor, Gamepad2, Sofa } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis
} from 'recharts';
import DashboardCard from '../../components/DashboardCard';
import './Dashboard.css';

const salesData = [
  { name: 'Jan', seen: 4000, sales: 2400 },
  { name: 'Feb', seen: 3000, sales: 1398 },
  { name: 'Mar', seen: 2000, sales: 9800 },
  { name: 'Apr', seen: 2780, sales: 3908 },
  { name: 'May', seen: 1890, sales: 4800 },
  { name: 'Jun', seen: 2390, sales: 3800 },
  { name: 'Jul', seen: 3490, sales: 4300 },
];

const productData = [
  { name: 'Electronic', value: 2487, color: '#4C5FFF' },
  { name: 'Games', value: 1828, color: '#ef4444' },
  { name: 'Furniture', value: 1463, color: '#cbd5e1' },
];

const growthData = [
  { name: 'United States', x: 10, y: 30, z: 2417 },
  { name: 'Germany', x: 30, y: 40, z: 2281 },
  { name: 'Australia', x: 20, y: 15, z: 812 },
  { name: 'France', x: 40, y: 25, z: 287 },
];

const Dashboard = () => {
  return (
    <div className="dashboard-layout animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1>Sales Report</h1>
          <p>Friday, December 15th 2023</p>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Left Column wrapper for stats & habits */}
        <div className="dashboard-col-left">
          
          <div className="stats-grid">
            <DashboardCard
              title="Total Sales"
              value="$612.917"
              icon={<Calendar size={20} />}
              change={2.08}
              isPositive={true}
              comparisonText="Products vs last month"
              isPrimary={true}
            />
            <DashboardCard
              title="Total Orders"
              value="34.760"
              icon={<ShoppingBag size={20} />}
              change={12.4}
              isPositive={true}
              comparisonText="Orders vs last month"
            />
            <DashboardCard
              title="Visitor"
              value="14.987"
              icon={<Users size={20} />}
              change={-2.08}
              isPositive={false}
              comparisonText="Users vs last month"
            />
            <DashboardCard
              title="Total Sold Products"
              value="12.987"
              icon={<BarChart3 size={20} />}
              change={12.1}
              isPositive={true}
              comparisonText="Products vs last month"
            />
          </div>

          <div className="card chart-card mt-6">
            <div className="chart-header">
              <div>
                <h2>Customer Habits</h2>
                <p>Track your customer habits</p>
              </div>
              <div className="chart-filter">
                <span>This year</span> <ChevronDown size={16} />
              </div>
            </div>
            
            <div className="chart-legend">
              <span className="legend-item"><span className="dot gray"></span> Seen product</span>
              <span className="legend-item"><span className="dot blue"></span> Sales</span>
            </div>

            <div className="chart-container" style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} tickFormatter={(value) => `${value/1000}K`} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', background: '#1e293b', color: '#fff' }} 
                  />
                  <Bar dataKey="seen" fill="#cbd5e1" radius={[10, 10, 10, 10]} barSize={20} />
                  <Bar dataKey="sales" fill="var(--accent-color)" radius={[10, 10, 10, 10]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column wrapper for Donut & Bubble charts */}
        <div className="dashboard-col-right">
          
          <div className="card chart-card">
            <div className="chart-header">
              <div>
                <h2>Product Statistic</h2>
                <p>Track your product sales</p>
              </div>
              <div className="chart-filter">
                <span>Today</span> <ChevronDown size={16} />
              </div>
            </div>

            <div className="donut-center-metric">
              <div className="donut-value">9.829</div>
              <div className="donut-label">Products Sales</div>
              <div className="badge badge-success mt-2">+5.34%</div>
            </div>

            <div className="chart-container" style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={10}
                  >
                    {productData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="product-stats-list">
              <div className="product-stat-item">
                <div className="stat-name"><Monitor size={16} color="#94a3b8" /> Electronic</div>
                <div className="stat-value">2.487 <span className="badge badge-success ml-2">+1.8%</span></div>
              </div>
              <div className="product-stat-item">
                <div className="stat-name"><Gamepad2 size={16} color="#94a3b8" /> Games</div>
                <div className="stat-value">1.828 <span className="badge badge-success ml-2">+2.3%</span></div>
              </div>
              <div className="product-stat-item">
                <div className="stat-name"><Sofa size={16} color="#94a3b8" /> Furniture</div>
                <div className="stat-value">1.463 <span className="badge badge-danger ml-2">-1.04%</span></div>
              </div>
            </div>
          </div>

          <div className="card chart-card mt-6">
            <div className="chart-header">
              <div>
                <h2>Customer Growth</h2>
                <p>Track customer by locations</p>
              </div>
              <div className="chart-filter">
                <span>Today</span> <ChevronDown size={16} />
              </div>
            </div>

            <div className="growth-content">
              {/* Bubble chart approximation */}
              <div className="bubbles">
                <div className="bubble b1">2.417</div>
                <div className="bubble b2">2.281</div>
                <div className="bubble b3">812</div>
                <div className="bubble b4">287</div>
              </div>

              <div className="locations-list">
                <div className="location-item"><span className="flag">🇺🇸</span> United States</div>
                <div className="location-item"><span className="flag">🇩🇪</span> Germany</div>
                <div className="location-item"><span className="flag">🇦🇺</span> Australia</div>
                <div className="location-item"><span className="flag">🇫🇷</span> France</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
