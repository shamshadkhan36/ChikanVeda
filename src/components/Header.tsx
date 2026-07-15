import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, User } from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';

export const Header: React.FC = () => {
  const { cart, wishlist } = useCartWishlist();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  // Total cart items count
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/suits', label: 'Suits' },
    { path: '/sarees', label: 'Sarees' },
    { path: '/new-arrivals', label: 'New Arrivals' },
    { path: '/our-story', label: 'Our Story' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header style={{
        ...styles.header,
        backgroundColor: isScrolled ? 'rgba(253, 251, 247, 0.95)' : '#FDFBF7',
        borderBottom: isScrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        boxShadow: isScrolled ? 'var(--shadow-subtle)' : 'none',
      }}>
        <div className="container" style={styles.headerContainer}>
          {/* Mobile Menu Icon */}
          <button 
            style={styles.iconBtn} 
            className="mobile-only-btn" 
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation drawer"
          >
            <Menu size={22} color="var(--color-navy)" />
          </button>

          {/* Logo Brand Title */}
          <Link to="/" style={styles.logoContainer}>
            <div style={styles.logoIcon}>CV</div>
            <div style={styles.logoTextWrapper}>
              <span style={styles.logoTitle}>ChikanVeda</span>
              <span style={styles.logoTagline}>Lucknowi Heritage</span>
            </div>
          </Link>

          {/* Navigation Items (Desktop) */}
          <nav className="desktop-only-nav" style={styles.nav}>
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                style={({ isActive }) => ({
                  ...styles.navLink,
                  color: isActive ? 'var(--color-gold)' : 'var(--color-navy)',
                  fontWeight: isActive ? '600' : '400',
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* User Controls (Right) */}
          <div style={styles.rightIcons}>
            <button 
              style={styles.iconBtn} 
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search products"
            >
              <Search size={20} color="var(--color-navy)" />
            </button>

            <Link to="/contact" style={styles.iconBtn} aria-label="Customer Account">
              <User size={20} color="var(--color-navy)" />
            </Link>

            <Link to="/wishlist" style={{ ...styles.iconBtn, position: 'relative', display: 'flex' }} aria-label="View Wishlist">
              <Heart size={20} color="var(--color-navy)" />
              {wishlistCount > 0 && (
                <span style={styles.badge}>{wishlistCount}</span>
              )}
            </Link>

            <Link to="/cart" style={{ ...styles.iconBtn, position: 'relative', display: 'flex' }} aria-label="View Cart">
              <ShoppingBag size={20} color="var(--color-navy)" />
              {cartCount > 0 && (
                <span style={styles.badge}>{cartCount}</span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Global CSS Inject for media queries */}
      <style dangerouslySetInnerHTML={{__html: `
        .mobile-only-btn { display: none; }
        .desktop-only-nav { display: flex; }
        @media (max-width: 991px) {
          .mobile-only-btn { display: block; }
          .desktop-only-nav { display: none; }
        }
      `}} />

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div style={styles.drawerOverlay} onClick={() => setIsMobileMenuOpen(false)}>
          <div style={styles.drawer} onClick={(e) => e.stopPropagation()}>
            <div style={styles.drawerHeader}>
              <span style={styles.drawerTitle}>ChikanVeda</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                style={styles.iconBtn}
                aria-label="Close menu"
              >
                <X size={24} color="var(--color-navy)" />
              </button>
            </div>
            
            <div style={styles.drawerLinks}>
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={({ isActive }) => ({
                    ...styles.drawerLink,
                    color: isActive ? 'var(--color-gold)' : 'var(--color-navy)',
                    borderLeft: isActive ? '2px solid var(--color-gold)' : '2px solid transparent',
                  })}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            <div style={styles.drawerFooter}>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Lucknowi Handcrafted Heritage</p>
              <div style={styles.drawerSocials}>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" style={styles.socialLink}>Instagram</a>
                <span style={{color: 'var(--color-border)'}}>|</span>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" style={styles.socialLink}>Facebook</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div style={styles.searchOverlay} onClick={() => setIsSearchOpen(false)}>
          <div style={styles.searchContainer} onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setIsSearchOpen(false)} 
              style={styles.closeSearchBtn}
              aria-label="Close search"
            >
              <X size={24} color="var(--color-navy)" />
            </button>
            <h3 style={styles.searchTitle}>Search ChikanVeda</h3>
            <form onSubmit={handleSearchSubmit} style={styles.searchForm}>
              <input
                type="text"
                placeholder="Search for suits, sarees, styles, embroidery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={styles.searchInput}
              />
              <button type="submit" style={styles.searchSubmitBtn}>
                <Search size={22} color="var(--color-navy)" />
              </button>
            </form>
            <p style={styles.searchHint}>Press Enter to search. Try "white", "saree", "silk", "chikankari", etc.</p>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  header: {
    position: 'fixed' as const,
    top: '40px', // Announcement Bar Height
    left: 0,
    right: 0,
    height: '85px',
    display: 'flex',
    alignItems: 'center',
    zIndex: 999,
    transition: 'background-color 0.3s ease, border-bottom 0.3s ease, box-shadow 0.3s ease',
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  logoIcon: {
    width: '40px',
    height: '40px',
    backgroundColor: 'var(--color-navy)',
    color: 'var(--color-gold)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    fontWeight: 600,
    fontFamily: 'var(--font-serif)',
    border: '1px solid var(--color-gold)',
  },
  logoTextWrapper: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  logoTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.4rem',
    fontWeight: '500',
    color: 'var(--color-navy)',
    letterSpacing: '0.04em',
    lineHeight: '1.1',
  },
  logoTagline: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.65rem',
    color: 'var(--color-gold)',
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    marginTop: '2px',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  },
  navLink: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.8rem',
    fontWeight: 500,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    padding: '0.5rem 0',
  },
  rightIcons: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
  },
  badge: {
    position: 'absolute' as const,
    top: '-6px',
    right: '-6px',
    backgroundColor: 'var(--color-gold)',
    color: 'var(--color-navy)',
    fontSize: '0.65rem',
    fontWeight: 700,
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerOverlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(10, 25, 49, 0.4)',
    zIndex: 2000,
    backdropFilter: 'blur(2px)',
  },
  drawer: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '300px',
    height: '100%',
    backgroundColor: '#FDFBF7',
    boxShadow: 'var(--shadow-medium)',
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '2rem 1.5rem',
    animation: 'slideInLeft 0.3s ease-out forwards',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid var(--color-border)',
    paddingBottom: '1.5rem',
    marginBottom: '2rem',
  },
  drawerTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.5rem',
    color: 'var(--color-navy)',
  },
  drawerLinks: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem',
    flex: 1,
  },
  drawerLink: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.95rem',
    fontWeight: 500,
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
    padding: '0.25rem 0 0.25rem 1rem',
    transition: 'var(--transition-fast)',
  },
  drawerFooter: {
    borderTop: '1px solid var(--color-border)',
    paddingTop: '1.5rem',
    textAlign: 'center' as const,
  },
  drawerSocials: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.8rem',
    marginTop: '0.75rem',
  },
  socialLink: {
    fontSize: '0.75rem',
    color: 'var(--color-navy)',
    fontWeight: 600,
  },
  searchOverlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(253, 251, 247, 0.98)',
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: 'scaleUp 0.3s ease-out forwards',
  },
  searchContainer: {
    width: '100%',
    maxWidth: '650px',
    padding: '2rem',
    position: 'relative' as const,
    textAlign: 'center' as const,
  },
  closeSearchBtn: {
    position: 'absolute' as const,
    top: '-3rem',
    right: '2rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  searchTitle: {
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    letterSpacing: '0.04em',
  },
  searchForm: {
    display: 'flex',
    borderBottom: '2px solid var(--color-navy)',
    paddingBottom: '0.5rem',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    background: 'none',
    border: 'none',
    fontSize: '1.3rem',
    fontFamily: 'var(--font-sans)',
    outline: 'none',
    color: 'var(--color-navy)',
    padding: '0.5rem',
  },
  searchSubmitBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
  },
  searchHint: {
    fontSize: '0.8rem',
    color: 'var(--color-text-muted)',
    marginTop: '1rem',
  }
};
