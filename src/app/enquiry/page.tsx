import { Metadata } from 'next'
import EnquiryForm from '@/components/enquiry/EnquiryForm'

export const metadata: Metadata = {
  title: 'Enquiry - Get Started with Ank Square Services',
  description: 'Contact Ank Square for professional e-commerce account management, website development, and digital marketing services. Get a free consultation today.',
  keywords: 'enquiry, contact, consultation, e-commerce services, digital marketing, web development, Ank Square',
  openGraph: {
    title: 'Enquiry - Get Started with Ank Square',
    description: 'Ready to grow your business? Contact us for expert e-commerce and digital marketing solutions.',
    url: 'https://anksquare.com/enquiry',
    type: 'website',
  },
}

export default function EnquiryPage() {
  return (
    <>
      {/* Hero Section */}
      <section style={{
        padding: '4rem 1.5rem 2rem',
        background: 'linear-gradient(135deg, var(--bg-background) 0%, var(--primary-color) 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '800',
            marginBottom: '1rem',
            lineHeight: '1.2'
          }}>
            Get Started Today
          </h1>
          <p style={{
            fontSize: '1.1rem',
            lineHeight: '1.6',
            opacity: '0.95'
          }}>
            Ready to transform your business with professional e-commerce and digital marketing solutions?
            Fill out the form below and our experts will get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main style={{ padding: '3rem 1.5rem', background: 'var(--bg-background)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>

          {/* Why Choose Us Section */}
          <section>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              Why Choose Ank Square?
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ fontSize: '2rem', flexShrink: '0' }}>🎯</div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Expert Guidance</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>Professional consultation tailored to your business needs</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ fontSize: '2rem', flexShrink: '0' }}>⚡</div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Quick Response</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>Get a response within 24 hours of your enquiry</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ fontSize: '2rem', flexShrink: '0' }}>💼</div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Comprehensive Solutions</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>End-to-end services from strategy to implementation</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ fontSize: '2rem', flexShrink: '0' }}>📈</div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Proven Results</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>Track record of helping businesses grow and succeed</p>
                </div>
              </div>
            </div>
          </section>

          {/* Enquiry Form */}
          <section style={{ display: 'flex', justifyContent: 'center' }}>
            <EnquiryForm />
          </section>

          {/* Services Overview */}
          <section>
            <h2 style={{
              textAlign: 'center',
              fontSize: '2rem',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginBottom: '2rem'
            }}>
              Our Services
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              <div style={{
                background: 'var(--card-background)',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                boxShadow: '0 2px 10px var(--shadow-color)',
                border: '1px solid var(--border-color)'
              }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Merchant Account Management</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>Professional management of your e-commerce accounts across all major platforms</p>
              </div>
              <div style={{
                background: 'var(--card-background)',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                boxShadow: '0 2px 10px var(--shadow-color)',
                border: '1px solid var(--border-color)'
              }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Website Development</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>Custom websites built with modern technologies and SEO optimization</p>
              </div>
              <div style={{
                background: 'var(--card-background)',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                boxShadow: '0 2px 10px var(--shadow-color)',
                border: '1px solid var(--border-color)'
              }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Digital Marketing</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>Comprehensive digital marketing strategies to grow your online presence</p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section style={{
            background: 'var(--primary-color)',
            color: 'white',
            padding: '3rem 1.5rem',
            borderRadius: '1rem'
          }}>
            <h2 style={{
              textAlign: 'center',
              fontSize: '2rem',
              fontWeight: '700',
              marginBottom: '2rem'
            }}>
              Need Immediate Assistance?
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              maxWidth: '900px',
              margin: '0 auto'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ fontSize: '1.8rem', flexShrink: '0' }}>📞</div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Call Us</h3>
                  <p style={{ lineHeight: '1.5', opacity: '0.9' }}>+91-XXXXXXXXXX</p>
                  <p style={{ lineHeight: '1.5', opacity: '0.9' }}>Mon-Fri: 9AM - 6PM IST</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ fontSize: '1.8rem', flexShrink: '0' }}>📧</div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Email Us</h3>
                  <p style={{ lineHeight: '1.5', opacity: '0.9' }}>info@anksquare.com</p>
                  <p style={{ lineHeight: '1.5', opacity: '0.9' }}>We respond within 24 hours</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ fontSize: '1.8rem', flexShrink: '0' }}>💬</div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Live Chat</h3>
                  <p style={{ lineHeight: '1.5', opacity: '0.9' }}>Available on our website</p>
                  <p style={{ lineHeight: '1.5', opacity: '0.9' }}>Instant support for quick queries</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}