import React, { useState } from 'react';
import { Search, Plus, Filter, Edit, Trash2, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { products } from '../../services/dummyData';
import './Products.css';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get user role for view-only checks
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : { username: 'Ferra Alexandra', role: 'Staff / Kasir' };
  const isReadOnly = user.role === 'Staff / Kasir';
  
  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in product-page-ui">
      {/* Banner Mode Lihat-Saja untuk Staff / Kasir */}
      {isReadOnly && (
        <div className="read-only-banner" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: '#FFFBEB',
          border: '1px solid #FEF3C7',
          color: '#B45309',
          padding: '1rem 1.25rem',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          fontSize: '0.88rem',
          fontWeight: 500,
          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.03)'
        }}>
          <div style={{ background: '#F59E0B', color: '#FFFFFF', borderRadius: '50%', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Lock size={14} />
          </div>
          <span>
            <strong>Mode Lihat-Saja (Staff / Kasir):</strong> Anda dapat memantau katalog produk dan melihat sisa stok produk secara real-time, namun tidak memiliki wewenang untuk menambah, mengubah, atau menghapus data produk.
          </span>
        </div>
      )}

      <div className="page-header-modern">
        <div>
          <h1>Products Management</h1>
          <p>Organize your products, categories, and stock.</p>
        </div>
        {!isReadOnly && (
          <button className="btn btn-primary">
            <Plus size={20} /> Add Product
          </button>
        )}
      </div>

      <div className="card product-card-table mt-4">
        <div className="table-toolbar">
          <div className="table-search-box">
            <Search size={18} className="search-icon-inline" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="table-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary filter-btn">
            <Filter size={18} /> Category
          </button>
        </div>

        <div className="table-responsive">
          <table className="saas-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                {!isReadOnly && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, idx) => (
                <tr key={product.id} style={{ animationDelay: `${idx * 0.05}s` }} className="animate-fade-in">
                  <td>
                    <div className="product-cell-info">
                      <img src={product.image} alt={product.name} className="product-cell-img" loading="lazy" />
                      <span className="font-semibold">{product.name}</span>
                    </div>
                  </td>
                  <td><span className="badge badge-primary">{product.category}</span></td>
                  <td className="font-bold price-cell">{formatRupiah(product.price)}</td>
                  <td>{product.stock}</td>
                  <td>
                    <span className={`badge ${product.stock > 10 ? 'badge-success' : 'badge-warning'}`}>
                      {product.stock > 10 ? 'In Stock' : 'Low Stock'}
                    </span>
                  </td>
                  {!isReadOnly && (
                    <td>
                      <div className="action-buttons-cell">
                        <button className="icon-action edit" aria-label="Edit">
                          <Edit size={16} />
                        </button>
                        <button className="icon-action delete" aria-label="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-pagination">
          <span className="pagination-info">Showing 1 to {filteredProducts.length} of {filteredProducts.length} entries</span>
          <div className="pagination-controls">
            <button className="btn btn-secondary page-btn"><ChevronLeft size={16}/></button>
            <button className="btn btn-primary page-btn">1</button>
            <button className="btn btn-secondary page-btn"><ChevronRight size={16}/></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
