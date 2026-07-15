import React, { useState, useEffect } from 'react';

const announcements = [
  "Handcrafted Elegance | Pan India Delivery",
  "Timeless Ethnic Wear inspired by Lucknowi Heritage",
  "Discover Our Latest Suit & Saree Collection",
  "Free Delivery on Orders Above ₹1,999"
];

export const AnnouncementBar: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % announcements.length);
        setFade(true);
      }, 400); // match fade transition out
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.bar}>
      <span
        style={{
          ...styles.text,
          opacity: fade ? 1 : 0,
          transform: fade ? 'translateY(0)' : 'translateY(5px)'
        }}
      >
        {announcements[index]}
      </span>
    </div>
  );
};

const styles = {
  bar: {
    backgroundColor: '#0A1931',
    color: '#FCF8F3',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    borderBottom: '1px solid rgba(197, 168, 128, 0.2)',
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  text: {
    transition: 'opacity 0.4s ease, transform 0.4s ease',
  }
};
