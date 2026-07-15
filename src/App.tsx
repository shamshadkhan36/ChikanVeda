import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartWishlistProvider } from './context/CartWishlistContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

// Page Imports
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { SuitsPage } from './pages/SuitsPage';
import { SareesPage } from './pages/SareesPage';
import { NewArrivalsPage } from './pages/NewArrivalsPage';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Wishlist } from './pages/Wishlist';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { OurStory } from './pages/OurStory';
import { Contact } from './pages/Contact';

// Scroll to Top component on route changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// SEO Title Sync Component
const PageTitleSync: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let title = "ChikanVeda | Elegant Suits & Timeless Sarees";
    let metaDescription = "Discover elegant women's ethnic wear at ChikanVeda. Explore graceful suits, timeless sarees and styles inspired by Indian heritage.";

    if (path === '/') {
      title = "ChikanVeda | Elegant Suits & Timeless Sarees";
    } else if (path === '/shop') {
      title = "Shop Indian Women's Ethnic Collections | ChikanVeda";
      metaDescription = "Explore the complete curation of traditional women's wear, including cotton Chikankari suits, georgette sarees and Chanderi fabrics.";
    } else if (path === '/suits') {
      title = "Elegant Ladies Suits & Kurta Sets | ChikanVeda";
      metaDescription = "Buy beautiful Lucknowi Chikankari suits and cotton kurta sets designed for everyday comfort and festive grace.";
    } else if (path === '/sarees') {
      title = "Timeless Sarees & Traditional Drapes | ChikanVeda";
      metaDescription = "Shop exquisite Banarasi and organza sarees with golden zari embroidery and hand-guided borders.";
    } else if (path === '/new-arrivals') {
      title = "Fresh Arrivals - New Indian Fashion | ChikanVeda";
      metaDescription = "Explore our newest catalog additions. Premium festive suits, georgette outfits, and brand-new saree styles.";
    } else if (path.startsWith('/product/')) {
      // Set inside ProductDetails dynamically if needed, or fallback here
      title = "Premium Ethnic Styles | ChikanVeda";
    } else if (path === '/cart') {
      title = "Your Shopping Bag | ChikanVeda";
    } else if (path === '/wishlist') {
      title = "Your Favorites Curation | ChikanVeda";
    } else if (path === '/checkout') {
      title = "Checkout Order | ChikanVeda";
    } else if (path === '/order-success') {
      title = "Thank You For Your Order | ChikanVeda";
    } else if (path === '/our-story') {
      title = "Our Story - Lucknowi Handcrafted Heritage | ChikanVeda";
      metaDescription = "Learn about the heritage, craftsmanship, and vision behind the ChikanVeda ethnic fashion brand.";
    } else if (path === '/contact') {
      title = "Contact ChikanVeda Support & Flagship Showroom";
      metaDescription = "Get in touch with us for product customization, sizing queries, and wholesale inquiries. Visit our flagship store in Lucknow.";
    }

    document.title = title;
    
    // Update meta description if element exists
    const metaDescEl = document.querySelector('meta[name="description"]');
    if (metaDescEl) {
      metaDescEl.setAttribute('content', metaDescription);
    }
  }, [location]);

  return null;
};

function App() {
  return (
    <CartWishlistProvider>
      <Router>
        <ScrollToTop />
        <PageTitleSync />
        
        {/* Top Announcement Bar */}
        <AnnouncementBar />
        
        {/* Sticky Header */}
        <Header />
        
        {/* Main Content Area */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/suits" element={<SuitsPage />} />
            <Route path="/sarees" element={<SareesPage />} />
            <Route path="/new-arrivals" element={<NewArrivalsPage />} />
            <Route path="/product/:slug" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Fallback to Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* Floating WhatsApp Support Button */}
        <WhatsAppButton />
      </Router>
    </CartWishlistProvider>
  );
}

export default App;
