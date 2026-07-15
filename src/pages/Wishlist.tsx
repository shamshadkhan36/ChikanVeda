import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, X } from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';
import type { Product } from '../types';

export const Wishlist: React.FC = () => {
  const { wishlist, removeFromWishlist, moveToCart } = useCartWishlist();
  const [sizePickerProduct, setSizePickerProduct] = useState<Product | null>(null);

  const handleMoveToCartClick = (product: Product) => {
    if (product.category === 'Sarees' || product.sizes.length === 1) {
      // Sarees have one size, move immediately
      moveToCart(product, product.sizes[0]);
    } else {
      // Suits require size, open mini modal
      setSizePickerProduct(product);
    }
  };

  const handleSizeSelect = (size: string) => {
    if (sizePickerProduct) {
      moveToCart(sizePickerProduct, size);
      setSizePickerProduct(null);
    }
  };

  if (wishlist.length === 0) {
    return (
      <div className="container" style={styles.emptyContainer}>
        <Heart size={48} color="var(--color-gold)" style={{ marginBottom: '1.5rem' }} />
        <h2 style={styles.emptyTitle}>Your wishlist is empty.</h2>
        <p style={styles.emptyText}>Save your favorite handcrafted heritage styles here to review them later.</p>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '2rem' }}>
          <span>Discover Collection</span>
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div className="container">
        <h1 style={styles.title}>Your Wishlist</h1>
        <p style={styles.subtitle}>A collection of your favorite Lucknowi heritage styles.</p>

        <div style={styles.grid}>
          {wishlist.map((product) => {
            const discount = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <div key={product.id} style={styles.card}>
                {/* Image Box */}
                <div style={styles.imgBox}>
                  <img src={product.images[0]} alt={product.name} style={styles.image} />
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    style={styles.deleteBtn}
                    aria-label="Remove from wishlist"
                  >
                    <X size={16} color="var(--color-navy)" />
                  </button>
                  
                  {discount > 0 && (
                    <span style={styles.discountBadge}>{discount}% OFF</span>
                  )}
                </div>

                {/* Info */}
                <div style={styles.info}>
                  <span style={styles.category}>{product.category}</span>
                  <h3 style={styles.name}>
                    <Link to={`/product/${product.slug}`}>{product.name}</Link>
                  </h3>
                  
                  <div style={styles.priceRow}>
                    <span style={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>
                    {product.originalPrice && (
                      <span style={styles.originalPrice}>
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                {/* CTA actions */}
                <div style={styles.actions}>
                  <button
                    onClick={() => handleMoveToCartClick(product)}
                    style={styles.moveToCartBtn}
                  >
                    <ShoppingBag size={14} style={{ marginRight: '6px' }} />
                    Move to Bag
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mini Size Selector Modal for Suits */}
      {sizePickerProduct && (
        <div style={styles.modalOverlay} onClick={() => setSizePickerProduct(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Select Size</h3>
              <button onClick={() => setSizePickerProduct(null)} style={styles.modalCloseBtn}>
                <X size={18} />
              </button>
            </div>
            
            <p style={styles.modalText}>Please select a size for <strong>{sizePickerProduct.name}</strong>:</p>
            
            <div style={styles.sizesGrid}>
              {sizePickerProduct.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  style={styles.sizeBtn}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '2rem',
  },
  card: {
    backgroundColor: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    boxShadow: 'var(--shadow-subtle)',
    display: 'flex',
    flexDirection: 'column' as const,
    position: 'relative' as const,
  },
  imgBox: {
    position: 'relative' as const,
    width: '100%',
    paddingTop: '130%',
    backgroundColor: 'var(--color-cream)',
  },
  image: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  deleteBtn: {
    position: 'absolute' as const,
    top: '10px',
    right: '10px',
    backgroundColor: 'rgba(253, 251, 247, 0.9)',
    border: 'none',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 5,
  },
  discountBadge: {
    position: 'absolute' as const,
    top: '10px',
    left: '10px',
    backgroundColor: 'var(--color-navy)',
    color: 'var(--color-ivory)',
    padding: '0.2rem 0.5rem',
    fontSize: '0.7rem',
    fontWeight: 600,
  },
  info: {
    padding: '1.25rem 1rem',
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
  },
  category: {
    fontSize: '0.65rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.12em',
    color: 'var(--color-gold)',
    fontWeight: 600,
    marginBottom: '4px',
  },
  name: {
    fontSize: '0.95rem',
    fontWeight: 500,
    color: 'var(--color-navy)',
    fontFamily: 'var(--font-sans)',
    marginBottom: '6px',
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: 'auto',
  },
  price: {
    fontSize: '0.95rem',
    fontWeight: 700,
    color: 'var(--color-navy)',
  },
  originalPrice: {
    fontSize: '0.85rem',
    color: 'var(--color-text-muted)',
    textDecoration: 'line-through',
  },
  actions: {
    padding: '0 1rem 1rem 1rem',
  },
  moveToCartBtn: {
    width: '100%',
    border: 'none',
    backgroundColor: 'var(--color-navy)',
    color: 'var(--color-white)',
    padding: '0.75rem',
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'var(--transition-fast)',
  },
  modalOverlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(10, 25, 49, 0.4)',
    backdropFilter: 'blur(2px)',
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#FDFBF7',
    border: '1px solid var(--color-border)',
    width: '100%',
    maxWidth: '350px',
    padding: '2rem 1.5rem',
    boxShadow: 'var(--shadow-luxury)',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  modalTitle: {
    fontSize: '1.2rem',
    fontFamily: 'var(--font-serif)',
  },
  modalCloseBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  modalText: {
    fontSize: '0.85rem',
    color: 'var(--color-text-muted)',
    marginBottom: '1.25rem',
  },
  sizesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '8px',
  },
  sizeBtn: {
    border: '1px solid var(--color-border)',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    fontWeight: 600,
    cursor: 'pointer',
    backgroundColor: 'transparent',
    transition: 'var(--transition-fast)',
    ':hover': {
      borderColor: 'var(--color-navy)',
      color: 'var(--color-navy)'
    }
  }
};
