import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown, Search, X } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import type { Product } from '../types';

interface ShopProps {
  preFilterCategory?: 'Suits' | 'Sarees';
  preFilterNewArrivals?: boolean;
  title?: string;
  subtitle?: string;
}

export const Shop: React.FC<ShopProps> = ({
  preFilterCategory,
  preFilterNewArrivals,
  title = "Our Collection",
  subtitle = "Discover Lucknowi handcrafted suits, sarees and elegant heritage wear."
}) => {
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || '';

  // Local filter states
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Suits' | 'Sarees'>(
    preFilterCategory || 'All'
  );
  const [priceRange, setPriceRange] = useState<number>(6000);
  const [onlyNew, setOnlyNew] = useState<boolean>(preFilterNewArrivals || false);
  const [onlyFeatured, setOnlyFeatured] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [visibleCount, setVisibleCount] = useState<number>(8);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [selectedProductForQuickView, setSelectedProductForQuickView] = useState<Product | null>(null);

  // Sync search query with URL params
  useEffect(() => {
    setSearchQuery(urlSearch);
  }, [urlSearch]);

  // Sync pre-filters when props change
  useEffect(() => {
    if (preFilterCategory) setSelectedCategory(preFilterCategory);
    if (preFilterNewArrivals) setOnlyNew(preFilterNewArrivals);
  }, [preFilterCategory, preFilterNewArrivals]);

  // Filter products logic
  const filteredProducts = products.filter((product) => {
    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchCategory = product.category.toLowerCase().includes(q);
      const matchKeywords = product.keywords.some(k => k.toLowerCase().includes(q));
      const matchDesc = product.description.toLowerCase().includes(q);
      if (!matchName && !matchCategory && !matchKeywords && !matchDesc) {
        return false;
      }
    }

    // 2. Category Filter (If preFilterCategory is present, force it)
    if (preFilterCategory) {
      if (product.category !== preFilterCategory) return false;
    } else if (selectedCategory !== 'All') {
      if (product.category !== selectedCategory) return false;
    }

    // 3. Price Filter
    if (product.price > priceRange) return false;

    // 4. New Arrivals Filter
    if (onlyNew && !product.isNew) return false;

    // 5. Featured Filter
    if (onlyFeatured && !product.isFeatured) return false;

    return true;
  });

  // Sort products logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'newest') {
      return a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1;
    }
    if (sortBy === 'price-low-high') {
      return a.price - b.price;
    }
    if (sortBy === 'price-high-low') {
      return b.price - a.price;
    }
    // 'featured' (Default)
    return a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1;
  });

  const displayedProducts = sortedProducts.slice(0, visibleCount);

  const handleResetFilters = () => {
    setSearchQuery('');
    if (!preFilterCategory) setSelectedCategory('All');
    setPriceRange(6000);
    if (!preFilterNewArrivals) setOnlyNew(false);
    setOnlyFeatured(false);
    setSortBy('featured');
  };

  return (
    <div style={styles.page}>
      {/* Shop Header Banner */}
      <section style={styles.headerBanner}>
        <div className="container">
          <span style={styles.bannerLabel}>ChikanVeda Curation</span>
          <h1 style={styles.bannerTitle}>{title}</h1>
          <p style={styles.bannerSubtitle}>{subtitle}</p>
          <div className="divider-gold-center" />
        </div>
      </section>

      {/* Main Filter and Grid Section */}
      <section style={{ padding: '3rem 0 6rem 0' }}>
        <div className="container" style={styles.shopLayout}>
          
          {/* Sidebar Filters (Desktop) */}
          <aside className="desktop-filters" style={styles.sidebar}>
            <div style={styles.filterSection}>
              <h3 style={styles.filterSectionTitle}>Search</h3>
              <div style={styles.searchWrapper}>
                <input
                  type="text"
                  placeholder="Search styles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={styles.searchInput}
                />
                <Search size={16} color="var(--color-text-muted)" style={styles.searchIcon} />
              </div>
            </div>

            {/* Categories filter - only show if not locked by preFilterCategory */}
            {!preFilterCategory && (
              <div style={styles.filterSection}>
                <h3 style={styles.filterSectionTitle}>Category</h3>
                <div style={styles.checkboxGroup}>
                  {(['All', 'Suits', 'Sarees'] as const).map((cat) => (
                    <label key={cat} style={styles.checkboxLabel}>
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                        style={styles.checkbox}
                      />
                      <span style={styles.checkboxText}>{cat === 'All' ? 'All Collections' : cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Price Filter */}
            <div style={styles.filterSection}>
              <div style={styles.filterSectionHeader}>
                <h3 style={styles.filterSectionTitle}>Max Price</h3>
                <span style={styles.priceValue}>₹{priceRange.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="6000"
                step="200"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                style={styles.rangeSlider}
              />
              <div style={styles.sliderLimits}>
                <span>₹1,000</span>
                <span>₹6,000</span>
              </div>
            </div>

            {/* Checkbox filters */}
            <div style={styles.filterSection}>
              <h3 style={styles.filterSectionTitle}>Filter By</h3>
              <div style={styles.checkboxGroup}>
                {!preFilterNewArrivals && (
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={onlyNew}
                      onChange={(e) => setOnlyNew(e.target.checked)}
                      style={styles.checkbox}
                    />
                    <span style={styles.checkboxText}>New Arrivals Only</span>
                  </label>
                )}
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={onlyFeatured}
                    onChange={(e) => setOnlyFeatured(e.target.checked)}
                    style={styles.checkbox}
                  />
                  <span style={styles.checkboxText}>Featured Styles</span>
                </label>
              </div>
            </div>

            <button onClick={handleResetFilters} style={styles.resetBtn}>
              Reset Filters
            </button>
          </aside>

          {/* Right Product Grid Area */}
          <main style={styles.mainContent}>
            {/* Top Toolbar */}
            <div style={styles.toolbar}>
              <div style={styles.resultsCount}>
                Showing <strong>{displayedProducts.length}</strong> of <strong>{filteredProducts.length}</strong> styles
              </div>

              <div style={styles.toolbarActions}>
                <button
                  className="mobile-filter-btn"
                  onClick={() => setShowMobileFilters(true)}
                  style={styles.mobileFilterToggle}
                >
                  <SlidersHorizontal size={14} style={{ marginRight: '6px' }} />
                  Filters
                </button>

                <div style={styles.sortWrapper}>
                  <ArrowUpDown size={14} color="var(--color-navy)" style={{ marginRight: '6px' }} />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={styles.sortSelect}
                  >
                    <option value="featured">Sort: Featured</option>
                    <option value="newest">Sort: Newest</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {displayedProducts.length > 0 ? (
              <>
                <div style={styles.grid}>
                  {displayedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={(p) => setSelectedProductForQuickView(p)}
                    />
                  ))}
                </div>

                {/* Load More Button */}
                {sortedProducts.length > displayedProducts.length && (
                  <div style={styles.loadMoreContainer}>
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 4)}
                      className="btn btn-secondary"
                    >
                      Load More Styles
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div style={styles.noResults}>
                <h3 style={styles.noResultsTitle}>No styles found</h3>
                <p style={styles.noResultsText}>Try refining your search terms or resetting the active filters.</p>
                <button onClick={handleResetFilters} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </main>

        </div>
      </section>

      {/* Mobile Filters Drawer */}
      {showMobileFilters && (
        <div style={styles.drawerOverlay} onClick={() => setShowMobileFilters(false)}>
          <div style={styles.drawer} onClick={(e) => e.stopPropagation()}>
            <div style={styles.drawerHeader}>
              <h3 style={styles.drawerTitle}>Refine Collection</h3>
              <button onClick={() => setShowMobileFilters(false)} style={styles.closeBtn}>
                <X size={20} />
              </button>
            </div>

            <div style={styles.drawerContent}>
              {/* Search */}
              <div style={styles.mobileFilterBlock}>
                <h4 style={styles.mobileFilterBlockTitle}>Search</h4>
                <div style={styles.searchWrapper}>
                  <input
                    type="text"
                    placeholder="Search styles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={styles.searchInput}
                  />
                  <Search size={16} color="var(--color-text-muted)" style={styles.searchIcon} />
                </div>
              </div>

              {/* Category (Mobile) */}
              {!preFilterCategory && (
                <div style={styles.mobileFilterBlock}>
                  <h4 style={styles.mobileFilterBlockTitle}>Category</h4>
                  <div style={styles.checkboxGroup}>
                    {(['All', 'Suits', 'Sarees'] as const).map((cat) => (
                      <label key={cat} style={styles.checkboxLabel}>
                        <input
                          type="radio"
                          name="mobile-category"
                          checked={selectedCategory === cat}
                          onChange={() => setSelectedCategory(cat)}
                          style={styles.checkbox}
                        />
                        <span style={styles.checkboxText}>{cat === 'All' ? 'All Collections' : cat}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Price (Mobile) */}
              <div style={styles.mobileFilterBlock}>
                <div style={styles.filterSectionHeader}>
                  <h4 style={styles.mobileFilterBlockTitle}>Max Price</h4>
                  <span style={styles.priceValue}>₹{priceRange.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="6000"
                  step="200"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  style={styles.rangeSlider}
                />
                <div style={styles.sliderLimits}>
                  <span>₹1,000</span>
                  <span>₹6,000</span>
                </div>
              </div>

              {/* Checkboxes (Mobile) */}
              <div style={styles.mobileFilterBlock}>
                <h4 style={styles.mobileFilterBlockTitle}>Filter By</h4>
                <div style={styles.checkboxGroup}>
                  {!preFilterNewArrivals && (
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={onlyNew}
                        onChange={(e) => setOnlyNew(e.target.checked)}
                        style={styles.checkbox}
                      />
                      <span style={styles.checkboxText}>New Arrivals Only</span>
                    </label>
                  )}
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={onlyFeatured}
                      onChange={(e) => setOnlyFeatured(e.target.checked)}
                      style={styles.checkbox}
                    />
                    <span style={styles.checkboxText}>Featured Styles</span>
                  </label>
                </div>
              </div>
            </div>

            <div style={styles.drawerFooter}>
              <button 
                onClick={() => {
                  handleResetFilters();
                  setShowMobileFilters(false);
                }} 
                style={styles.mobileResetBtn}
              >
                Clear All
              </button>
              <button 
                onClick={() => setShowMobileFilters(false)} 
                style={styles.mobileApplyBtn}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal Mount */}
      {selectedProductForQuickView && (
        <QuickViewModal
          product={selectedProductForQuickView}
          onClose={() => setSelectedProductForQuickView(null)}
        />
      )}

      {/* CSS Injections for Mobile Layout */}
      {responsiveStyles}
    </div>
  );
};

const responsiveStyles = (
  <style dangerouslySetInnerHTML={{__html: `
    .mobile-filter-btn { display: none; }
    .desktop-filters { display: block; }
    
    @media (max-width: 991px) {
      .mobile-filter-btn { display: inline-flex; }
      .desktop-filters { display: none; }
    }
  `}} />
);

const styles = {
  page: {
    backgroundColor: 'var(--color-ivory)',
  },
  headerBanner: {
    backgroundColor: 'var(--color-cream)',
    padding: '4rem 0',
    textAlign: 'center' as const,
    borderBottom: '1px solid var(--color-border)',
  },
  bannerLabel: {
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    color: 'var(--color-gold)',
    display: 'block',
    marginBottom: '0.5rem',
  },
  bannerTitle: {
    fontSize: '2.5rem',
    color: 'var(--color-navy)',
    fontFamily: 'var(--font-serif)',
  },
  bannerSubtitle: {
    fontSize: '0.95rem',
    color: 'var(--color-text-muted)',
    marginTop: '0.5rem',
    maxWidth: '550px',
    margin: '0.5rem auto 0 auto',
  },
  shopLayout: {
    display: 'flex',
    gap: '3rem',
  },
  sidebar: {
    width: '240px',
    flexShrink: 0,
  },
  filterSection: {
    marginBottom: '2rem',
    borderBottom: '1px solid var(--color-border)',
    paddingBottom: '1.5rem',
  },
  filterSectionTitle: {
    fontSize: '0.8rem',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    color: 'var(--color-navy)',
    marginBottom: '1rem',
  },
  filterSectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem',
  },
  priceValue: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--color-gold)',
  },
  searchWrapper: {
    position: 'relative' as const,
  },
  searchInput: {
    width: '100%',
    padding: '0.75rem 2.25rem 0.75rem 0.75rem',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-white)',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.85rem',
    outline: 'none',
  },
  searchIcon: {
    position: 'absolute' as const,
    top: '50%',
    right: '0.75rem',
    transform: 'translateY(-50%)',
    pointerEvents: 'none' as const,
  },
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.65rem',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  checkbox: {
    accentColor: 'var(--color-navy)',
    marginRight: '8px',
    width: '15px',
    height: '15px',
  },
  checkboxText: {
    fontSize: '0.85rem',
    color: 'var(--color-text-dark)',
  },
  rangeSlider: {
    width: '100%',
    accentColor: 'var(--color-navy)',
  },
  sliderLimits: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.7rem',
    color: 'var(--color-text-muted)',
    marginTop: '4px',
  },
  resetBtn: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-navy)',
    color: 'var(--color-navy)',
    fontSize: '0.8rem',
    fontWeight: 600,
    cursor: 'pointer',
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
    transition: 'var(--transition-fast)',
  },
  mainContent: {
    flex: 1,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '1.5rem',
    borderBottom: '1px solid var(--color-border)',
    marginBottom: '2rem',
  },
  resultsCount: {
    fontSize: '0.85rem',
    color: 'var(--color-text-muted)',
  },
  toolbarActions: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  mobileFilterToggle: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-white)',
    fontSize: '0.8rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
  sortWrapper: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-white)',
    padding: '0.25rem 0.5rem',
  },
  sortSelect: {
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    fontSize: '0.8rem',
    color: 'var(--color-navy)',
    fontWeight: 600,
    cursor: 'pointer',
    padding: '0.25rem 0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '1.5rem',
  },
  loadMoreContainer: {
    textAlign: 'center' as const,
    marginTop: '3.5rem',
  },
  noResults: {
    textAlign: 'center' as const,
    padding: '4rem 1rem',
  },
  noResultsTitle: {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
  },
  noResultsText: {
    fontSize: '0.9rem',
    color: 'var(--color-text-muted)',
  },
  drawerOverlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(10, 25, 49, 0.4)',
    backdropFilter: 'blur(2px)',
    zIndex: 2000,
  },
  drawer: {
    position: 'absolute' as const,
    top: 0,
    right: 0,
    width: '300px',
    height: '100%',
    backgroundColor: '#FDFBF7',
    boxShadow: 'var(--shadow-medium)',
    display: 'flex',
    flexDirection: 'column' as const,
    animation: 'slideInRight 0.3s ease-out forwards',
  },
  drawerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem',
    borderBottom: '1px solid var(--color-border)',
  },
  drawerTitle: {
    fontSize: '1.2rem',
    color: 'var(--color-navy)',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  drawerContent: {
    padding: '1.5rem',
    overflowY: 'auto' as const,
    flex: 1,
  },
  mobileFilterBlock: {
    marginBottom: '2rem',
  },
  mobileFilterBlockTitle: {
    fontSize: '0.8rem',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    color: 'var(--color-navy)',
    marginBottom: '0.75rem',
  },
  drawerFooter: {
    padding: '1.5rem',
    borderTop: '1px solid var(--color-border)',
    display: 'flex',
    gap: '0.75rem',
  },
  mobileResetBtn: {
    flex: 1,
    padding: '0.75rem',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-navy)',
    color: 'var(--color-navy)',
    fontSize: '0.8rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
  mobileApplyBtn: {
    flex: 2,
    padding: '0.75rem',
    backgroundColor: 'var(--color-navy)',
    color: 'var(--color-white)',
    border: 'none',
    fontSize: '0.8rem',
    fontWeight: 600,
    cursor: 'pointer',
  }
};
