import React from 'react';
import { Plus } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product, onAdd }) => {
  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="product-card card" onClick={() => onAdd(product)}>
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
        <div className="product-category badge badge-primary">{product.category}</div>
      </div>
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-bottomrow">
          <span className="product-price">{formatRupiah(product.price)}</span>
          <button className="add-btn btn-primary" aria-label="Add to cart">
            <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
