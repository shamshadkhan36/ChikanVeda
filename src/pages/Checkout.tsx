import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';

export const Checkout: React.FC = () => {
  const { cart, clearCart } = useCartWishlist();
  const navigate = useNavigate();

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    address: '',
    landmark: '',
    city: '',
    state: '',
    pinCode: '',
  });

  // Payment Options
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('cod');
  
  // Card Inputs (if card selected)
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expDate: '',
    cvv: ''
  });

  // UPI Input (if UPI selected)
  const [upiId, setUpiId] = useState('');

  // Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Subtotal calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingThreshold = 1999;
  const shippingCost = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 150;
  const total = subtotal + shippingCost;

  // Redirect to cart if empty
  if (cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name Validation
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';

    // Phone Validation (Indian mobile format: 10 digits)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile Number is required';
    } else if (!phoneRegex.test(formData.mobileNumber.trim())) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit Indian mobile number';
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Address Validations
    if (!formData.address.trim()) newErrors.address = 'Street Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';

    // Pin Code Validation (6 digits)
    const pinRegex = /^\d{6}$/;
    if (!formData.pinCode.trim()) {
      newErrors.pinCode = 'PIN Code is required';
    } else if (!pinRegex.test(formData.pinCode.trim())) {
      newErrors.pinCode = 'Please enter a valid 6-digit PIN Code';
    }

    // Conditional Payment Validations
    if (paymentMethod === 'upi') {
      if (!upiId.trim() || !upiId.includes('@')) {
        newErrors.upi = 'Please enter a valid UPI ID (e.g. name@upi)';
      }
    } else if (paymentMethod === 'card') {
      if (!cardData.cardNumber.trim() || cardData.cardNumber.length < 16) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }
      if (!cardData.expDate.trim()) {
        newErrors.expDate = 'Expiry Date is required';
      }
      if (!cardData.cvv.trim() || cardData.cvv.length < 3) {
        newErrors.cvv = 'Valid CVV is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Generate Order details
    const orderNumber = `CV2026${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Store simple success order in localStorage for confirmation screen
    const demoOrder = {
      orderNumber,
      total,
      fullName: formData.fullName,
      email: formData.email,
      date: new Date().toLocaleDateString('en-IN')
    };
    
    localStorage.setItem('last_chikanveda_order', JSON.stringify(demoOrder));
    
    // Clear cart and redirect
    clearCart();
    navigate('/order-success');
  };

  return (
    <div style={styles.page}>
      <div className="container">
        <h1 style={styles.title}>Checkout</h1>
        <p style={styles.subtitle}>Secure checkout processing — Please complete your details.</p>

        <form onSubmit={handlePlaceOrder} style={styles.grid}>
          {/* Billing & Shipping Form (Left) */}
          <div style={styles.formColumn}>
            
            {/* Delivery Details Block */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Shipping Details</h2>
              <div style={styles.cardDivider} />
              
              <div style={styles.formRow}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <p style={styles.error}>{errors.fullName}</p>}
                </div>
              </div>

              <div style={styles.formGrid}>
                <div className="form-group">
                  <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
                  <input
                    id="mobileNumber"
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="10-digit number"
                  />
                  {errors.mobileNumber && <p style={styles.error}>{errors.mobileNumber}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="name@email.com"
                  />
                  {errors.email && <p style={styles.error}>{errors.email}</p>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address" className="form-label">Street Address / House No.</label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Flat No, House No, Street name"
                />
                {errors.address && <p style={styles.error}>{errors.address}</p>}
              </div>

              <div style={styles.formGrid}>
                <div className="form-group">
                  <label htmlFor="landmark" className="form-label">Landmark (Optional)</label>
                  <input
                    id="landmark"
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Nearby landmark"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pinCode" className="form-label">PIN Code</label>
                  <input
                    id="pinCode"
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="6-digit pin code"
                  />
                  {errors.pinCode && <p style={styles.error}>{errors.pinCode}</p>}
                </div>
              </div>

              <div style={styles.formGrid}>
                <div className="form-group">
                  <label htmlFor="city" className="form-label">City</label>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter city"
                  />
                  {errors.city && <p style={styles.error}>{errors.city}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="state" className="form-label">State</label>
                  <input
                    id="state"
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter state"
                  />
                  {errors.state && <p style={styles.error}>{errors.state}</p>}
                </div>
              </div>
            </div>

            {/* Simulated Payment Methods */}
            <div style={{ ...styles.card, marginTop: '2rem' }}>
              <h2 style={styles.cardTitle}>Payment Method (Simulated Demo)</h2>
              <div style={styles.cardDivider} />

              <div style={styles.paymentSelector}>
                {/* Cash on Delivery */}
                <label style={{
                  ...styles.paymentOption,
                  borderColor: paymentMethod === 'cod' ? 'var(--color-navy)' : 'var(--color-border)',
                  backgroundColor: paymentMethod === 'cod' ? 'rgba(10, 25, 49, 0.02)' : 'transparent',
                }}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    style={styles.radio}
                  />
                  <div style={styles.paymentTextWrapper}>
                    <strong style={styles.paymentName}>Cash on Delivery (COD)</strong>
                    <span style={styles.paymentDesc}>Pay securely with cash upon delivery of items.</span>
                  </div>
                </label>

                {/* UPI (Simulated) */}
                <label style={{
                  ...styles.paymentOption,
                  borderColor: paymentMethod === 'upi' ? 'var(--color-navy)' : 'var(--color-border)',
                  backgroundColor: paymentMethod === 'upi' ? 'rgba(10, 25, 49, 0.02)' : 'transparent',
                }}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    style={styles.radio}
                  />
                  <div style={styles.paymentTextWrapper}>
                    <strong style={styles.paymentName}>UPI (Simulated)</strong>
                    <span style={styles.paymentDesc}>Pay using GPay, PhonePe or Paytm.</span>
                  </div>
                </label>
                
                {paymentMethod === 'upi' && (
                  <div style={styles.paymentSubform}>
                    <label className="form-label">Enter UPI ID</label>
                    <input
                      type="text"
                      placeholder="username@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="form-input"
                    />
                    {errors.upi && <p style={styles.error}>{errors.upi}</p>}
                  </div>
                )}

                {/* Debit/Credit Card (Simulated) */}
                <label style={{
                  ...styles.paymentOption,
                  borderColor: paymentMethod === 'card' ? 'var(--color-navy)' : 'var(--color-border)',
                  backgroundColor: paymentMethod === 'card' ? 'rgba(10, 25, 49, 0.02)' : 'transparent',
                }}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    style={styles.radio}
                  />
                  <div style={styles.paymentTextWrapper}>
                    <strong style={styles.paymentName}>Debit / Credit Card (Simulated)</strong>
                    <span style={styles.paymentDesc}>All major Indian cards supported.</span>
                  </div>
                </label>

                {paymentMethod === 'card' && (
                  <div style={styles.paymentSubform}>
                    <div className="form-group">
                      <label className="form-label">Card Number</label>
                      <input
                        type="text"
                        placeholder="4111 2222 3333 4444"
                        value={cardData.cardNumber}
                        onChange={(e) => setCardData({...cardData, cardNumber: e.target.value.replace(/\D/g, '').slice(0, 16)})}
                        className="form-input"
                      />
                      {errors.cardNumber && <p style={styles.error}>{errors.cardNumber}</p>}
                    </div>
                    
                    <div style={styles.formGrid}>
                      <div className="form-group">
                        <label className="form-label">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardData.expDate}
                          onChange={(e) => setCardData({...cardData, expDate: e.target.value.slice(0, 5)})}
                          className="form-input"
                        />
                        {errors.expDate && <p style={styles.error}>{errors.expDate}</p>}
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">CVV</label>
                        <input
                          type="password"
                          placeholder="123"
                          value={cardData.cvv}
                          onChange={(e) => setCardData({...cardData, cvv: e.target.value.replace(/\D/g, '').slice(0, 3)})}
                          className="form-input"
                        />
                        {errors.cvv && <p style={styles.error}>{errors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Checkout Order Summary (Right) */}
          <div style={styles.summaryColumn}>
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Order Summary</h2>
              <div style={styles.cardDivider} />

              <div style={styles.itemList}>
                {cart.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize}`} style={styles.summaryItem}>
                    <div style={styles.sumImgWrapper}>
                      <img src={item.product.images[0]} alt={item.product.name} style={styles.sumImg} />
                    </div>
                    <div style={styles.sumDetails}>
                      <h4 style={styles.sumName}>{item.product.name}</h4>
                      <span style={styles.sumMeta}>Size: {item.selectedSize} | Qty: {item.quantity}</span>
                    </div>
                    <span style={styles.sumPrice}>
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div style={styles.cardDivider} />

              <div style={styles.summaryRow}>
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              <div style={styles.summaryRow}>
                <span>Delivery</span>
                {shippingCost === 0 ? (
                  <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>FREE</span>
                ) : (
                  <span>₹{shippingCost}</span>
                )}
              </div>

              <div style={styles.cardDivider} />

              <div style={{ ...styles.summaryRow, fontSize: '1.15rem', color: 'var(--color-navy)', fontWeight: 700 }}>
                <span>Grand Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>

              <button type="submit" className="btn btn-primary" style={styles.placeOrderBtn}>
                <span>Place Order</span>
              </button>

              <div style={styles.lockRow}>
                <Lock size={14} color="var(--color-text-muted)" style={{ marginRight: '6px' }} />
                <span>Simulated Secure Checkout</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: 'var(--color-ivory)',
    padding: '3rem 0 6rem 0',
  },
  title: {
    fontSize: '2.5rem',
    color: 'var(--color-navy)',
    fontFamily: 'var(--font-serif)',
    marginBottom: '0.25rem',
  },
  subtitle: {
    fontSize: '0.95rem',
    color: 'var(--color-text-muted)',
    marginBottom: '3rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '3rem',
    alignItems: 'start',
  },
  formColumn: {
    gridColumn: 'span 2',
  },
  card: {
    backgroundColor: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    padding: '2.5rem 2rem',
    boxShadow: 'var(--shadow-subtle)',
  },
  cardTitle: {
    fontSize: '1.3rem',
    color: 'var(--color-navy)',
    fontFamily: 'var(--font-serif)',
  },
  cardDivider: {
    height: '1px',
    backgroundColor: 'var(--color-border)',
    margin: '1.25rem 0',
  },
  formRow: {
    display: 'flex',
    gap: '1rem',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
  },
  error: {
    color: 'var(--color-error)',
    fontSize: '0.75rem',
    marginTop: '0.25rem',
    fontWeight: 500,
  },
  paymentSelector: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  paymentOption: {
    display: 'flex',
    alignItems: 'flex-start',
    border: '1px solid var(--color-border)',
    padding: '1.25rem 1.5rem',
    cursor: 'pointer',
    transition: 'var(--transition-fast)',
  },
  radio: {
    accentColor: 'var(--color-navy)',
    marginTop: '4px',
    marginRight: '12px',
    width: '16px',
    height: '16px',
  },
  paymentTextWrapper: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  paymentName: {
    fontSize: '0.9rem',
    color: 'var(--color-navy)',
    marginBottom: '2px',
  },
  paymentDesc: {
    fontSize: '0.75rem',
    color: 'var(--color-text-muted)',
  },
  paymentSubform: {
    backgroundColor: '#FDFBF7',
    border: '1px solid var(--color-border)',
    padding: '1.5rem',
    marginTop: '-0.5rem',
    borderTop: 'none',
  },
  summaryColumn: {
    gridColumn: 'span 1',
  },
  itemList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
    maxHeight: '300px',
    overflowY: 'auto' as const,
    paddingRight: '4px',
  },
  summaryItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  sumImgWrapper: {
    width: '50px',
    height: '65px',
    backgroundColor: 'var(--color-cream)',
    flexShrink: 0,
    overflow: 'hidden',
  },
  sumImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  sumDetails: {
    flex: 1,
  },
  sumName: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--color-navy)',
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '150px',
  },
  sumMeta: {
    fontSize: '0.75rem',
    color: 'var(--color-text-muted)',
    display: 'block',
  },
  sumPrice: {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: 'var(--color-navy)',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
    marginBottom: '0.75rem',
  },
  placeOrderBtn: {
    width: '100%',
    height: '50px',
    marginTop: '1.5rem',
  },
  lockRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    color: 'var(--color-text-muted)',
    marginTop: '1rem',
  }
};
