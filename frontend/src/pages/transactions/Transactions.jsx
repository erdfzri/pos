import React, { useState } from 'react';
import { Search, Calendar, Filter, Eye, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { recentTransactions } from '../../services/dummyData';
import '../products/Products.css'; // Reuse SaaS table styles

const Transactions = () => {
  const [dateRange, setDateRange] = useState('Today');
  const [searchTerm, setSearchTerm] = useState('');

  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="animate-fade-in product-page-ui">
      <div className="page-header-modern">
        <div>
          <h1>Transactions History</h1>
          <p>Monitor your sales, orders, and payment status.</p>
        </div>
        <button className="btn btn-primary">
          <Download size={20} /> Export CSV
        </button>
      </div>

      <div className="card product-card-table mt-4">
        <div className="table-toolbar">
          <div className="table-search-box">
            <Search size={18} className="search-icon-inline" />
            <input 
              type="text" 
              placeholder="Search Transaction ID..." 
              className="table-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary filter-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={18} /> Date: {dateRange}
          </button>
          <button className="btn btn-secondary filter-btn">
            <Filter size={18} /> Status
          </button>
        </div>

        <div className="table-responsive">
          <table className="saas-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Time & Date</th>
                <th>Cashier</th>
                <th>Total Items</th>
                <th>Total Amount</th>
                <th>Method</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((trx, idx) => (
                <tr key={trx.id} style={{ animationDelay: `${idx * 0.05}s` }} className="animate-fade-in">
                  <td className="font-bold">{trx.id}</td>
                  <td>
                    <div className="font-semibold">{trx.time}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Today</div>
                  </td>
                  <td>Ferra Alexandra</td>
                  <td>{trx.items} Items</td>
                  <td className="font-bold" style={{ color: 'var(--accent-color)' }}>
                    {formatRupiah(trx.total)}
                  </td>
                  <td>
                    <span className="badge badge-primary">{trx.method}</span>
                  </td>
                  <td>
                    <span className={`badge ${trx.status === 'Success' ? 'badge-success' : 'badge-danger'}`}>
                      {trx.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-secondary" style={{ padding: '0.5rem 0.8rem', fontSize: '0.85rem' }}>
                      <Eye size={16} /> Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-pagination">
          <span className="pagination-info">Showing {recentTransactions.length} recent transactions</span>
          <div className="pagination-controls">
            <button className="btn btn-secondary page-btn" disabled><ChevronLeft size={16}/></button>
            <button className="btn btn-primary page-btn">1</button>
            <button className="btn btn-secondary page-btn" disabled><ChevronRight size={16}/></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
