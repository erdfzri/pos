import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import './CartItem.css';

const CartItem = ({ item, onUpdate, onRemove }) => {
  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-img" />
      <div className="cart-item-details">
        <h4 className="cart-item-name">{item.name}</h4>
        <div className="cart-item-price">{formatRupiah(item.price)}</div>
      </div>
      <div className="cart-item-actions">
        {item.quantity === 1 ? (
          <button className="qty-btn danger" onClick={() => onRemove(item.id)}>
            <Trash2 size={16} />
          </button>
        ) : (
          <button className="qty-btn" onClick={() => onUpdate(item.id, -1)}>
            <Minus size={16} />
          </button>
        )}
        <span className="qty-value">{item.quantity}</span>
        <button className="qty-btn primary" onClick={() => onUpdate(item.id, 1)}>
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
