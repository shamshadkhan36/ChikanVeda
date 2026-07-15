import React, { useState } from 'react';
import { MapPin, Mail, PhoneCall, ShieldCheck } from 'lucide-react';
import { brandConfig } from '../config/brand';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields (Name, Email, and Message).');
      return;
    }
    
    setError('');
    setSubmitted(true);
    setFormData({ name: '', mobileNumber: '', email: '', message: '' });
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  const formattedNumber = brandConfig.whatsappNumber.replace('+', '').replace(/\s/g, '');
  const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(brandConfig.whatsappMessage)}`;

  return (
    <div style={styles.page}>
      {/* Header Banner */}
      <section style={styles.headerSection}>
        <div className="container">
          <span style={styles.tagline}>Get In Touch</span>
          <h1 style={styles.title}>We'd Love To Hear From You</h1>
          <p style={styles.subtitle}>
            Have questions about sizes, fabrics, or customization? Connect with the ChikanVeda team.
          </p>
          <div className="divider-gold-center" />
        </div>
      </section>

      {/* Main Grid */}
      <section style={{ padding: '4rem 0 6rem 0' }}>
        <div className="container" style={styles.contactGrid}>
          
          {/* Contact Details (Left) */}
          <div style={styles.detailsCol}>
            <div style={styles.infoCard}>
              <h3 style={styles.infoCardTitle}>Our Heritage Store</h3>
              <p style={styles.infoCardText}>Experience Lucknow's classic craftsmanship in person.</p>
              
              <div style={styles.infoDivider} />

              <div style={styles.infoItem}>
                <MapPin size={20} color="var(--color-gold)" style={styles.infoIcon} />
                <div>
                  <h4 style={styles.infoLabel}>Address</h4>
                  <p style={styles.infoValue}>{brandConfig.address}</p>
                </div>
              </div>

              <div style={styles.infoItem}>
                <Mail size={20} color="var(--color-gold)" style={styles.infoIcon} />
                <div>
                  <h4 style={styles.infoLabel}>Email Support</h4>
                  <p style={styles.infoValue}>{brandConfig.email}</p>
                </div>
              </div>

              <div style={styles.infoItem}>
                <PhoneCall size={20} color="var(--color-gold)" style={styles.infoIcon} />
                <div>
                  <h4 style={styles.infoLabel}>WhatsApp Assistance</h4>
                  <p style={styles.infoValue}>{brandConfig.whatsappNumber} (10 AM - 7 PM IST)</p>
                </div>
              </div>
            </div>

            {/* Quick Policies Help */}
            <div style={styles.policyBox}>
              <h4 style={styles.policyBoxTitle}>Quick Support Policies</h4>
              
              <div style={styles.policyRow}>
                <ShieldCheck size={18} color="var(--color-navy)" />
                <span style={styles.policyText}>7-day hassle-free returns and exchanges inside India.</span>
              </div>

              <div style={styles.policyRow}>
                <ShieldCheck size={18} color="var(--color-navy)" />
                <span style={styles.policyText}>Free shipping across India on orders above ₹1,999.</span>
              </div>
            </div>
          </div>

          {/* Contact Form (Right) */}
          <div style={styles.formCol}>
            <div style={styles.formCard}>
              <h3 style={styles.formCardTitle}>Send A Message</h3>
              <p style={styles.formCardSub}>Fields marked with * are required.</p>

              {submitted && (
                <div style={styles.successAlert}>
                  Thank you! Your message has been sent successfully. We will reach out to you within 24 hours.
                </div>
              )}

              {error && (
                <div style={styles.errorAlert}>{error}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name *</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your name"
                  />
                </div>

                <div style={styles.formGrid}>
                  <div className="form-group">
                    <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
                    <input
                      id="mobileNumber"
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="10-digit number"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address *</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="name@email.com"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Describe your enquiry here..."
                    style={{ resize: 'vertical', fontFamily: 'var(--font-sans)' }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={styles.submitBtn}>
                  <span>Send Enquiry</span>
                </button>
              </form>

              <div style={styles.formDividerWrapper}>
                <div style={styles.formLine} />
                <span style={styles.formOrText}>Or Connect Instantly</span>
                <div style={styles.formLine} />
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.formWhatsappBtn}
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

        </div>

        {/* Map Section */}
        <div className="container" style={{ marginTop: '5rem' }}>
          <div style={styles.mapTitleWrapper}>
            <h3 style={styles.mapTitle}>Find Our Location</h3>
            <p style={styles.mapSub}>Visit us in Lucknow, the historic heart of Chikankari.</p>
          </div>
          
          {/* Stylized Google Maps Placeholder Frame */}
          <div style={styles.mapPlaceholderFrame}>
            <div style={styles.mapOverlay}>
              <MapPin size={36} color="var(--color-gold)" style={{ marginBottom: '1rem' }} />
              <strong style={styles.mapHeritageTitle}>ChikanVeda Flagship Boutique</strong>
              <p style={styles.mapAddress}>{brandConfig.address}</p>
              <span style={styles.mapTip}>Flagship showroom open daily: 11:00 AM to 8:30 PM</span>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(brandConfig.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold"
                style={{ marginTop: '1.5rem' }}
              >
                Open in Google Maps
              </a>
            </div>
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
    maxWidth: '550px',
    margin: '0.5rem auto 0 auto',
  },
  contactGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '4rem',
    alignItems: 'start',
  },
  detailsCol: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2rem',
  },
  infoCard: {
    backgroundColor: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    padding: '2.5rem 2rem',
    boxShadow: 'var(--shadow-subtle)',
  },
  infoCardTitle: {
    fontSize: '1.3rem',
    color: 'var(--color-navy)',
    fontFamily: 'var(--font-serif)',
    marginBottom: '0.25rem',
  },
  infoCardText: {
    fontSize: '0.85rem',
    color: 'var(--color-text-muted)',
  },
  infoDivider: {
    height: '1px',
    backgroundColor: 'var(--color-border)',
    margin: '1.5rem 0',
  },
  infoItem: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
    alignItems: 'flex-start',
  },
  infoIcon: {
    marginTop: '3px',
    flexShrink: 0,
  },
  infoLabel: {
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    color: 'var(--color-navy)',
    marginBottom: '2px',
  },
  infoValue: {
    fontSize: '0.85rem',
    color: 'var(--color-text-dark)',
    lineHeight: '1.6',
  },
  policyBox: {
    backgroundColor: 'var(--color-cream)',
    border: '1px solid var(--color-border)',
    padding: '2rem',
  },
  policyBoxTitle: {
    fontSize: '0.8rem',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    color: 'var(--color-navy)',
    marginBottom: '1.25rem',
  },
  policyRow: {
    display: 'flex',
    gap: '0.75rem',
    marginBottom: '1rem',
    alignItems: 'flex-start',
  },
  policyText: {
    fontSize: '0.8rem',
    color: 'var(--color-text-dark)',
    lineHeight: '1.4',
  },
  formCol: {
    gridColumn: 'span 1',
  },
  formCard: {
    backgroundColor: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    padding: '2.5rem 2rem',
    boxShadow: 'var(--shadow-subtle)',
  },
  formCardTitle: {
    fontSize: '1.3rem',
    color: 'var(--color-navy)',
    fontFamily: 'var(--font-serif)',
    marginBottom: '0.25rem',
  },
  formCardSub: {
    fontSize: '0.75rem',
    color: 'var(--color-text-muted)',
    marginBottom: '2rem',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '1rem',
  },
  submitBtn: {
    width: '100%',
    height: '50px',
  },
  formDividerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1.75rem 0',
    gap: '10px',
  },
  formLine: {
    flex: 1,
    height: '1px',
    backgroundColor: 'var(--color-border)',
  },
  formOrText: {
    fontSize: '0.7rem',
    fontWeight: 600,
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
  formWhatsappBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '50px',
    backgroundColor: '#25D366',
    color: 'white',
    fontSize: '0.85rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(37, 211, 102, 0.15)',
  },
  successAlert: {
    backgroundColor: '#E8F5E9',
    color: 'var(--color-success)',
    padding: '1rem',
    fontSize: '0.85rem',
    fontWeight: 500,
    marginBottom: '1.5rem',
    borderLeft: '4px solid var(--color-success)',
  },
  errorAlert: {
    backgroundColor: '#FFEBEE',
    color: 'var(--color-error)',
    padding: '1rem',
    fontSize: '0.85rem',
    fontWeight: 500,
    marginBottom: '1.5rem',
    borderLeft: '4px solid var(--color-error)',
  },
  mapTitleWrapper: {
    textAlign: 'center' as const,
    marginBottom: '2rem',
  },
  mapTitle: {
    fontSize: '1.8rem',
    fontFamily: 'var(--font-serif)',
    color: 'var(--color-navy)',
  },
  mapSub: {
    fontSize: '0.9rem',
    color: 'var(--color-text-muted)',
    marginTop: '0.25rem',
  },
  mapPlaceholderFrame: {
    width: '100%',
    height: '350px',
    backgroundColor: '#EAE5DB',
    border: '1px solid var(--color-border)',
    backgroundImage: `radial-gradient(var(--color-border) 1px, transparent 0), radial-gradient(var(--color-border) 1px, transparent 0)`,
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 10px 10px',
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'var(--shadow-subtle)',
  },
  mapOverlay: {
    backgroundColor: 'rgba(253, 251, 247, 0.95)',
    border: '1px solid var(--color-gold)',
    padding: '2.5rem 2rem',
    textAlign: 'center' as const,
    maxWidth: '450px',
    margin: '1.5rem',
    boxShadow: 'var(--shadow-medium)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  },
  mapHeritageTitle: {
    fontSize: '1.1rem',
    color: 'var(--color-navy)',
    fontFamily: 'var(--font-serif)',
    marginBottom: '0.5rem',
  },
  mapAddress: {
    fontSize: '0.85rem',
    color: 'var(--color-text-dark)',
    marginBottom: '0.5rem',
    lineHeight: '1.4',
  },
  mapTip: {
    fontSize: '0.75rem',
    color: 'var(--color-gold)',
    fontWeight: 600,
  }
};
