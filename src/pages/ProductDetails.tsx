import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Send, Star, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { products } from '../data/products';
import { useCartWishlist } from '../context/CartWishlistContext';
import { ProductCard } from '../components/ProductCard';
import { brandConfig } from '../config/brand';

export const ProductDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart, isInWishlist, addToWishlist, removeFromWishlist } = useCartWishlist();

  // Find product by slug
  const product = products.find((p) => p.slug === slug);

  // States
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [validationError, setValidationError] = useState('');
  const [addedMessage, setAddedMessage] = useState('');
  const [openAccordion, setOpenAccordion] = useState<string>('details');

  // Related products (same category, excluding current product, max 4)
  const relatedProducts = product
    ? products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];

  // Reset states on product slug change
  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
      setSelectedSize('');
      setQuantity(1);
      setValidationError('');
      setAddedMessage('');
      window.scrollTo(0, 0);
    }
  }, [slug, product]);

  if (!product) {
    return (
      <div className="container" style={styles.notFoundContainer}>
        <h2 style={styles.notFoundTitle}>Product Not Found</h2>
        <p style={styles.notFoundText}>We could not find the style you are looking for.</p>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          <span>Back to Shop</span>
        </Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const favorited = isInWishlist(product.id);

  const handleWishlistToggle = () => {
    if (favorited) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const validateSelection = () => {
    if (!selectedSize && product.sizes.length > 1) {
      setValidationError('Please select a size to proceed.');
      return false;
    }
    setValidationError('');
    return true;
  };

  const handleAddToCart = () => {
    if (!validateSelection()) return;
    const finalSize = selectedSize || product.sizes[0];
    addToCart(product, finalSize, quantity);
    setAddedMessage(`Successfully added ${quantity} item(s) to bag!`);
    setTimeout(() => setAddedMessage(''), 3000);
  };

  const handleBuyNow = () => {
    if (!validateSelection()) return;
    const finalSize = selectedSize || product.sizes[0];
    addToCart(product, finalSize, quantity);
    navigate('/checkout');
  };

  const handleWhatsAppEnquiry = () => {
    const formattedNumber = brandConfig.whatsappNumber.replace('+', '').replace(/\s/g, '');
    const sizeText = selectedSize ? ` (Size: ${selectedSize})` : '';
    const message = `Hello ChikanVeda, I am interested in ordering the "${product.name}"${sizeText} priced at ₹${product.price}. Link: ${window.location.href}`;
    window.open(`https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? '' : section);
  };

  return (
    <div style={styles.page}>
      <div className="container">
        {/* Back Link */}
        <Link to="/shop" style={styles.backLink}>
          <ArrowLeft size={16} /> Back to All Collections
        </Link>

        {/* Product Grid */}
        <div style={styles.productGrid}>
          {/* Images Section (Left) */}
          <div style={styles.galleryWrapper}>
            <div style={styles.mainImgBox}>
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
                    <img src={img} alt={`Thumb ${idx + 1}`} style={styles.thumbImg} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section (Right) */}
          <div style={styles.detailsWrapper}>
            <span style={styles.category}>{product.category}</span>
            <h1 style={styles.name}>{product.name}</h1>

            {/* Rating */}
            <div style={styles.ratingRow}>
              <div style={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(product.rating) ? 'var(--color-gold)' : 'transparent'}
                    color="var(--color-gold)"
                  />
                ))}
              </div>
              <span style={styles.ratingText}>{product.rating} / 5.0 (Customer Review Rating)</span>
            </div>

            {/* Pricing */}
            <div style={styles.priceContainer}>
              <span style={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <>
                  <span style={styles.originalPrice}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  <span style={styles.discountBadge}>{discount}% OFF</span>
                </>
              )}
            </div>

            <p style={styles.shortDesc}>{product.description}</p>

            <div style={styles.divider} />

            {/* Size Selector */}
            {product.sizes.length > 1 && (
              <div style={styles.section}>
                <div style={styles.sectionHeader}>
                  <span style={styles.sectionLabel}>Select Size</span>
                  <span style={styles.sizeGuideLink}>Size Guide</span>
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
              <span style={styles.sectionLabel}>Quantity</span>
              <div style={styles.qtyRow}>
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} style={styles.qtyBtn}>-</button>
                <span style={styles.qtyVal}>{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)} style={styles.qtyBtn}>+</button>
              </div>
            </div>

            {/* Success Notification */}
            {addedMessage && (
              <div style={styles.successNotification}>{addedMessage}</div>
            )}

            {/* Action CTAs */}
            <div style={styles.actionsGrid}>
              <button onClick={handleAddToCart} style={styles.addBtn}>
                <ShoppingBag size={18} style={{ marginRight: '8px' }} />
                Add to Bag
              </button>

              <button onClick={handleBuyNow} style={styles.buyBtn}>
                Buy Now
              </button>

              <button onClick={handleWishlistToggle} style={styles.wishlistBtn}>
                <Heart size={20} fill={favorited ? 'var(--color-navy)' : 'transparent'} color="var(--color-navy)" />
                <span>{favorited ? 'In Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

            {/* WhatsApp Enquiry Button */}
            <button onClick={handleWhatsAppEnquiry} style={styles.whatsappBtn}>
              <Send size={16} style={{ marginRight: '8px' }} />
              Enquire on WhatsApp
            </button>

            {/* Details Accordion Blocks */}
            <div style={styles.accordionContainer}>
              {/* Product Details */}
              <div className="accordion">
                <button onClick={() => toggleAccordion('details')} className="accordion-header">
                  <span>Product Details</span>
                  {openAccordion === 'details' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <div className={`accordion-content ${openAccordion === 'details' ? 'open' : ''}`}>
                  <ul style={styles.bullets}>
                    {product.details.map((detail, idx) => <li key={idx} style={styles.bulletItem}>{detail}</li>)}
                  </ul>
                </div>
              </div>

              {/* Fabric & Care */}
              <div className="accordion">
                <button onClick={() => toggleAccordion('fabric')} className="accordion-header">
                  <span>Fabric & Care</span>
                  {openAccordion === 'fabric' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <div className={`accordion-content ${openAccordion === 'fabric' ? 'open' : ''}`}>
                  <ul style={styles.bullets}>
                    {product.fabricCare.map((care, idx) => <li key={idx} style={styles.bulletItem}>{care}</li>)}
                  </ul>
                </div>
              </div>

              {/* Shipping */}
              <div className="accordion">
                <button onClick={() => toggleAccordion('shipping')} className="accordion-header">
                  <span>Shipping Information</span>
                  {openAccordion === 'shipping' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <div className={`accordion-content ${openAccordion === 'shipping' ? 'open' : ''}`}>
                  <p style={styles.accordionBodyText}>{product.shippingInfo}</p>
                </div>
              </div>

              {/* Returns */}
              <div className="accordion">
                <button onClick={() => toggleAccordion('returns')} className="accordion-header">
                  <span>Return & Exchange</span>
                  {openAccordion === 'returns' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <div className={`accordion-content ${openAccordion === 'returns' ? 'open' : ''}`}>
                  <p style={styles.accordionBodyText}>{product.returnPolicy}</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section style={styles.relatedSection}>
            <div style={styles.relatedHeader}>
              <h2 style={styles.relatedTitle}>You May Also Love</h2>
              <div className="divider-gold-center" />
            </div>
            <div style={styles.relatedGrid}>
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onQuickView={() => {}} // Simple mock on click for related items
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: 'var(--color-ivory)',
    padding: '2rem 0 6rem 0',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.8rem',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    color: 'var(--color-text-muted)',
    marginBottom: '2rem',
  },
  notFoundContainer: {
    textAlign: 'center' as const,
    padding: '8rem 1rem',
  },
  notFoundTitle: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
  },
  notFoundText: {
    fontSize: '0.95rem',
    color: 'var(--color-text-muted)',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '4rem',
  },
  galleryWrapper: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  mainImgBox: {
    position: 'relative' as const,
    width: '100%',
    paddingTop: '130%',
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
    gap: '0.75rem',
    marginTop: '1rem',
    overflowX: 'auto' as const,
  },
  thumbBtn: {
    width: '70px',
    height: '90px',
    padding: 0,
    backgroundColor: 'var(--color-cream)',
    border: '2px solid transparent',
    cursor: 'pointer',
  },
  thumbImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  detailsWrapper: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  category: {
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    color: 'var(--color-gold)',
    marginBottom: '0.5rem',
  },
  name: {
    fontFamily: 'var(--font-serif)',
    fontSize: '2.5rem',
    color: 'var(--color-navy)',
    lineHeight: '1.15',
    marginBottom: '0.75rem',
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1.5rem',
  },
  stars: {
    display: 'flex',
    gap: '2px',
  },
  ratingText: {
    fontSize: '0.85rem',
    color: 'var(--color-text-muted)',
    fontWeight: 500,
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  price: {
    fontSize: '1.8rem',
    fontWeight: 700,
    color: 'var(--color-navy)',
  },
  originalPrice: {
    fontSize: '1.25rem',
    color: 'var(--color-text-muted)',
    textDecoration: 'line-through',
  },
  discountBadge: {
    fontSize: '0.8rem',
    fontWeight: 600,
    backgroundColor: 'var(--color-navy)',
    color: 'var(--color-ivory)',
    padding: '0.25rem 0.6rem',
    letterSpacing: '0.05em',
  },
  shortDesc: {
    fontSize: '0.95rem',
    lineHeight: '1.7',
    color: 'var(--color-text-muted)',
    marginBottom: '1.5rem',
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--color-border)',
    margin: '1.5rem 0',
  },
  section: {
    marginBottom: '2rem',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem',
  },
  sectionLabel: {
    fontSize: '0.8rem',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    color: 'var(--color-navy)',
  },
  sizeGuideLink: {
    fontSize: '0.75rem',
    color: 'var(--color-text-muted)',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  sizesRow: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '0.75rem',
  },
  sizeBtn: {
    width: '46px',
    height: '46px',
    border: '1px solid var(--color-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.85rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'var(--transition-fast)',
  },
  qtyRow: {
    display: 'inline-flex',
    alignItems: 'center',
    border: '1px solid var(--color-border)',
    height: '46px',
  },
  qtyBtn: {
    border: 'none',
    background: 'none',
    width: '46px',
    height: '100%',
    cursor: 'pointer',
    fontSize: '1.1rem',
  },
  qtyVal: {
    minWidth: '40px',
    textAlign: 'center' as const,
    fontSize: '0.95rem',
    fontWeight: 600,
  },
  errorText: {
    fontSize: '0.8rem',
    color: 'var(--color-error)',
    marginTop: '0.75rem',
    fontWeight: 500,
  },
  successNotification: {
    backgroundColor: '#E8F5E9',
    color: 'var(--color-success)',
    padding: '1rem',
    fontSize: '0.9rem',
    fontWeight: 500,
    marginBottom: '1.5rem',
    borderLeft: '4px solid var(--color-success)',
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
    gap: '0.75rem',
    marginBottom: '1rem',
  },
  addBtn: {
    backgroundColor: 'var(--color-navy)',
    color: 'var(--color-white)',
    border: 'none',
    height: '54px',
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
  buyBtn: {
    backgroundColor: 'var(--color-gold)',
    color: 'var(--color-navy)',
    border: 'none',
    height: '54px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    transition: 'var(--transition-fast)',
  },
  wishlistBtn: {
    backgroundColor: 'transparent',
    border: '1px solid var(--color-border)',
    height: '54px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--color-navy)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'var(--transition-fast)',
  },
  whatsappBtn: {
    width: '100%',
    height: '50px',
    backgroundColor: '#25D366',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2rem',
    boxShadow: '0 4px 10px rgba(37, 211, 102, 0.15)',
  },
  accordionContainer: {
    marginTop: '1rem',
    borderTop: '1px solid var(--color-border)',
  },
  bullets: {
    listStyleType: 'disc',
    paddingLeft: '1.25rem',
  },
  bulletItem: {
    fontSize: '0.85rem',
    color: 'var(--color-text-muted)',
    marginBottom: '4px',
  },
  accordionBodyText: {
    fontSize: '0.85rem',
    lineHeight: '1.6',
    color: 'var(--color-text-muted)',
  },
  relatedSection: {
    marginTop: '6rem',
    borderTop: '1px solid var(--color-border)',
    paddingTop: '4rem',
  },
  relatedHeader: {
    textAlign: 'center' as const,
    marginBottom: '3rem',
  },
  relatedTitle: {
    fontSize: '1.8rem',
    color: 'var(--color-navy)',
    fontFamily: 'var(--font-serif)',
  },
  relatedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '2rem',
  }
};
