import React, { useState } from 'react';
import { Search, Filter, CheckCircle, CreditCard, ShoppingBag, ShoppingCart } from 'lucide-react';
import ProductCard from '../../components/ProductCard';
import CartItem from '../../components/CartItem';
import PaymentModal from '../../components/PaymentModal';
import { products, categories } from '../../services/dummyData';
import { useCart } from '../../hooks/useCart';
import './POS.css';

const POS = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    tax,
    discount,
    total
  } = useCart();

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handlePayment = (method, cashAmount, change) => {
    setIsPaymentOpen(false);
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
      clearCart();
    }, 3000);
  };

  return (
    <div className="pos-layout animate-fade-in">
      <div className="pos-main">
        <div className="pos-toolbar card">
          <div className="pos-search-wrapper">
            <Search size={18} className="pos-search-icon" />
            <input 
              type="text" 
              placeholder="Search product name..." 
              className="pos-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary pos-filter-btn">
            <Filter size={18} /> Filters
          </button>
        </div>

        <div className="pos-categories">
          {categories.map((cat, index) => (
            <button
              key={index}
              className={`pos-category-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="pos-product-list">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAdd={addToCart} 
            />
          ))}
          {filteredProducts.length === 0 && (
            <div className="pos-empty">
              <ShoppingBag size={48} color="var(--text-muted)" />
              <p>No products found in this category.</p>
            </div>
          )}
        </div>
      </div>

      <div className="pos-cart-panel card">
        <div className="cart-header-compact">
          <h3>Current Order</h3>
          <span className="badge badge-primary">{cartItems.length} items</span>
        </div>

        <div className="cart-list">
          {cartItems.length > 0 ? (
            cartItems.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onUpdate={updateQuantity}
                onRemove={removeFromCart}
              />
            ))
          ) : (
            <div className="cart-empty-state">
              <ShoppingCart size={40} color="var(--text-muted)" />
              <p>Your cart is empty</p>
              <span>Add products to begin checkout</span>
            </div>
          )}
        </div>

        <div className="cart-summary-modern">
          <div className="summary-line">
            <span>Subtotal</span>
            <span className="font-semibold">{formatRupiah(subtotal)}</span>
          </div>
          <div className="summary-line text-danger">
            <span>Discount</span>
            <span>- {formatRupiah(discount)}</span>
          </div>
          <div className="summary-line">
            <span>Tax (11%)</span>
            <span>{formatRupiah(tax)}</span>
          </div>
          
          <div className="summary-line summary-total">
            <span>Total</span>
            <span className="total-highlight">{formatRupiah(total)}</span>
          </div>
        </div>

        <div className="cart-footer-actions">
          <div className="cart-action-group">
            <button 
              className="btn btn-warning cart-btn flex-1"
              disabled={cartItems.length === 0}
            >
              Hold
            </button>
            <button 
              className="btn btn-danger cart-btn flex-1"
              disabled={cartItems.length === 0}
              onClick={clearCart}
            >
              Cancel
            </button>
          </div>
          <button 
            className="btn btn-primary cart-btn-pay"
            disabled={cartItems.length === 0}
            onClick={() => setIsPaymentOpen(true)}
          >
            <CreditCard size={20} /> Pay Now ({formatRupiah(total)})
          </button>
        </div>
      </div>

      <PaymentModal 
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        total={total}
        onConfirm={handlePayment}
      />

      {paymentSuccess && (
        <div className="payment-toast animate-fade-in card">
          <CheckCircle size={24} color="var(--success)" strokeWidth={2.5}/>
          <span>Payment Successful!</span>
        </div>
      )}
    </div>
  );
};

export default POS;
