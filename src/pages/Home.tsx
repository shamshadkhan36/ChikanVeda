import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Award, ShieldCheck, MapPin, Headphones } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import type { Product } from '../types';

export const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'Suits' | 'Sarees' | 'New'>('All');
  const [selectedProductForQuickView, setSelectedProductForQuickView] = useState<Product | null>(null);

  // Filter products based on activeTab
  const filteredProducts = products.filter((product) => {
    if (activeTab === 'All') return product.isFeatured;
    if (activeTab === 'Suits') return product.category === 'Suits' && product.isFeatured;
    if (activeTab === 'Sarees') return product.category === 'Sarees' && product.isFeatured;
    if (activeTab === 'New') return product.isNew;
    return true;
  }).slice(0, 8); // Display top 8 on Home

  // Get New Arrivals (filtered by isNew)
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);

  return (
    <div style={styles.page}>
      {/* 1. Campaign Hero Section */}
      <section style={styles.heroSection} className="hero-container">
        <div style={styles.heroImageWrapper}>
          <img
            src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1400&auto=format&fit=crop"
            alt="ChikanVeda Campaign Cover"
            style={styles.heroImage}
          />
          <div style={styles.heroOverlay} />
        </div>
        <div className="container" style={styles.heroContentWrapper}>
          <div style={styles.heroTextContainer} className="animate-fade-in">
            <span style={styles.heroTagline}>Lucknowi Handcrafted Heritage</span>
            <h1 style={styles.heroTitle}>Timeless Elegance,<br />Woven With Heritage</h1>
            <p style={styles.heroSubtitle}>
              Discover graceful ethnic wear inspired by the timeless artistry and elegance of Lucknow.
            </p>
            <div style={styles.heroBtnGroup}>
              <Link to="/suits" className="btn btn-gold" style={styles.heroBtn}>
                Shop Suits
              </Link>
              <Link to="/sarees" className="btn btn-outline-gold" style={styles.heroBtn}>
                Explore Sarees
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Shop By Collection */}
      <section style={styles.sectionPadding}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Shop By Collection</h2>
            <div className="divider-gold-center" />
            <p style={styles.sectionSubtitle}>Discover styles created for moments of grace.</p>
          </div>

          <div style={styles.collectionsGrid}>
            {/* Collection 1: Suits */}
            <div style={styles.collectionCard} className="collection-hover-card">
              <div style={styles.collectionImgWrapper}>
                <img
                  src="https://images.unsplash.com/photo-1605697040389-16d0a0ee3e89?q=80&w=800&auto=format&fit=crop"
                  alt="Elegant Suits Collection"
                  style={styles.collectionImg}
                />
                <div style={styles.collectionOverlay} />
              </div>
              <div style={styles.collectionTextWrapper}>
                <h3 style={styles.collectionCardTitle}>Elegant Suits</h3>
                <p style={styles.collectionCardText}>Graceful silhouettes designed for timeless elegance.</p>
                <Link to="/suits" className="btn-text" style={{ color: '#FCF8F3' }}>
                  Explore Suits <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Collection 2: Sarees */}
            <div style={styles.collectionCard} className="collection-hover-card">
              <div style={styles.collectionImgWrapper}>
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop"
                  alt="Timeless Sarees Collection"
                  style={styles.collectionImg}
                />
                <div style={styles.collectionOverlay} />
              </div>
              <div style={styles.collectionTextWrapper}>
                <h3 style={styles.collectionCardTitle}>Timeless Sarees</h3>
                <p style={styles.collectionCardText}>Traditional beauty expressed through every graceful drape.</p>
                <Link to="/sarees" className="btn-text" style={{ color: '#FCF8F3' }}>
                  Explore Sarees <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Products (Handpicked For You) */}
      <section style={{ ...styles.sectionPadding, backgroundColor: '#F9F5F0' }}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Handpicked For You</h2>
            <div className="divider-gold-center" />
            <p style={styles.sectionSubtitle}>A curated selection of timeless styles.</p>
          </div>

          {/* Filtering Tabs */}
          <div style={styles.tabsRow}>
            {(['All', 'Suits', 'Sarees', 'New'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  ...styles.tabBtn,
                  color: activeTab === tab ? 'var(--color-navy)' : 'var(--color-text-muted)',
                  borderBottom: activeTab === tab ? '2px solid var(--color-gold)' : '2px solid transparent',
                  fontWeight: activeTab === tab ? '600' : '400'
                }}
              >
                {tab === 'New' ? 'New Arrivals' : tab}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div style={styles.productGrid}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setSelectedProductForQuickView(p)}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/shop" className="btn btn-primary">
              <span>View All Products</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Heritage Story Section */}
      <section style={styles.sectionPadding}>
        <div className="container" style={styles.heritageGrid}>
          <div style={styles.heritageLeft}>
            <img
              src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop"
              alt="Lucknowi Chikankari Fabric Close-up"
              style={styles.heritageImg}
            />
          </div>
          <div style={styles.heritageRight}>
            <span style={styles.heritageLabel}>Our Heritage</span>
            <h2 style={styles.heritageTitle}>Heritage In Every Thread</h2>
            <div className="divider-gold" />
            <p style={styles.heritageText}>
              At ChikanVeda, we celebrate the timeless beauty of Indian craftsmanship. Inspired by the elegance and artistic heritage of Lucknow, our collections bring tradition, grace and contemporary style together.
            </p>
            <p style={styles.heritageText}>
              Our designs capture the intricate geometry and floral patterns characteristic of traditional Lucknowi Chikankari and ethnic weaves, meticulously styled on premium linen, mulmul cotton, and Chanderi silks.
            </p>
            <Link to="/our-story" className="btn btn-secondary" style={{ marginTop: '1.5rem' }}>
              Discover Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Why ChikanVeda */}
      <section style={{ ...styles.sectionPadding, backgroundColor: '#0A1931', color: '#FDFBF7' }}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={{ ...styles.sectionTitle, color: '#FDFBF7' }}>The ChikanVeda Experience</h2>
            <div className="divider-gold-center" />
          </div>

          <div style={styles.featuresGrid}>
            <div style={styles.featureItem}>
              <Award size={36} color="var(--color-gold)" style={styles.featureIcon} />
              <h4 style={styles.featureHeading}>Handpicked Collections</h4>
              <p style={styles.featureText}>Thoughtfully selected styles created for elegance.</p>
            </div>
            
            <div style={styles.featureItem}>
              <ShieldCheck size={36} color="var(--color-gold)" style={styles.featureIcon} />
              <h4 style={styles.featureHeading}>Quality You Can Feel</h4>
              <p style={styles.featureText}>Beautiful fabrics chosen for comfort and grace.</p>
            </div>

            <div style={styles.featureItem}>
              <MapPin size={36} color="var(--color-gold)" style={styles.featureIcon} />
              <h4 style={styles.featureHeading}>Pan India Delivery</h4>
              <p style={styles.featureText}>Bringing timeless ethnic fashion across India.</p>
            </div>

            <div style={styles.featureItem}>
              <Headphones size={36} color="var(--color-gold)" style={styles.featureIcon} />
              <h4 style={styles.featureHeading}>Personal Assistance</h4>
              <p style={styles.featureText}>Need help choosing? Connect with us directly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. New Arrivals */}
      <section style={styles.sectionPadding}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Fresh From ChikanVeda</h2>
            <div className="divider-gold-center" />
            <p style={styles.sectionSubtitle}>Discover our newest styles.</p>
          </div>

          <div style={styles.productGrid}>
            {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setSelectedProductForQuickView(p)}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link to="/new-arrivals" className="btn btn-secondary">
              View All New Arrivals
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Luxury Promotional Banner */}
      <section style={styles.promoSection}>
        <div style={styles.promoOverlay} />
        <div className="container" style={styles.promoContent}>
          <span style={styles.promoTag}>Heritage Curation</span>
          <h2 style={styles.promoTitle}>Elegance For Every Occasion</h2>
          <p style={styles.promoText}>
            From intimate celebrations to unforgettable moments, discover styles designed to make every occasion feel special.
          </p>
          <div className="divider-gold-center" />
          <Link to="/shop" className="btn btn-gold" style={{ marginTop: '1.5rem' }}>
            Explore The Collection
          </Link>
        </div>
      </section>

      {/* 8. Customer Reviews */}
      <section style={{ ...styles.sectionPadding, backgroundColor: '#FDFBF7' }}>
        <div className="container">
          {/* 
            Demo reviews — replace with verified customer reviews before production.
          */}
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Loved By Women</h2>
            <div className="divider-gold-center" />
          </div>

          <div style={styles.reviewsGrid}>
            <div style={styles.reviewCard}>
              <div style={styles.starsRowReviews}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--color-gold)" color="var(--color-gold)" />)}
              </div>
              <p style={styles.reviewText}>
                "The fabric and embroidery are absolutely beautiful. The suit looks even more elegant in person."
              </p>
              <h4 style={styles.reviewAuthor}>Priya S.</h4>
            </div>

            <div style={styles.reviewCard}>
              <div style={styles.starsRowReviews}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--color-gold)" color="var(--color-gold)" />)}
              </div>
              <p style={styles.reviewText}>
                "Such a graceful collection. The quality and finishing were lovely."
              </p>
              <h4 style={styles.reviewAuthor}>Neha M.</h4>
            </div>

            <div style={styles.reviewCard}>
              <div style={styles.starsRowReviews}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--color-gold)" color="var(--color-gold)" />)}
              </div>
              <p style={styles.reviewText}>
                "My saree was beautifully packed and looked stunning for the occasion."
              </p>
              <h4 style={styles.reviewAuthor}>Ayesha K.</h4>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Instagram Section */}
      <section style={{ ...styles.sectionPadding, backgroundColor: '#FDFBF7', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Follow Our Journey</h2>
            <p style={styles.instagramHandle}>@chikanveda</p>
            <div className="divider-gold-center" />
            <p style={styles.sectionSubtitle}>Discover new styles, inspiration and moments of elegance.</p>
          </div>

          <div style={styles.instagramGrid}>
            <div style={styles.instagramGridItem} className="insta-box">
              <img src="https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=600&auto=format&fit=crop" alt="Insta Post 1" style={styles.instaImg} />
              <div style={styles.instaOverlay} className="insta-overlay-hover"><span>Instagram</span></div>
            </div>
            <div style={styles.instagramGridItem} className="insta-box">
              <img src="https://images.unsplash.com/photo-1610030469668-93535c17b6b3?q=80&w=600&auto=format&fit=crop" alt="Insta Post 2" style={styles.instaImg} />
              <div style={styles.instaOverlay} className="insta-overlay-hover"><span>Instagram</span></div>
            </div>
            <div style={styles.instagramGridItem} className="insta-box">
              <img src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600&auto=format&fit=crop" alt="Insta Post 3" style={styles.instaImg} />
              <div style={styles.instaOverlay} className="insta-overlay-hover"><span>Instagram</span></div>
            </div>
            <div style={styles.instagramGridItem} className="insta-box">
              <img src="https://images.unsplash.com/photo-1610030470298-40b8a1c24d3c?q=80&w=600&auto=format&fit=crop" alt="Insta Post 4" style={styles.instaImg} />
              <div style={styles.instaOverlay} className="insta-overlay-hover"><span>Instagram</span></div>
            </div>
            <div style={styles.instagramGridItem} className="insta-box">
              <img src="https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=600&auto=format&fit=crop" alt="Insta Post 5" style={styles.instaImg} />
              <div style={styles.instaOverlay} className="insta-overlay-hover"><span>Instagram</span></div>
            </div>
            <div style={styles.instagramGridItem} className="insta-box">
              <img src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop" alt="Insta Post 6" style={styles.instaImg} />
              <div style={styles.instaOverlay} className="insta-overlay-hover"><span>Instagram</span></div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              Follow On Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Quick View Modal Mount */}
      {selectedProductForQuickView && (
        <QuickViewModal
          product={selectedProductForQuickView}
          onClose={() => setSelectedProductForQuickView(null)}
        />
      )}

      {/* Local hover page styles injection */}
      {localStyles}
    </div>
  );
};

const localStyles = (
  <style dangerouslySetInnerHTML={{__html: `
    .collection-hover-card {
      position: relative;
      overflow: hidden;
    }
    .collection-hover-card img {
      transition: transform 1.2s ease;
    }
    .collection-hover-card:hover img {
      transform: scale(1.08);
    }
    .insta-box {
      position: relative;
      overflow: hidden;
      aspect-ratio: 1;
    }
    .insta-overlay-hover {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background-color: rgba(10, 25, 49, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      color: #FCF8F3;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      transition: all 0.4s ease;
      cursor: pointer;
    }
    .insta-box:hover .insta-overlay-hover {
      opacity: 1;
    }
  `}} />
);

const styles = {
  page: {
    backgroundColor: 'var(--color-ivory)',
  },
  heroSection: {
    height: 'calc(100vh - 125px)',
    minHeight: '550px',
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
  },
  heroImageWrapper: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  heroOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(10, 25, 49, 0.45)', // navy tint
  },
  heroContentWrapper: {
    position: 'relative' as const,
    zIndex: 2,
  },
  heroTextContainer: {
    maxWidth: '600px',
    color: '#FCF8F3',
  },
  heroTagline: {
    fontSize: '0.8rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    color: 'var(--color-gold)',
    display: 'block',
    marginBottom: '1rem',
  },
  heroTitle: {
    fontSize: '3.2rem',
    color: '#FCF8F3',
    lineHeight: '1.15',
    marginBottom: '1.5rem',
    fontFamily: 'var(--font-serif)',
  },
  heroSubtitle: {
    fontSize: '1rem',
    color: '#E0E8F5',
    marginBottom: '2.5rem',
    lineHeight: '1.6',
    fontWeight: 400,
  },
  heroBtnGroup: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap' as const,
  },
  heroBtn: {
    minWidth: '180px',
  },
  sectionPadding: {
    padding: '6rem 0',
  },
  sectionHeader: {
    textAlign: 'center' as const,
    marginBottom: '3.5rem',
  },
  sectionTitle: {
    fontSize: '2.2rem',
    color: 'var(--color-navy)',
    marginBottom: '0.5rem',
    fontFamily: 'var(--font-serif)',
  },
  sectionSubtitle: {
    fontSize: '0.95rem',
    color: 'var(--color-text-muted)',
    marginTop: '0.5rem',
  },
  collectionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2rem',
  },
  collectionCard: {
    position: 'relative' as const,
    height: '460px',
    display: 'flex',
    alignItems: 'flex-end',
    padding: '3rem 2rem',
    backgroundColor: 'var(--color-cream)',
  },
  collectionImgWrapper: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  collectionImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  collectionOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(10, 25, 49, 0.4)', // tint overlay
  },
  collectionTextWrapper: {
    position: 'relative' as const,
    zIndex: 2,
    color: '#FCF8F3',
  },
  collectionCardTitle: {
    fontSize: '2rem',
    color: '#FCF8F3',
    fontFamily: 'var(--font-serif)',
    marginBottom: '0.5rem',
  },
  collectionCardText: {
    color: '#E0E8F5',
    fontSize: '0.9rem',
    marginBottom: '1.5rem',
    maxWidth: '280px',
  },
  tabsRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2.5rem',
    borderBottom: '1px solid var(--color-border)',
    paddingBottom: '1px',
    marginBottom: '3rem',
  },
  tabBtn: {
    background: 'none',
    border: 'none',
    fontSize: '0.85rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    padding: '0.75rem 0.5rem',
    cursor: 'pointer',
    transition: 'var(--transition-fast)',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '2rem',
  },
  heritageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '4rem',
    alignItems: 'center',
  },
  heritageLeft: {
    width: '100%',
    paddingTop: '110%',
    position: 'relative' as const,
    backgroundColor: 'var(--color-cream)',
  },
  heritageImg: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  heritageRight: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
  },
  heritageLabel: {
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    color: 'var(--color-gold)',
    marginBottom: '0.5rem',
  },
  heritageTitle: {
    fontSize: '2.4rem',
    color: 'var(--color-navy)',
    lineHeight: '1.2',
    fontFamily: 'var(--font-serif)',
  },
  heritageText: {
    fontSize: '0.95rem',
    lineHeight: '1.7',
    color: 'var(--color-text-muted)',
    marginBottom: '1rem',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '3rem',
  },
  featureItem: {
    textAlign: 'center' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '1rem',
  },
  featureIcon: {
    marginBottom: '1.5rem',
  },
  featureHeading: {
    fontSize: '1.1rem',
    color: '#FCF8F3',
    marginBottom: '0.75rem',
  },
  featureText: {
    fontSize: '0.85rem',
    color: '#A0ADC2',
    lineHeight: '1.5',
    maxWidth: '220px',
  },
  promoSection: {
    height: '420px',
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center' as const,
    backgroundColor: '#0A1931',
    borderTop: '2px solid var(--color-gold)',
    borderBottom: '2px solid var(--color-gold)',
    overflow: 'hidden',
  },
  promoOverlay: {
    position: 'absolute' as const,
    top: 0, left: 0, width: '100%', height: '100%',
    background: 'radial-gradient(circle, rgba(21,48,91,0.4) 0%, rgba(10,25,49,1) 100%)',
    zIndex: 1,
  },
  promoContent: {
    position: 'relative' as const,
    zIndex: 2,
    maxWidth: '650px',
    color: '#FCF8F3',
    padding: '0 1.5rem',
  },
  promoTag: {
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    color: 'var(--color-gold)',
    display: 'block',
    marginBottom: '1rem',
  },
  promoTitle: {
    fontSize: '2.5rem',
    color: '#FCF8F3',
    fontFamily: 'var(--font-serif)',
    marginBottom: '1rem',
  },
  promoText: {
    fontSize: '0.95rem',
    color: '#BAC9E2',
    lineHeight: '1.7',
    marginBottom: '1.5rem',
  },
  reviewsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2.5rem',
  },
  reviewCard: {
    backgroundColor: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    padding: '2.5rem 2rem',
    textAlign: 'center' as const,
    boxShadow: 'var(--shadow-subtle)',
  },
  starsRowReviews: {
    display: 'flex',
    justifyContent: 'center',
    gap: '4px',
    marginBottom: '1.25rem',
  },
  reviewText: {
    fontSize: '0.95rem',
    lineHeight: '1.6',
    color: 'var(--color-text-muted)',
    fontStyle: 'italic',
    marginBottom: '1.25rem',
  },
  reviewAuthor: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--color-navy)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
  },
  instagramHandle: {
    fontSize: '1.1rem',
    color: 'var(--color-gold)',
    fontWeight: 600,
    marginTop: '0.25rem',
    fontFamily: 'var(--font-sans)',
  },
  instagramGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
    gap: '1rem',
    marginTop: '2rem',
  },
  instagramGridItem: {
    width: '100%',
    backgroundColor: 'var(--color-cream)',
  },
  instaImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    display: 'block',
  },
  instaOverlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
};
