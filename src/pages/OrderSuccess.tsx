import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

interface OrderInfo {
  orderNumber: string;
  total: number;
  fullName: string;
  email: string;
  date: string;
}

export const OrderSuccess: React.FC = () => {
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem('last_chikanveda_order');
    if (savedOrder) {
      try {
        setOrderInfo(JSON.parse(savedOrder));
      } catch (e) {
        console.error("Error reading order confirmation details", e);
      }
    }
  }, []);

  return (
    <div style={styles.page}>
      <div className="container" style={styles.container}>
        <CheckCircle2 size={64} color="var(--color-gold)" style={styles.successIcon} />
        
        <h1 style={styles.title}>Thank You For Your Order</h1>
        <p style={styles.subtitle}>Your ChikanVeda order has been received and is being prepared.</p>

        {orderInfo ? (
          <div style={styles.receiptCard}>
            <div style={styles.receiptRow}>
              <span style={styles.label}>Order Number:</span>
              <strong style={styles.value}>{orderInfo.orderNumber}</strong>
            </div>

            <div style={styles.receiptRow}>
              <span style={styles.label}>Date:</span>
              <span style={styles.value}>{orderInfo.date}</span>
            </div>

            <div style={styles.receiptRow}>
              <span style={styles.label}>Deliver To:</span>
              <span style={styles.value}>{orderInfo.fullName}</span>
            </div>

            <div style={styles.receiptRow}>
              <span style={styles.label}>Confirmation sent to:</span>
              <span style={styles.value}>{orderInfo.email}</span>
            </div>

            <div style={styles.divider} />

            <div style={{ ...styles.receiptRow, fontSize: '1.1rem' }}>
              <span style={{ ...styles.label, color: 'var(--color-navy)', fontWeight: 700 }}>Total Paid:</span>
              <strong style={{ ...styles.value, color: 'var(--color-navy)', fontSize: '1.2rem' }}>
                ₹{orderInfo.total.toLocaleString('en-IN')}
              </strong>
            </div>
          </div>
        ) : (
          <div style={styles.receiptCard}>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
              Generating order confirmation details...
            </p>
          </div>
        )}

        <div style={styles.btnRow}>
          <Link to="/shop" className="btn btn-primary">
            <span>Continue Shopping</span>
          </Link>
          
          <Link to="/" className="btn btn-secondary">
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: 'var(--color-ivory)',
    padding: '6rem 0',
  },
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center' as const,
    maxWidth: '550px',
  },
  successIcon: {
    marginBottom: '1.5rem',
  },
  title: {
    fontFamily: 'var(--font-serif)',
    fontSize: '2.3rem',
    color: 'var(--color-navy)',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '0.95rem',
    color: 'var(--color-text-muted)',
    marginBottom: '2.5rem',
    lineHeight: '1.6',
  },
  receiptCard: {
    backgroundColor: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    width: '100%',
    padding: '2rem',
    boxShadow: 'var(--shadow-subtle)',
    textAlign: 'left' as const,
    marginBottom: '2.5rem',
  },
  receiptRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.75rem',
    fontSize: '0.9rem',
  },
  label: {
    color: 'var(--color-text-muted)',
  },
  value: {
    color: 'var(--color-text-dark)',
    fontWeight: 500,
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--color-border)',
    margin: '1.25rem 0',
  },
  btnRow: {
    display: 'flex',
    gap: '1rem',
    width: '100%',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
  }
};
