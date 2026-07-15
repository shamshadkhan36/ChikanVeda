import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import type { Product } from '../types';
import { useCartWishlist } from '../context/CartWishlistContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist, addToCart } = useCartWishlist();
  const [showSizePicker, setShowSizePicker] = useState(false);
  const [addedMessage, setAddedMessage] = useState(false);

  const favorited = isInWishlist(product.id);
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorited) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.category === 'Sarees' || product.sizes.length === 1) {
      // Sarees only have "One Size", add directly
      addToCart(product, product.sizes[0]);
      triggerAddedFeedback();
    } else {
      // Suits require size selection, show internal picker
      setShowSizePicker(true);
    }
  };

  const handleSizeSelect = (e: React.MouseEvent, size: string) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, size);
    setShowSizePicker(false);
    triggerAddedFeedback();
  };

  const triggerAddedFeedback = () => {
    setAddedMessage(true);
    setTimeout(() => {
      setAddedMessage(false);
    }, 2000);
  };

  return (
    <div style={styles.cardContainer}>
      <Link to={`/product/${product.slug}`} style={styles.cardLink}>
        {/* Product Image Container */}
        <div className="aspect-ratio-box" style={styles.imgWrapper}>
          {/* Badge Display */}
          <div style={styles.badgeContainer}>
            {product.isNew && (
              <span className="badge badge-new" style={styles.badgeItem}>New</span>
            )}
            {discount > 0 && (
              <span className="badge badge-discount" style={styles.badgeItem}>{discount}% OFF</span>
            )}
          </div>

          {/* Wishlist Toggle Button */}
          <button
            onClick={handleWishlistToggle}
            style={styles.wishlistBtn}
            aria-label={favorited ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart 
              size={18} 
              fill={favorited ? "var(--color-navy)" : "transparent"} 
              color={favorited ? "var(--color-navy)" : "var(--color-text-dark)"} 
            />
          </button>

          {/* Product Image */}
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            style={styles.image}
          />

          {/* Desktop Overlay: Quick View & Quick Add */}
          <div className="quick-view-overlay" onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onQuickView(product);
          }}>
            <span style={styles.overlayText}>
              <Eye size={14} style={{ marginRight: '6px' }} />
              Quick View
            </span>
          </div>

          {/* Direct size selector overlay */}
          {showSizePicker && (
            <div style={styles.sizePickerOverlay} onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowSizePicker(false);
            }}>
              <div style={styles.sizePickerContent}>
                <span style={styles.sizePickerTitle}>Select Size</span>
                <div style={styles.sizeBtnGrid}>
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={(e) => handleSizeSelect(e, size)}
                      style={styles.sizeSelectBtn}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowSizePicker(false);
                  }}
                  style={styles.cancelSizeBtn}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Product Information */}
        <div style={styles.info}>
          <span style={styles.category}>{product.category}</span>
          <h3 style={styles.name}>{product.name}</h3>
          
          <div style={styles.priceRow}>
            <span style={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <span style={styles.originalPrice}>
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Add To Cart CTA Button */}
      <div style={styles.actionContainer}>
        <button 
          onClick={handleAddClick} 
          style={{
            ...styles.addToCartBtn,
            backgroundColor: addedMessage ? 'var(--color-gold)' : 'var(--color-navy)',
            color: addedMessage ? 'var(--color-navy)' : 'var(--color-white)'
          }}
        >
          <ShoppingBag size={14} style={{ marginRight: '8px' }} />
          {addedMessage ? 'ADDED TO BAG' : 'ADD TO BAG'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  cardContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    transition: 'var(--transition-smooth)',
    position: 'relative' as const,
    overflow: 'hidden',
  },
  cardLink: {
    display: 'block',
    flex: 1,
  },
  imgWrapper: {
    position: 'relative' as const,
    width: '100%',
    backgroundColor: 'var(--color-cream)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    display: 'block',
    transition: 'transform 0.8s ease',
  },
  badgeContainer: {
    position: 'absolute' as const,
    top: '12px',
    left: '12px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
    zIndex: 5,
  },
  badgeItem: {
    boxShadow: '0 2px 5px rgba(10, 25, 49, 0.05)',
  },
  wishlistBtn: {
    position: 'absolute' as const,
    top: '12px',
    right: '12px',
    backgroundColor: 'rgba(253, 251, 247, 0.9)',
    border: 'none',
    width: '34px',
    height: '34px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 5,
    transition: 'var(--transition-fast)',
  },
  overlayText: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    padding: '1.25rem 1rem 0.5rem 1rem',
    textAlign: 'center' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
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
    fontFamily: 'var(--font-sans)', // standard UI typeface for lists
    color: 'var(--color-navy)',
    margin: '4px 0 6px 0',
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '2px',
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
  actionContainer: {
    padding: '0 1rem 1rem 1rem',
  },
  addToCartBtn: {
    width: '100%',
    border: 'none',
    padding: '0.75rem',
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'var(--transition-fast)',
  },
  sizePickerOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(253, 251, 247, 0.98)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
    padding: '1rem',
  },
  sizePickerContent: {
    textAlign: 'center' as const,
    width: '100%',
  },
  sizePickerTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1rem',
    fontWeight: 600,
    color: 'var(--color-navy)',
    display: 'block',
    marginBottom: '1rem',
  },
  sizeBtnGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '6px',
    marginBottom: '1rem',
  },
  sizeSelectBtn: {
    backgroundColor: 'transparent',
    border: '1px solid var(--color-navy)',
    color: 'var(--color-navy)',
    padding: '0.5rem 0',
    fontSize: '0.75rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'var(--transition-fast)',
  },
  cancelSizeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '0.75rem',
    color: 'var(--color-text-muted)',
    textDecoration: 'underline',
    cursor: 'pointer',
    marginTop: '0.5rem',
  }
};
