import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Users, 
  Calendar, 
  BarChart3, 
  ChevronDown, 
  Monitor, 
  Gamepad2, 
  Sofa, 
  Store, 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  Play, 
  ArrowRight,
  Package,
  Search,
  CheckCircle2,
  Lock,
  Building,
  CreditCard
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import DashboardCard from '../../components/DashboardCard';
import './Dashboard.css';

// Mock data for SaaS Super Admin (SaaS Owner)
const saasSalesData = [
  { name: 'CV Berkah Abadi', sales: 3200000, plan: 'Premium' },
  { name: 'PT Makmur Sentosa', sales: 1800000, plan: 'Basic' },
  { name: 'Amelia Group', sales: 4800000, plan: 'Enterprise' },
  { name: 'Dedi Retail Corp', sales: 2500000, plan: 'Premium' },
  { name: 'Lestari Bakery', sales: 1500000, plan: 'Basic' },
];

const saasPlansData = [
  { name: 'Enterprise', value: 3, color: '#F59E0B' },
  { name: 'Premium', value: 15, color: '#3B82F6' },
  { name: 'Basic', value: 24, color: '#10B981' },
  { name: 'Trial', value: 8, color: '#64748B' },
];

const mockTenants = [
  { id: 1, name: 'CV Berkah Abadi', owner: 'Aditya Pratama', plan: 'Premium', status: 'Active', warungCount: 5, joinedDate: '12 Jan 2026' },
  { id: 2, name: 'PT Makmur Sentosa', owner: 'Budi Santoso', plan: 'Basic', status: 'Active', warungCount: 3, joinedDate: '15 Jan 2026' },
  { id: 3, name: 'Amelia Group', owner: 'Citra Amelia', plan: 'Enterprise', status: 'Active', warungCount: 4, joinedDate: '20 Feb 2026' },
  { id: 4, name: 'Dedi Retail Corp', owner: 'Dedi Wijaya', plan: 'Premium', status: 'Expired', warungCount: 6, joinedDate: '01 Mar 2026' },
  { id: 5, name: 'Lestari Bakery', owner: 'Eka Lestari', plan: 'Basic', status: 'Suspended', warungCount: 2, joinedDate: '10 Apr 2026' },
];

// Mock data for Merchant Owner (Multi-outlet Owner)
const globalSalesData = [
  { name: 'Warung Berkah', sales: 320000000, admins: 3 },
  { name: 'Warung Makmur', sales: 280000000, admins: 2 },
  { name: 'Cafe Kopi', sales: 195000000, admins: 2 },
  { name: 'Ritel Utama', sales: 245000000, admins: 4 },
  { name: 'Toko Kue', sales: 208500000, admins: 1 },
];

const globalPerformanceData = [
  { name: 'Store Admin', value: 5, color: '#10B981' },
  { name: 'Staff / Kasir', value: 20, color: '#F59E0B' },
];

const mockWarungs = [
  { id: 1, name: 'Warung Berkah', address: 'Jl. Merdeka No. 12, Bandung', admins: 'Aditya Pratama', phone: '0812-3456-7890', revenue: 'Rp 320M', status: 'Active' },
  { id: 2, name: 'Warung Makmur', address: 'Jl. Sudirman No. 45, Jakarta', admins: 'Budi Santoso', phone: '0821-9876-5432', revenue: 'Rp 280M', status: 'Active' },
  { id: 3, name: 'Cafe Kopi', address: 'Jl. Braga No. 89, Bandung', admins: 'Citra Amelia', phone: '0857-1122-3344', revenue: 'Rp 195M', status: 'Active' },
  { id: 4, name: 'Ritel Utama', address: 'Jl. Pemuda No. 102, Surabaya', admins: 'Dedi Wijaya', phone: '0819-5566-7788', revenue: 'Rp 245M', status: 'Active' },
  { id: 5, name: 'Toko Kue', address: 'Jl. Gatot Subroto, Medan', admins: 'Eka Lestari', phone: '0813-4455-6677', revenue: 'Rp 208M', status: 'Active' },
];

// Mock data for Admin Warung & Staff
const salesData = [
  { name: 'Jan', seen: 4000, sales: 2400 },
  { name: 'Feb', seen: 3000, sales: 1398 },
  { name: 'Mar', seen: 2500, sales: 9800 },
  { name: 'Apr', seen: 2780, sales: 3908 },
  { name: 'May', seen: 1890, sales: 4800 },
  { name: 'Jun', seen: 2390, sales: 3800 },
  { name: 'Jul', seen: 3490, sales: 4300 },
];

const productData = [
  { name: 'Bahan Pokok', value: 2487, color: '#2563EB' },
  { name: 'Minuman', value: 1828, color: '#10B981' },
  { name: 'Snack / Makanan', value: 1463, color: '#F59E0B' },
];

const mockStaffPerformance = [
  { name: 'Ahmad Faisal', role: 'Kasir Shift Pagi', transactions: '67 Transaksi', revenue: 'Rp 3.2M', rating: '4.8/5.0' },
  { name: 'Siti Rahma', role: 'Kasir Shift Sore', transactions: '54 Transaksi', revenue: 'Rp 2.8M', rating: '4.9/5.0' },
];

const mockLowStockItems = [
  { name: 'Minyak Goreng 2L', stock: '3 pcs remaining', color: 'danger' },
  { name: 'Gula Pasir 1kg', stock: '5 pcs remaining', color: 'warning' },
  { name: 'Beras Pandan Wangi 5kg', stock: '2 pcs remaining', color: 'danger' },
];

// Mock database products for Staff quick-lookup
const mockAllProducts = [
  { code: 'PRD001', name: 'Minyak Goreng Bimoli 2L', stock: 3, price: 'Rp 38.000', category: 'Bahan Pokok' },
  { code: 'PRD002', name: 'Beras Pandan Wangi 5kg', stock: 2, price: 'Rp 75.000', category: 'Bahan Pokok' },
  { code: 'PRD003', name: 'Teh Celup Sariwangi isi 25', stock: 45, price: 'Rp 7.500', category: 'Minuman' },
  { code: 'PRD004', name: 'Indomie Goreng Spesial', stock: 120, price: 'Rp 3.500', category: 'Makanan' },
  { code: 'PRD005', name: 'Gula Pasir Gulaku 1kg', stock: 5, price: 'Rp 16.000', category: 'Bahan Pokok' },
  { code: 'PRD006', name: 'Coca Cola Pet 390ml', stock: 24, price: 'Rp 5.500', category: 'Minuman' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : { username: 'Ferra Alexandra', role: 'Staff / Kasir', warung_name: 'Warung POSmart' };
  
  // Search state for Staff Dashboard lookup
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered products for quick-lookup
  const filteredProducts = mockAllProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ==========================================
  // RENDER 1: SUPER ADMIN DASHBOARD VIEW
  // ==========================================
  // ==========================================
  // RENDER 1: SUPER ADMIN DASHBOARD VIEW (SaaS Platform Owner)
  // ==========================================
  const renderSuperAdmin = () => (
    <div className="dashboard-layout animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1>SaaS Platform Dashboard</h1>
          <p>Super Admin Panel • SaaS Platform Global Overview</p>
        </div>
        <div className="role-badge super-admin-badge">
          <Shield size={14} style={{ marginRight: '4px' }} /> Super Admin (SaaS Owner)
        </div>
      </div>

      <div className="stats-grid">
        <DashboardCard
          title="Monthly Recurring Revenue (MRR)"
          value="Rp 8,450,000"
          icon={<TrendingUp size={20} />}
          change={14.2}
          isPositive={true}
          comparisonText="vs last month"
          isPrimary={true}
        />
        <DashboardCard
          title="Total Active Tenants"
          value="12 Businesses"
          icon={<Building size={20} />}
          change={20.0}
          isPositive={true}
          comparisonText="2 added this month"
        />
        <DashboardCard
          title="Global Outlets/Warungs"
          value="28 Active"
          icon={<Store size={20} />}
          change={12.5}
          isPositive={true}
          comparisonText="Across all tenants"
        />
        <DashboardCard
          title="Global Transactions Today"
          value="1,290 trx"
          icon={<ShoppingBag size={20} />}
          change={-1.2}
          isPositive={false}
          comparisonText="vs yesterday"
        />
      </div>

      <div className="dashboard-grid">
        {/* Left column - SaaS Performance */}
        <div className="dashboard-col-left">
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <h2>Tenant Revenue Breakdown</h2>
                <p>Top active subscribing businesses by billing volume</p>
              </div>
            </div>

            <div className="chart-container" style={{ height: 320, marginTop: '1.5rem' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={saasSalesData} margin={{ top: 20, right: 0, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="saasAdminSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.95}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.4}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} tickFormatter={(value) => `Rp ${value/1000000}M`} />
                  <Tooltip 
                    cursor={{fill: 'rgba(16, 185, 129, 0.02)'}}
                    contentStyle={{ borderRadius: '14px', border: 'none', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)', background: '#ffffff', color: '#0f172a' }}
                    formatter={(value) => [`Rp ${(value/1000000).toFixed(1)} Juta`, 'Sales Volume']}
                  />
                  <Bar dataKey="sales" fill="url(#saasAdminSales)" radius={[6, 6, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tenants list */}
          <div className="chart-card mt-6">
            <div className="chart-header" style={{ marginBottom: '1rem' }}>
              <div>
                <h2>Registered Subscribing Businesses</h2>
                <p>Complete status registry of multi-tenant businesses</p>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #E2E8F0', color: '#64748B', textAlign: 'left' }}>
                    <th style={{ padding: '0.75rem' }}>Business Name</th>
                    <th style={{ padding: '0.75rem' }}>Owner</th>
                    <th style={{ padding: '0.75rem' }}>Subscribed Plan</th>
                    <th style={{ padding: '0.75rem' }}>Outlets</th>
                    <th style={{ padding: '0.75rem' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTenants.map(t => (
                    <tr key={t.id} style={{ borderBottom: '1px solid #F1F5F9', color: '#334155' }}>
                      <td style={{ padding: '0.75rem', fontWeight: 600, color: '#10B981' }}>{t.name}</td>
                      <td style={{ padding: '0.75rem' }}>{t.owner}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <span style={{ 
                          background: t.plan === 'Enterprise' ? '#F59E0B' : t.plan === 'Premium' ? '#3B82F6' : '#64748B', 
                          color: '#FFFFFF', 
                          padding: '0.15rem 0.4rem', 
                          borderRadius: '4px', 
                          fontSize: '0.7rem', 
                          fontWeight: 700 
                        }}>
                          {t.plan}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem', fontWeight: 700 }}>{t.warungCount} Outlets</td>
                      <td style={{ padding: '0.75rem' }}>
                        <span style={{ 
                          background: t.status === 'Active' ? '#D1FAE5' : t.status === 'Suspended' ? '#FEF3C7' : '#FEE2E2', 
                          color: t.status === 'Active' ? '#065F46' : t.status === 'Suspended' ? '#B45309' : '#991B1B', 
                          padding: '0.2rem 0.5rem', 
                          borderRadius: '6px', 
                          fontSize: '0.75rem', 
                          fontWeight: 700 
                        }}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column - Plan breakdown */}
        <div className="dashboard-col-right">
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <h2>Subscription Tier Share</h2>
                <p>SaaS subscription tiers distribution</p>
              </div>
            </div>

            <div className="donut-center-metric">
              <div className="donut-value">50</div>
              <div className="donut-label">Total Tenants</div>
            </div>

            <div className="chart-container" style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={saasPlansData}
                    cx="50%"
                    cy="50%"
                    innerRadius={68}
                    outerRadius={88}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={8}
                  >
                    {saasPlansData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(15,23,42,0.06)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="product-stats-list" style={{ marginTop: '1rem' }}>
              {saasPlansData.map((g, idx) => (
                <div key={idx} className="product-stat-item">
                  <div className="stat-name">
                    <span style={{ width: '10px', height: '10px', background: g.color, borderRadius: '50%', display: 'inline-block', marginRight: '8px' }}></span>
                    {g.name}
                  </div>
                  <div className="stat-value" style={{ fontWeight: 700 }}>
                    {g.value} Tenants
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="chart-card mt-6" style={{ background: 'linear-gradient(135deg, #111827 0%, #1F2937 100%)', color: '#FFFFFF' }}>
            <h2>SaaS Developer Shortcuts</h2>
            <p style={{ color: '#9CA3AF', fontSize: '0.85rem', marginBottom: '1.25rem' }}>Quickly access SaaS system configurations.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button 
                onClick={() => navigate('/dashboard/tenants')}
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', padding: '0.75rem 1rem', borderRadius: '10px', textAlign: 'left', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
              >
                <span>Kelola Subscribing Tenants</span> <ArrowRight size={16} />
              </button>
              <button 
                onClick={() => navigate('/dashboard/subscriptions')}
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', padding: '0.75rem 1rem', borderRadius: '10px', textAlign: 'left', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
              >
                <span>SaaS Subscriptions & Billing</span> <ArrowRight size={16} />
              </button>
              <button 
                onClick={() => navigate('/dashboard/transactions')}
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', padding: '0.75rem 1rem', borderRadius: '10px', textAlign: 'left', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
              >
                <span>Global Transactions Stream</span> <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ==========================================
  // RENDER 1.5: MERCHANT OWNER DASHBOARD VIEW (Multi-Outlet Owner)
  // ==========================================
  const renderMerchantOwner = () => (
    <div className="dashboard-layout animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1>Jaringan Warung Dashboard</h1>
          <p>Merchant Owner Panel • Consolidated Multi-outlet Monitor</p>
        </div>
        <div className="role-badge" style={{ background: '#EFF6FF', color: '#2563EB', fontSize: '0.8rem', fontWeight: 700, padding: '0.35rem 0.75rem', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <Store size={14} style={{ marginRight: '2px' }} /> Merchant Owner
        </div>
      </div>

      <div className="stats-grid">
        <DashboardCard
          title="Total Revenue (All Warungs)"
          value="Rp 1,248.5M"
          icon={<TrendingUp size={20} />}
          change={4.8}
          isPositive={true}
          comparisonText="vs last month"
          isPrimary={true}
        />
        <DashboardCard
          title="Total Warungs Managed"
          value={`${mockWarungs.length} Active`}
          icon={<Store size={20} />}
          change={12.5}
          isPositive={true}
          comparisonText="Outlets operational"
        />
        <DashboardCard
          title="Active Store Admins"
          value="5 Accounts"
          icon={<Users size={20} />}
          change={8.3}
          isPositive={true}
          comparisonText="Branch managers"
        />
        <DashboardCard
          title="Global Transactions Today"
          value="1,290 trx"
          icon={<ShoppingBag size={20} />}
          change={-1.2}
          isPositive={false}
          comparisonText="Across all branches"
        />
      </div>

      <div className="dashboard-grid">
        {/* Left column - Revenue by Warung */}
        <div className="dashboard-col-left">
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <h2>Income Breakdown by Warung</h2>
                <p>Consolidated revenue across your active outlets</p>
              </div>
            </div>

            <div className="chart-container" style={{ height: 320, marginTop: '1.5rem' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={globalSalesData} margin={{ top: 20, right: 0, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="merchantAdminSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.95}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.4}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} tickFormatter={(value) => `Rp ${value/1000000}M`} />
                  <Tooltip 
                    cursor={{fill: 'rgba(37, 99, 235, 0.02)'}}
                    contentStyle={{ borderRadius: '14px', border: 'none', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)', background: '#ffffff', color: '#0f172a' }}
                    formatter={(value) => [`Rp ${(value/1000000).toFixed(0)} Juta`, 'Sales']}
                  />
                  <Bar dataKey="sales" fill="url(#merchantAdminSales)" radius={[6, 6, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Warungs list */}
          <div className="chart-card mt-6">
            <div className="chart-header" style={{ marginBottom: '1rem' }}>
              <div>
                <h2>Your Outlets Registry</h2>
                <p>Complete list of your physical stores monitored on POSmart</p>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #E2E8F0', color: '#64748B', textAlign: 'left' }}>
                    <th style={{ padding: '0.75rem' }}>Warung Name</th>
                    <th style={{ padding: '0.75rem' }}>Admins Account</th>
                    <th style={{ padding: '0.75rem' }}>Contact</th>
                    <th style={{ padding: '0.75rem' }}>Consolidated Sales</th>
                    <th style={{ padding: '0.75rem' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockWarungs.map(w => (
                    <tr key={w.id} style={{ borderBottom: '1px solid #F1F5F9', color: '#334155' }}>
                      <td style={{ padding: '0.75rem', fontWeight: 600, color: '#2563EB' }}>{w.name}</td>
                      <td style={{ padding: '0.75rem' }}>{w.admins}</td>
                      <td style={{ padding: '0.75rem' }}>{w.phone}</td>
                      <td style={{ padding: '0.75rem', fontWeight: 700 }}>{w.revenue}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <span style={{ background: '#D1FAE5', color: '#065F46', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>{w.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column - Accounts breakdown */}
        <div className="dashboard-col-right">
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <h2>Staff Accounts Breakdown</h2>
                <p>Active employees registered under your business</p>
              </div>
            </div>

            <div className="donut-center-metric">
              <div className="donut-value">25</div>
              <div className="donut-label">Total Staff</div>
            </div>

            <div className="chart-container" style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={globalPerformanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={68}
                    outerRadius={88}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={8}
                  >
                    {globalPerformanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(15,23,42,0.06)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="product-stats-list" style={{ marginTop: '1rem' }}>
              {globalPerformanceData.map((g, idx) => (
                <div key={idx} className="product-stat-item">
                  <div className="stat-name">
                    <span style={{ width: '10px', height: '10px', background: g.color, borderRadius: '50%', display: 'inline-block', marginRight: '8px' }}></span>
                    {g.name}
                  </div>
                  <div className="stat-value" style={{ fontWeight: 700 }}>
                    {g.value} Accounts
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="chart-card mt-6" style={{ background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)', color: '#FFFFFF' }}>
            <h2>Merchant Owner Shortcuts</h2>
            <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '1.25rem' }}>Quickly access central management nodes.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button 
                onClick={() => navigate('/dashboard/warungs')}
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', padding: '0.75rem 1rem', borderRadius: '10px', textAlign: 'left', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
              >
                <span>Tambahkan Warung / Cabang</span> <ArrowRight size={16} />
              </button>
              <button 
                onClick={() => navigate('/dashboard/admins')}
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', padding: '0.75rem 1rem', borderRadius: '10px', textAlign: 'left', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
              >
                <span>Kelola Kepala Cabang (Admins)</span> <ArrowRight size={16} />
              </button>
              <button 
                onClick={() => navigate('/dashboard/transactions')}
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', padding: '0.75rem 1rem', borderRadius: '10px', textAlign: 'left', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
              >
                <span>Pantau Penjualan Real-time</span> <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ==========================================
  // RENDER 2: ADMIN WARUNG DASHBOARD VIEW
  // ==========================================
  const renderAdminWarung = () => (
    <div className="dashboard-layout animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard Toko</h1>
          <p>{user.warung_name || 'Warung POSmart'} • Store Overview</p>
        </div>
        <div className="role-badge admin-warung-badge">
          <Store size={14} style={{ marginRight: '4px' }} /> Admin Warung
        </div>
      </div>

      <div className="stats-grid">
        <DashboardCard
          title="Revenue Today"
          value="Rp 8,450,000"
          icon={<Calendar size={20} />}
          change={12.4}
          isPositive={true}
          comparisonText="vs yesterday"
          isPrimary={true}
        />
        <DashboardCard
          title="Daily Transactions"
          value="142 Orders"
          icon={<ShoppingBag size={20} />}
          change={8.2}
          isPositive={true}
          comparisonText="vs yesterday"
        />
        <DashboardCard
          title="Low Stock Alerts"
          value="3 Items"
          icon={<AlertTriangle size={20} color="#EF4444" />}
          change={-25.0}
          isPositive={true} // Lower stock alerts is positive
          comparisonText="Need re-stock soon"
        />
        <DashboardCard
          title="Active Staff on Shift"
          value="2 Cashiers"
          icon={<Users size={20} />}
          change={0.0}
          isPositive={true}
          comparisonText="Shift Pagi & Sore"
        />
      </div>

      <div className="dashboard-grid">
        {/* Left column - Charts */}
        <div className="dashboard-col-left">
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <h2>Customer Habits & Traffic</h2>
                <p>Track store visits vs successful sales transactions</p>
              </div>
            </div>
            
            <div className="chart-legend">
              <span className="legend-item"><span className="dot gray"></span> Seen product</span>
              <span className="legend-item"><span className="dot blue"></span> Sales</span>
            </div>

            <div className="chart-container" style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.95}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.4}/>
                    </linearGradient>
                    <linearGradient id="colorSeen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E2E8F0" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#CBD5E1" stopOpacity={0.4}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} tickFormatter={(value) => `${value/1000}K`} />
                  <Tooltip 
                    cursor={{fill: 'rgba(37, 99, 235, 0.02)'}}
                    contentStyle={{ borderRadius: '14px', border: 'none', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)', background: '#ffffff', color: '#0f172a' }} 
                  />
                  <Bar dataKey="seen" fill="url(#colorSeen)" radius={[6, 6, 0, 0]} barSize={16} />
                  <Bar dataKey="sales" fill="url(#colorSales)" radius={[6, 6, 0, 0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="chart-card mt-6">
            <div className="chart-header" style={{ marginBottom: '1.25rem' }}>
              <div>
                <h2>Critical Inventory Alert (Stok Menipis)</h2>
                <p>These products are running low on stock. Restock immediately to avoid catalog disruption.</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {mockLowStockItems.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', borderRadius: '12px', background: item.color === 'danger' ? '#FEF2F2' : '#FFFBEB', border: item.color === 'danger' ? '1px solid #FEE2E2' : '1px solid #FEF3C7' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ background: item.color === 'danger' ? '#EF4444' : '#F59E0B', color: '#FFFFFF', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AlertTriangle size={16} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontWeight: 700, color: '#1E293B', fontSize: '0.92rem' }}>{item.name}</h4>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B' }}>In Category: Bahan Makanan</p>
                    </div>
                  </div>
                  <span style={{ background: item.color === 'danger' ? '#FEE2E2' : '#FEF3C7', color: item.color === 'danger' ? '#EF4444' : '#B45309', padding: '0.25rem 0.5rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>
                    {item.stock}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column - Categories & Staff */}
        <div className="dashboard-col-right">
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <h2>Popular Categories Today</h2>
                <p>Revenue distribution of item classes</p>
              </div>
            </div>

            <div className="donut-center-metric">
              <div className="donut-value">Rp 8.4M</div>
              <div className="donut-label">Total Sales</div>
            </div>

            <div className="chart-container" style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={8}
                  >
                    {productData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(15,23,42,0.06)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="product-stats-list">
              {productData.map((p, idx) => (
                <div key={idx} className="product-stat-item">
                  <div className="stat-name" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color, display: 'inline-block' }}></span>
                    {p.name}
                  </div>
                  <div className="stat-value">{p.value} Items <span className="badge badge-success ml-2">+3.2%</span></div>
                </div>
              ))}
            </div>
          </div>

          {/* Staff Performance */}
          <div className="chart-card mt-6">
            <div className="chart-header" style={{ marginBottom: '1rem' }}>
              <div>
                <h2>Staff/Cashiers Shift Performance</h2>
                <p>Tracking transactions, ticket value, and rating</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {mockStaffPerformance.map((staff, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0.5rem', borderBottom: '1px solid #F1F5F9' }}>
                  <div>
                    <h4 style={{ margin: 0, fontWeight: 700, color: '#1E293B', fontSize: '0.88rem' }}>{staff.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{staff.role}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, color: '#2563EB', fontSize: '0.88rem' }}>{staff.revenue}</div>
                    <span style={{ fontSize: '0.75rem', background: '#EFF6FF', color: '#2563EB', padding: '0.1rem 0.35rem', borderRadius: '4px', fontWeight: 600 }}>{staff.transactions}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ==========================================
  // RENDER 3: STAFF / KASIR DASHBOARD VIEW
  // ==========================================
  const renderStaff = () => (
    <div className="dashboard-layout animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1>Cashier Workspace</h1>
          <p>{user.warung_name || 'Warung POSmart'} • Cashier Interface Panel</p>
        </div>
        <div className="role-badge staff-badge">
          <Users size={14} style={{ marginRight: '4px' }} /> Staff / Kasir
        </div>
      </div>

      {/* Staff Statistics */}
      <div className="stats-grid">
        <DashboardCard
          title="My Transactions (Shift)"
          value="42 Orders"
          icon={<ShoppingBag size={20} />}
          change={14.8}
          isPositive={true}
          comparisonText="Processed on this shift"
          isPrimary={true}
        />
        <DashboardCard
          title="My Sales Value"
          value="Rp 2,120,000"
          icon={<Calendar size={20} />}
          change={8.3}
          isPositive={true}
          comparisonText="Net revenue logged"
        />
        <DashboardCard
          title="Store Operational Status"
          value="Open"
          icon={<CheckCircle2 size={20} color="#10B981" />}
          change={0.0}
          isPositive={true}
          comparisonText="Connected to POS Server"
        />
        <DashboardCard
          title="Products Catalog"
          value="124 Items"
          icon={<Package size={20} />}
          change={0.0}
          isPositive={true}
          comparisonText="In stock catalog"
        />
      </div>

      <div className="dashboard-grid">
        {/* Left Column: Quick lookup & POS actions */}
        <div className="dashboard-col-left">
          
          {/* Launch POS CTA */}
          <div className="chart-card" style={{ background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)', color: '#FFFFFF', border: 'none', boxShadow: '0 12px 30px rgba(37,99,235,0.25)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.15, transform: 'scale(1.5)' }}>
              <ShoppingCart size={180} />
            </div>
            
            <div style={{ position: 'relative', zIndex: 5, padding: '1rem 0.5rem' }}>
              <h2 style={{ color: '#FFFFFF', fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem' }}>Buka Layar Kasir (POS)</h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.98rem', maxWidth: '480px', marginBottom: '1.75rem' }}>
                Siap melayani pelanggan? Buka layar transaksi kasir untuk menginput belanjaan, memindai produk, dan mencetak struk secara cepat dan instan.
              </p>
              
              <button 
                onClick={() => navigate('/dashboard/pos')}
                style={{ 
                  background: '#FFFFFF', 
                  color: '#2563EB', 
                  border: 'none', 
                  padding: '0.85rem 1.75rem', 
                  borderRadius: '12px', 
                  fontWeight: 700, 
                  fontSize: '1rem', 
                  cursor: 'pointer', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)' }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)' }}
              >
                <Play size={18} fill="#2563EB" /> Mulai Layanan Transaksi <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Quick Product lookup */}
          <div className="chart-card mt-6">
            <div className="chart-header" style={{ marginBottom: '1.25rem' }}>
              <div>
                <h2>Pencarian Produk & Cek Stok</h2>
                <p>Cari produk untuk melihat jumlah stok dan harga jual secara cepat tanpa membuka layar kasir.</p>
              </div>
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
              <Search style={{ position: 'absolute', left: '12px', top: '12px', color: '#94A3B8' }} size={18} />
              <input 
                type="text"
                placeholder="Ketik Nama Produk atau Kode Produk (misal: Minyak, PRD001)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  border: '1px solid #E2E8F0',
                  borderRadius: '10px',
                  fontSize: '0.92rem',
                  outline: 'none',
                  background: '#F8FAFC',
                  transition: 'all 0.2s'
                }}
              />
            </div>

            {/* Product results list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '350px', overflowY: 'auto', paddingRight: '4px' }}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', borderRadius: '10px', background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 5px rgba(0,0,0,0.01)' }}>
                    <div>
                      <h4 style={{ margin: 0, fontWeight: 700, color: '#1E293B', fontSize: '0.88rem' }}>{p.name}</h4>
                      <span style={{ fontSize: '0.72rem', background: '#F1F5F9', color: '#64748B', padding: '0.1rem 0.35rem', borderRadius: '4px', fontWeight: 600, marginRight: '6px' }}>{p.code}</span>
                      <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Kat: {p.category}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700, color: '#2563EB', fontSize: '0.88rem' }}>{p.price}</div>
                      <span style={{ 
                         fontSize: '0.72rem', 
                         background: p.stock <= 5 ? '#FEF2F2' : '#D1FAE5', 
                         color: p.stock <= 5 ? '#EF4444' : '#065F46', 
                         padding: '0.15rem 0.45rem', 
                         borderRadius: '6px', 
                         fontWeight: 700 
                       }}>
                        Stok: {p.stock} pcs
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#94A3B8' }}>
                  Produk "{searchQuery}" tidak ditemukan.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Restrictions info & help */}
        <div className="dashboard-col-right">
          
          {/* Restrictions Info */}
          <div className="chart-card" style={{ borderLeft: '4px solid #F59E0B' }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div style={{ color: '#F59E0B', marginTop: '2px' }}>
                <Lock size={20} />
              </div>
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontWeight: 700, color: '#1E293B', fontSize: '0.98rem' }}>Kebijakan Akses Staff</h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748B', lineHeight: '1.4' }}>
                  Sebagai <strong>Staff / Kasir</strong>, Anda memiliki hak akses operasional. Anda diperkenankan melakukan transaksi penjualan dan melihat katalog stok produk.
                </p>
                <div style={{ marginTop: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem', color: '#64748B' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: '#EF4444', fontWeight: 900 }}>✕</span> Tidak bisa mengubah harga produk
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: '#EF4444', fontWeight: 900 }}>✕</span> Tidak bisa menghapus transaksi
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: '#EF4444', fontWeight: 900 }}>✕</span> Tidak bisa mengakses pengaturan toko
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Shift tips */}
          <div className="chart-card mt-6">
            <h3 style={{ margin: '0 0 0.75rem 0', fontWeight: 700, color: '#1E293B' }}>Tips Sukses Shift Kasir</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem', color: '#64748B' }}>
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid #F1F5F9' }}>
                <strong style={{ color: '#1E293B', display: 'block', marginBottom: '0.15rem' }}>1. Selalu Cek Stok Produk Critical</strong>
                Produk seperti minyak dan gula sering mengalami lonjakan pembelian. Cek stok secara berkala di pencarian cepat.
              </div>
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid #F1F5F9' }}>
                <strong style={{ color: '#1E293B', display: 'block', marginBottom: '0.15rem' }}>2. Cetak Struk Setelah Transaksi Berhasil</strong>
                Pastikan printer struk aktif dan kertas terisi penuh agar pelayanan kasir tetap lancar tanpa hambatan.
              </div>
              <div>
                <strong style={{ color: '#1E293B', display: 'block', marginBottom: '0.15rem' }}>3. Laporkan Selisih Kas Ke Admin</strong>
                Selalu hitung uang tunai di laci kasir di awal dan akhir shift untuk mencegah adanya selisih laporan.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );

  // Switch renderer based on user role
  switch (user.role) {
    case 'Super Admin':
      return renderSuperAdmin();
    case 'Merchant Owner':
      return renderMerchantOwner();
    case 'Admin Warung':
      return renderAdminWarung();
    case 'Staff / Kasir':
    default:
      return renderStaff();
  }
};

export default Dashboard;
