import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';

export const Cart: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart } = useCartWishlist();
  const navigate = useNavigate();

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Demo Shipping
  const shippingThreshold = 1999;
  const shippingCost = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 150;
  const total = subtotal + shippingCost;

  if (cart.length === 0) {
    return (
      <div className="container" style={styles.emptyContainer}>
        <ShoppingBag size={48} color="var(--color-gold)" style={{ marginBottom: '1.5rem' }} />
        <h2 style={styles.emptyTitle}>Your shopping bag is waiting.</h2>
        <p style={styles.emptyText}>There are no items in your shopping bag yet. Explore our handcrafted heritage designs.</p>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '2rem' }}>
          <span>Explore Collection</span>
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div className="container">
        <h1 style={styles.title}>Your Shopping Bag</h1>
        <p style={styles.subtitle}>Review your selected handcrafted styles before checking out.</p>

        <div style={styles.cartGrid}>
          {/* Cart Items List (Left) */}
          <div style={styles.itemsColumn}>
            {cart.map((item) => {
              return (
                <div key={`${item.product.id}-${item.selectedSize}`} style={styles.cartCard}>
                  {/* Image */}
                  <div style={styles.imgWrapper}>
                    <img src={item.product.images[0]} alt={item.product.name} style={styles.image} />
                  </div>

                  {/* Details */}
                  <div style={styles.itemDetails}>
                    <div style={styles.itemHeader}>
                      <div>
                        <span style={styles.itemCategory}>{item.product.category}</span>
                        <h3 style={styles.itemName}>
                          <Link to={`/product/${item.product.slug}`}>{item.product.name}</Link>
                        </h3>
                        <span style={styles.itemSize}>Size: <strong>{item.selectedSize}</strong></span>
                      </div>
                      
                      {/* Price */}
                      <div style={styles.priceCol}>
                        <span style={styles.itemPrice}>₹{item.product.price.toLocaleString('en-IN')}</span>
                        {item.product.originalPrice && (
                          <span style={styles.itemOriginalPrice}>
                            ₹{item.product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>

                    <div style={styles.itemFooter}>
                      {/* Qty Selector */}
                      <div style={styles.qtyBox}>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                          style={styles.qtyBtn}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span style={styles.qtyVal}>{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                          style={styles.qtyBtn}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                        style={styles.removeBtn}
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} style={{ marginRight: '6px' }} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary Panel (Right) */}
          <div style={styles.summaryColumn}>
            <div style={styles.summaryCard}>
              <h3 style={styles.summaryTitle}>Order Summary</h3>
              <div style={styles.summaryDivider} />

              <div style={styles.summaryRow}>
                <span>Subtotal ({totalQuantity} items)</span>
                <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
              </div>

              <div style={styles.summaryRow}>
                <span>Delivery</span>
                {subtotal >= shippingThreshold ? (
                  <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>FREE</span>
                ) : (
                  <span>Calculated at checkout</span>
                )}
              </div>

              {subtotal < shippingThreshold && (
                <div style={styles.shippingNotice}>
                  Add <strong>₹{(shippingThreshold - subtotal).toLocaleString('en-IN')}</strong> more for FREE shipping.
                </div>
              )}

              <div style={styles.summaryDivider} />

              <div style={{ ...styles.summaryRow, fontSize: '1.15rem', color: 'var(--color-navy)' }}>
                <span>Total</span>
                <strong>₹{total.toLocaleString('en-IN')}</strong>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="btn btn-primary"
                style={styles.checkoutBtn}
              >
                <span>Proceed To Checkout</span>
              </button>

              <div style={styles.infoBox}>
                <p style={styles.infoText}>We support Cash on Delivery, UPI Payments, and major Debit/Credit Cards inside India.</p>
              </div>
            </div>
          </div>
        </div>
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
  emptyContainer: {
    textAlign: 'center' as const,
    padding: '8rem 1rem',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: '1.8rem',
    color: 'var(--color-navy)',
    fontFamily: 'var(--font-serif)',
    marginBottom: '0.75rem',
  },
  emptyText: {
    fontSize: '0.95rem',
    color: 'var(--color-text-muted)',
    maxWidth: '480px',
    lineHeight: '1.6',
  },
  cartGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '3rem',
    alignItems: 'start',
  },
  itemsColumn: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem',
    gridColumn: 'span 2',
  },
  cartCard: {
    display: 'flex',
    backgroundColor: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    padding: '1.5rem',
    gap: '1.5rem',
    boxShadow: 'var(--shadow-subtle)',
  },
  imgWrapper: {
    width: '100px',
    height: '130px',
    backgroundColor: 'var(--color-cream)',
    flexShrink: 0,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  itemDetails: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
    flex: 1,
  },
  itemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '1rem',
  },
  itemCategory: {
    fontSize: '0.65rem',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    color: 'var(--color-gold)',
    display: 'block',
    marginBottom: '2px',
  },
  itemName: {
    fontSize: '1.05rem',
    fontWeight: 600,
    color: 'var(--color-navy)',
    fontFamily: 'var(--font-sans)',
    marginBottom: '6px',
    lineHeight: '1.3',
  },
  itemSize: {
    fontSize: '0.8rem',
    color: 'var(--color-text-muted)',
  },
  priceCol: {
    textAlign: 'right' as const,
    flexShrink: 0,
  },
  itemPrice: {
    fontSize: '1.05rem',
    fontWeight: 700,
    color: 'var(--color-navy)',
    display: 'block',
  },
  itemOriginalPrice: {
    fontSize: '0.85rem',
    color: 'var(--color-text-muted)',
    textDecoration: 'line-through',
    display: 'block',
  },
  itemFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1rem',
  },
  qtyBox: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid var(--color-border)',
    height: '34px',
  },
  qtyBtn: {
    background: 'none',
    border: 'none',
    width: '30px',
    height: '100%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-navy)',
  },
  qtyVal: {
    minWidth: '24px',
    textAlign: 'center' as const,
    fontSize: '0.85rem',
    fontWeight: 600,
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--color-text-muted)',
    fontSize: '0.8rem',
    fontWeight: 500,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'var(--transition-fast)',
    ':hover': {
      color: 'var(--color-error)'
    }
  },
  summaryColumn: {
    gridColumn: 'span 1',
  },
  summaryCard: {
    backgroundColor: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    padding: '2rem',
    boxShadow: 'var(--shadow-subtle)',
  },
  summaryTitle: {
    fontSize: '1.3rem',
    color: 'var(--color-navy)',
    fontFamily: 'var(--font-serif)',
  },
  summaryDivider: {
    height: '1px',
    backgroundColor: 'var(--color-border)',
    margin: '1.25rem 0',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
    color: 'var(--color-text-dark)',
    marginBottom: '1rem',
  },
  shippingNotice: {
    fontSize: '0.75rem',
    backgroundColor: 'var(--color-cream)',
    padding: '0.6rem 0.8rem',
    color: 'var(--color-navy)',
    marginTop: '0.5rem',
    marginBottom: '1.25rem',
  },
  checkoutBtn: {
    width: '100%',
    height: '50px',
    marginTop: '1.5rem',
  },
  infoBox: {
    borderTop: '1px solid var(--color-border)',
    paddingTop: '1.25rem',
    marginTop: '1.5rem',
  },
  infoText: {
    fontSize: '0.75rem',
    color: 'var(--color-text-muted)',
    lineHeight: '1.5',
    textAlign: 'center' as const,
  }
};
