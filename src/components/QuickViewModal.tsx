import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Star } from 'lucide-react';
import type { Product } from '../types';
import { useCartWishlist } from '../context/CartWishlistContext';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart, isInWishlist, addToWishlist, removeFromWishlist } = useCartWishlist();
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [validationError, setValidationError] = useState('');
  const [addedMessage, setAddedMessage] = useState('');

  const favorited = isInWishlist(product.id);
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleWishlistToggle = () => {
    if (favorited) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 1) {
      setValidationError('Please select a size before adding to bag.');
      return;
    }
    setValidationError('');
    
    // For Sarees or single sized, fallback to first size if empty
    const finalSize = selectedSize || product.sizes[0];
    addToCart(product, finalSize, quantity);
    
    setAddedMessage(`Successfully added ${quantity} item(s) to bag!`);
    setTimeout(() => {
      setAddedMessage('');
      onClose();
    }, 1500);
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button onClick={onClose} style={styles.closeBtn} aria-label="Close details">
          <X size={22} color="var(--color-navy)" />
        </button>

        <div style={styles.grid}>
          {/* Gallery Column (Left) */}
          <div style={styles.galleryCol}>
            <div style={styles.mainImgWrapper}>
              <img src={selectedImage} alt={product.name} style={styles.mainImg} />
            </div>
            
            {product.images.length > 1 && (
              <div style={styles.thumbRow}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    style={{
                      ...styles.thumbBtn,
                      borderColor: selectedImage === img ? 'var(--color-gold)' : 'var(--color-border)'
                    }}
                  >
                    <img src={img} alt={`${product.name} thumb ${idx + 1}`} style={styles.thumbImg} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column (Right) */}
          <div style={styles.detailsCol}>
            <span style={styles.category}>{product.category}</span>
            <h2 style={styles.name}>{product.name}</h2>

            {/* Rating */}
            <div style={styles.ratingRow}>
              <div style={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < Math.floor(product.rating) ? 'var(--color-gold)' : 'transparent'}
                    color="var(--color-gold)"
                  />
                ))}
              </div>
              <span style={styles.ratingText}>{product.rating} / 5.0</span>
            </div>

            {/* Prices */}
            <div style={styles.priceContainer}>
              <span style={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <>
                  <span style={styles.originalPrice}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  <span style={styles.discountBadge}>{discount}% OFF</span>
                </>
              )}
            </div>

            <div style={styles.divider} />

            <p style={styles.description}>{product.description}</p>

            {/* Size Selector */}
            {product.sizes.length > 1 && (
              <div style={styles.section}>
                <div style={styles.sectionHeader}>
                  <span style={styles.sectionTitle}>Select Size</span>
                </div>
                <div style={styles.sizesRow}>
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setValidationError('');
                      }}
                      style={{
                        ...styles.sizeBtn,
                        backgroundColor: selectedSize === size ? 'var(--color-navy)' : 'transparent',
                        color: selectedSize === size ? 'var(--color-ivory)' : 'var(--color-navy)',
                        borderColor: selectedSize === size ? 'var(--color-navy)' : 'var(--color-border)'
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {validationError && (
                  <p style={styles.errorText}>{validationError}</p>
                )}
              </div>
            )}

            {/* Quantity Selector */}
            <div style={styles.section}>
              <span style={styles.sectionTitle}>Quantity</span>
              <div style={styles.qtyRow}>
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={styles.qtyBtn}
                >
                  -
                </button>
                <span style={styles.qtyVal}>{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  style={styles.qtyBtn}
                >
                  +
                </button>
              </div>
            </div>

            {/* Added Alert */}
            {addedMessage && (
              <div style={styles.successAlert}>{addedMessage}</div>
            )}

            {/* Actions Buttons */}
            <div style={styles.actionRow}>
              <button onClick={handleAddToCart} style={styles.addBtn}>
                <ShoppingBag size={16} style={{ marginRight: '8px' }} />
                Add to Bag
              </button>
              
              <button onClick={handleWishlistToggle} style={styles.wishlistBtnAction}>
                <Heart size={18} fill={favorited ? 'var(--color-navy)' : 'transparent'} color="var(--color-navy)" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(10, 25, 49, 0.6)',
    backdropFilter: 'blur(3px)',
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
  },
  modal: {
    backgroundColor: '#FDFBF7',
    width: '100%',
    maxWidth: '900px',
    maxHeight: '90vh',
    overflowY: 'auto' as const,
    boxShadow: 'var(--shadow-luxury)',
    position: 'relative' as const,
    padding: '2.5rem 2rem',
    border: '1px solid var(--color-border)',
  },
  closeBtn: {
    position: 'absolute' as const,
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2.5rem',
  },
  galleryCol: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  mainImgWrapper: {
    width: '100%',
    paddingTop: '130%',
    position: 'relative' as const,
    backgroundColor: 'var(--color-cream)',
    overflow: 'hidden',
  },
  mainImg: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  thumbRow: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '0.75rem',
    overflowX: 'auto' as const,
  },
  thumbBtn: {
    width: '60px',
    height: '75px',
    padding: 0,
    border: '2px solid transparent',
    cursor: 'pointer',
    backgroundColor: 'var(--color-cream)',
  },
  thumbImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  detailsCol: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  category: {
    fontSize: '0.7rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.15em',
    color: 'var(--color-gold)',
    fontWeight: 600,
    marginBottom: '0.5rem',
  },
  name: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.75rem',
    color: 'var(--color-navy)',
    marginBottom: '0.75rem',
    lineHeight: '1.2',
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1.25rem',
  },
  stars: {
    display: 'flex',
    gap: '2px',
  },
  ratingText: {
    fontSize: '0.8rem',
    color: 'var(--color-text-muted)',
    fontWeight: 500,
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '0.75rem',
    marginBottom: '1.5rem',
  },
  price: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'var(--color-navy)',
  },
  originalPrice: {
    fontSize: '1.1rem',
    color: 'var(--color-text-muted)',
    textDecoration: 'line-through',
  },
  discountBadge: {
    fontSize: '0.75rem',
    fontWeight: 600,
    backgroundColor: 'var(--color-navy)',
    color: 'var(--color-ivory)',
    padding: '0.2rem 0.5rem',
    letterSpacing: '0.05em',
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--color-border)',
    margin: '1.5rem 0',
  },
  description: {
    fontSize: '0.9rem',
    lineHeight: '1.6',
    color: 'var(--color-text-muted)',
    marginBottom: '1.5rem',
  },
  section: {
    marginBottom: '1.5rem',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
  },
  sectionTitle: {
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    color: 'var(--color-navy)',
    display: 'block',
    marginBottom: '0.5rem',
  },
  sizesRow: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '0.5rem',
  },
  sizeBtn: {
    border: '1px solid var(--color-border)',
    minWidth: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'var(--transition-fast)',
  },
  qtyRow: {
    display: 'inline-flex',
    alignItems: 'center',
    border: '1px solid var(--color-border)',
    height: '40px',
  },
  qtyBtn: {
    border: 'none',
    background: 'none',
    width: '40px',
    height: '100%',
    cursor: 'pointer',
    fontSize: '1rem',
    color: 'var(--color-navy)',
  },
  qtyVal: {
    minWidth: '30px',
    textAlign: 'center' as const,
    fontSize: '0.9rem',
    fontWeight: 600,
  },
  errorText: {
    fontSize: '0.75rem',
    color: 'var(--color-error)',
    marginTop: '0.5rem',
    fontWeight: 500,
  },
  successAlert: {
    backgroundColor: '#E8F5E9',
    color: 'var(--color-success)',
    padding: '0.75rem',
    fontSize: '0.85rem',
    fontWeight: 500,
    marginBottom: '1rem',
    borderLeft: '3px solid var(--color-success)',
  },
  actionRow: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '2rem',
  },
  addBtn: {
    flex: 1,
    backgroundColor: 'var(--color-navy)',
    color: 'var(--color-white)',
    border: 'none',
    height: '50px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'var(--transition-fast)',
  },
  wishlistBtnAction: {
    backgroundColor: 'transparent',
    border: '1px solid var(--color-border)',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'var(--transition-fast)',
  }
};
