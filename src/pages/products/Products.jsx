import React, { useState } from 'react';
import { Search, Plus, Filter, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { products, categories } from '../../services/dummyData';
import './Products.css';

const Products = () => {
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
          <h1>Products Management</h1>
          <p>Organize your products, categories, and stock.</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={20} /> Add Product
        </button>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, idx) => (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-pagination">
          <span className="pagination-info">Showing 1 to {products.length} of {products.length} entries</span>
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
