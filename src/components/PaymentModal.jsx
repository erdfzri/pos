import React, { useState } from 'react';
import { X, CreditCard, Banknote, QrCode, Smartphone } from 'lucide-react';
import './PaymentModal.css';

const PaymentModal = ({ isOpen, onClose, total, onConfirm }) => {
  const [selectedMethod, setSelectedMethod] = useState('cash');
  const [cashAmount, setCashAmount] = useState('');

  if (!isOpen) return null;

  const paymentMethods = [
    { id: 'cash', name: 'Cash', icon: <Banknote size={24} /> },
    { id: 'qris', name: 'QRIS', icon: <QrCode size={24} /> },
    { id: 'debit', name: 'Debit', icon: <CreditCard size={24} /> },
    { id: 'ewallet', name: 'E-Wallet', icon: <Smartphone size={24} /> }
  ];

  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price || 0);
  };

  const handleCashInput = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    setCashAmount(value);
  };

  const cashValue = Number(cashAmount);
  const change = cashValue > total ? cashValue - total : 0;
  const isEnough = selectedMethod === 'cash' ? cashValue >= total : true;

  const quickAmounts = [
    total,
    Math.ceil(total / 50000) * 50000,
    Math.ceil(total / 100000) * 100000
  ].filter((v, i, a) => a.indexOf(v) === i && v >= total);

  return (
    <div className="modal-overlay animate-fade-in">
      <div className="modal-content glass">
        <div className="modal-header">
          <h2>Pembayaran</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="payment-total-section">
            <span className="total-label">Total Pembayaran</span>
            <div className="total-amount">{formatRupiah(total)}</div>
          </div>

          <div className="payment-methods">
            <h3 className="section-title">Metode Pembayaran</h3>
            <div className="methods-grid">
              {paymentMethods.map(method => (
                <button
                  key={method.id}
                  className={`method-card ${selectedMethod === method.id ? 'active' : ''}`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <div className="method-icon">{method.icon}</div>
                  <span className="method-name">{method.name}</span>
                </button>
              ))}
            </div>
          </div>

          {selectedMethod === 'cash' && (
            <div className="cash-section">
              <h3 className="section-title">Nominal Cash</h3>
              <div className="quick-amounts">
                {quickAmounts.map(amt => (
                  <button 
                    key={amt} 
                    className="quick-amt-btn"
                    onClick={() => setCashAmount(amt.toString())}
                  >
                    {formatRupiah(amt)}
                  </button>
                ))}
              </div>
              <div className="input-group">
                <span className="currency-symbol">Rp</span>
                <input
                  type="text"
                  className="amount-input"
                  placeholder="0"
                  value={new Intl.NumberFormat('id-ID').format(cashAmount)}
                  onChange={handleCashInput}
                />
              </div>
              
              <div className="change-section">
                <span>Kembalian:</span>
                <span className={`change-amount ${change > 0 ? 'positive' : ''}`}>
                  {formatRupiah(change)}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary cancel-btn" onClick={onClose}>
            Batal
          </button>
          <button 
            className="btn btn-primary submit-btn" 
            disabled={!isEnough}
            onClick={() => onConfirm(selectedMethod, cashValue, change)}
          >
            Selesaikan Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
