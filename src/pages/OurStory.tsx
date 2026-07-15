import React from 'react';
import { Link } from 'react-router-dom';

export const OurStory: React.FC = () => {
  return (
    <div style={styles.page}>
      {/* 1. Header Banner */}
      <section style={styles.headerSection}>
        <div className="container">
          <span style={styles.tagline}>Lucknowi Handcrafted Heritage</span>
          <h1 style={styles.title}>Our Story</h1>
          <p style={styles.subtitle}>Discover the heritage, artistry, and vision behind ChikanVeda.</p>
          <div className="divider-gold-center" />
        </div>
      </section>

      {/* 2. Inspired By Timeless Elegance (Section 1) */}
      <section style={styles.sectionPadding}>
        <div className="container" style={styles.storyGrid}>
          <div style={styles.textBlock}>
            <span style={styles.sectionLabel}>The Heritage</span>
            <h2 style={styles.sectionTitle}>Inspired By Timeless Elegance</h2>
            <div className="divider-gold" />
            <p style={styles.paragraph}>
              Lucknow, the historic city of Nawabs, is home to some of the world's most intricate and elegant textile crafts. Among them, the art of Chikankari stands out as a symbol of grace, luxury, and subtle beauty. 
            </p>
            <p style={styles.paragraph}>
              ChikanVeda was born from a desire to bring this timeless elegance into the modern wardrobe. Inspired by Lucknow's rich artistic heritage, we curate beautiful ethnic wear collections that pay homage to traditional design motifs while fitting seamlessly into the lifestyle of the contemporary woman.
            </p>
          </div>
          <div style={styles.imgBlock}>
            <img
              src="https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=800&auto=format&fit=crop"
              alt="Lucknowi drape elegance close-up"
              style={styles.image}
            />
          </div>
        </div>
      </section>

      {/* 3. A Celebration Of Indian Style (Section 2) */}
      <section style={{ ...styles.sectionPadding, backgroundColor: '#F9F5F0' }}>
        <div className="container" style={styles.storyGridReverse}>
          <div style={styles.textBlock}>
            <span style={styles.sectionLabel}>The Craftsmanship</span>
            <h2 style={styles.sectionTitle}>A Celebration of Indian Style</h2>
            <div className="divider-gold" />
            <p style={styles.paragraph}>
              Indian ethnic fashion is a beautiful expression of color, pattern, and texture. Each of our collections — from flowing ladies' suits to elegant, gracefully draped sarees — is selected for its high fabric quality, aesthetic finishes, and attention to detail.
            </p>
            <p style={styles.paragraph}>
              We work with curated suppliers and designers who respect traditional motifs. By blending classic shadow work, floral vines, and geometric borders with modern silhouettes, we ensure every ChikanVeda garment is comfortable to wear and stunning to look at.
            </p>
          </div>
          <div style={styles.imgBlock}>
            <img
              src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop"
              alt="Indian textile detailing embroidery"
              style={styles.image}
            />
          </div>
        </div>
      </section>

      {/* 4. The ChikanVeda Vision (Section 3) */}
      <section style={styles.sectionPadding}>
        <div className="container" style={styles.storyGrid}>
          <div style={styles.textBlock}>
            <span style={styles.sectionLabel}>Our Commitment</span>
            <h2 style={styles.sectionTitle}>The ChikanVeda Vision</h2>
            <div className="divider-gold" />
            <p style={styles.paragraph}>
              Our vision is to become a trusted destination for women who appreciate grace, heritage, and high quality. We strive to preserve the beauty of traditional Lucknowi design values, adapting them for everyday wear and festive celebrations.
            </p>
            <p style={styles.paragraph}>
              We are committed to providing an exceptional online shopping experience across India, complete with personal customer assistance, reliable Pan India delivery, and transparent policies.
            </p>
            <Link to="/shop" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
              <span>Shop the Collection</span>
            </Link>
          </div>
          <div style={styles.imgBlock}>
            <img
              src="https://images.unsplash.com/photo-1561414927-6d86591d0c4f?q=80&w=800&auto=format&fit=crop"
              alt="Soft handloom threads"
              style={styles.image}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: 'var(--color-ivory)',
  },
  headerSection: {
    backgroundColor: 'var(--color-cream)',
    padding: '4rem 0',
    textAlign: 'center' as const,
    borderBottom: '1px solid var(--color-border)',
  },
  tagline: {
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    color: 'var(--color-gold)',
    display: 'block',
    marginBottom: '0.5rem',
  },
  title: {
    fontSize: '2.5rem',
    color: 'var(--color-navy)',
    fontFamily: 'var(--font-serif)',
  },
  subtitle: {
    fontSize: '0.95rem',
    color: 'var(--color-text-muted)',
    marginTop: '0.5rem',
    maxWidth: '500px',
    margin: '0.5rem auto 0 auto',
  },
  sectionPadding: {
    padding: '6rem 0',
  },
  storyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '4rem',
    alignItems: 'center',
  },
  storyGridReverse: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '4rem',
    alignItems: 'center',
    direction: 'rtl' as const, // will flip columns order on large screens
  },
  textBlock: {
    direction: 'ltr' as const, // ensure text direction is normal
    display: 'flex',
    flexDirection: 'column' as const,
  },
  sectionLabel: {
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: 'var(--color-gold)',
    marginBottom: '0.5rem',
  },
  sectionTitle: {
    fontSize: '2.2rem',
    color: 'var(--color-navy)',
    fontFamily: 'var(--font-serif)',
    lineHeight: '1.25',
  },
  paragraph: {
    fontSize: '0.95rem',
    lineHeight: '1.7',
    color: 'var(--color-text-muted)',
    marginBottom: '1.25rem',
  },
  imgBlock: {
    direction: 'ltr' as const,
    width: '100%',
    paddingTop: '105%',
    position: 'relative' as const,
    backgroundColor: 'var(--color-cream)',
  },
  image: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    boxShadow: 'var(--shadow-medium)',
  }
};
