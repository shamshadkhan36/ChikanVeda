import React from 'react';
import { Link } from 'react-router-dom';
import { brandConfig } from '../config/brand';

export const Footer: React.FC = () => {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.footerContainer}>
        {/* Brand Info */}
        <div style={styles.column}>
          <h3 style={styles.brandTitle}>{brandConfig.name}</h3>
          <p style={styles.brandTagline}>{brandConfig.tagline}</p>
          <p style={styles.brandDescription}>
            Bringing the fine artistry and elegant handcrafted heritage of Lucknow's traditional embroidery to women across the globe.
          </p>
        </div>

        {/* Shop Navigation */}
        <div style={styles.column}>
          <h4 style={styles.heading}>Shop</h4>
          <ul style={styles.list}>
            <li style={styles.listItem}><Link to="/suits" style={styles.link}>Ladies Suits</Link></li>
            <li style={styles.listItem}><Link to="/sarees" style={styles.link}>Sarees</Link></li>
            <li style={styles.listItem}><Link to="/new-arrivals" style={styles.link}>New Arrivals</Link></li>
            <li style={styles.listItem}><Link to="/shop" style={styles.link}>Explore All</Link></li>
          </ul>
        </div>

        {/* Customer Care Links */}
        <div style={styles.column}>
          <h4 style={styles.heading}>Customer Care</h4>
          <ul style={styles.list}>
            <li style={styles.listItem}><Link to="/contact" style={styles.link}>Contact Us</Link></li>
            <li style={styles.listItem}><Link to="/contact" style={styles.link}>Shipping Policy</Link></li>
            <li style={styles.listItem}><Link to="/contact" style={styles.link}>Return Policy</Link></li>
            <li style={styles.listItem}><Link to="/contact" style={styles.link}>Privacy Policy</Link></li>
            <li style={styles.listItem}><Link to="/contact" style={styles.link}>Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Follow/Social Links */}
        <div style={styles.column}>
          <h4 style={styles.heading}>Follow Us</h4>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <a href={brandConfig.instagramUrl} target="_blank" rel="noopener noreferrer" style={styles.link}>
                Instagram
              </a>
            </li>
            <li style={styles.listItem}>
              <a href={brandConfig.facebookUrl} target="_blank" rel="noopener noreferrer" style={styles.link}>
                Facebook
              </a>
            </li>
            <li style={styles.listItem}>
              <a href={`https://wa.me/${brandConfig.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(brandConfig.whatsappMessage)}`} target="_blank" rel="noopener noreferrer" style={styles.link}>
                WhatsApp Support
              </a>
            </li>
            <li style={styles.listItem}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-gold)' }}>Email:</span>
              <p style={{ ...styles.link, textTransform: 'none', margin: '4px 0 0 0', display: 'block' }}>{brandConfig.email}</p>
            </li>
          </ul>
        </div>
      </div>

      <div style={styles.bottomBar}>
        <div className="container" style={styles.bottomContainer}>
          <p style={styles.copyright}>© 2026 ChikanVeda. All Rights Reserved. Crafted with love in India.</p>
          <div style={styles.bottomPaymentIcons}>
            <span style={styles.paymentBadge}>UPI Enabled</span>
            <span style={styles.paymentBadge}>Secure Checkout</span>
            <span style={styles.paymentBadge}>Pan India Shipping</span>
          </div>
        </div>
      </div>

      {styleInjection}
    </footer>
  );
};

const styleInjection = (
  <style dangerouslySetInnerHTML={{__html: `
    .footer-col-links a:hover {
      color: var(--color-gold) !important;
      transform: translateX(3px);
    }
  `}} />
);

const styles = {
  footer: {
    backgroundColor: '#0A1931',
    color: '#FCF8F3',
    padding: '5rem 0 0 0',
    marginTop: '6rem',
    borderTop: '2px solid var(--color-gold)',
  },
  footerContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '3rem',
    paddingBottom: '4rem',
  },
  column: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  brandTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '2rem',
    color: '#FCF8F3',
    marginBottom: '0.25rem',
    letterSpacing: '0.04em',
  },
  brandTagline: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.7rem',
    color: 'var(--color-gold)',
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    marginBottom: '1.25rem',
  },
  brandDescription: {
    color: '#A0ADC2',
    fontSize: '0.85rem',
    lineHeight: '1.7',
    maxWidth: '280px',
  },
  heading: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.8rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    color: 'var(--color-gold)',
    marginBottom: '1.5rem',
  },
  list: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem',
    padding: 0,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    className: 'footer-col-links',
  },
  link: {
    color: '#BAC9E2',
    fontSize: '0.85rem',
    transition: 'var(--transition-smooth)',
    display: 'inline-block',
  },
  bottomBar: {
    borderTop: '1px solid rgba(197, 168, 128, 0.1)',
    padding: '2rem 0',
    backgroundColor: '#071224',
  },
  bottomContainer: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
  },
  copyright: {
    color: '#62728C',
    fontSize: '0.8rem',
  },
  bottomPaymentIcons: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap' as const,
  },
  paymentBadge: {
    fontSize: '0.7rem',
    color: 'var(--color-gold)',
    border: '1px solid rgba(197, 168, 128, 0.3)',
    padding: '0.25rem 0.6rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
  }
};
