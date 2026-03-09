'use client';

import { useState } from 'react'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import Button from '@/components/button/Button'
import EnquiryModal from '@/components/enquiry/EnquiryModal'
import styles from './service-detail.module.css'

interface Service {
  title: string
  slug: string
  features: string[]
  details: {
    overview: string
    benefits: Array<{ title: string; description: string }>
    process: Array<{ step: number; title: string; description: string }>
    faq: Array<{ question: string; answer: string }>
    pricing: Array<{ plan: string; price: string; features: string[] }>
  }
}

interface ServiceDetailClientProps {
  service: Service
}

export default function ServiceDetailClient({ service }: ServiceDetailClientProps) {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false)

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="sr-only">Skip to main content</a>

      <main id="main-content" role="main">
        {/* Breadcrumb Navigation */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem 0' }}>
          <Breadcrumbs
            items={[
              { label: 'Services', href: '/service' },
              { label: service.title }
            ]}
          />
        </div>

        {/* Service Header */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <h1 className={styles.title}>{service.title} Services</h1>
              <p className={styles.overview}>{service.details.overview}</p>
              <div className={styles.heroFeatures}>
                {service.features.map((feature, index) => (
                  <span key={index} className={styles.featureTag}>
                    {feature}
                  </span>
                ))}
              </div>
              <div className={styles.ctaButtons}>
                <Button variant="secondary" onClick={() => setEnquiryModalOpen(true)}>Contact Us</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className={styles.benefits}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Key Benefits</h2>
            <div className={styles.benefitsGrid}>
              {service.details.benefits.map((benefit, index) => (
                <div key={index} className={styles.benefitCard}>
                  <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                  <p className={styles.benefitDescription}>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        {service.details.process.length > 0 && (
          <section className={styles.process}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>Our Process</h2>
              <div className={styles.processSteps}>
                {service.details.process.map((step, index) => (
                  <div key={step.step} className={styles.stepCard}>
                    <div className={styles.stepNumber}>{step.step}</div>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDescription}>{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {service.details.faq.length > 0 && (
          <section className={styles.faq}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
              <div className={styles.faqList}>
                {service.details.faq.map((faq, index) => (
                  <div key={index} className={styles.faqItem}>
                    <h3 className={styles.faqQuestion}>{faq.question}</h3>
                    <p className={styles.faqAnswer}>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section id="contact" className={styles.cta}>
          <div className={styles.container}>
            <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
            <p className={styles.ctaDescription}>
              Contact us today to discuss your {service.title} requirements and get a customized solution for your business.
            </p>
            <div className={styles.ctaButtons}>
              <Button variant="secondary" onClick={() => setEnquiryModalOpen(true)}>Contact Us</Button>
              <Button variant="secondary" href="/service">View All Services</Button>
            </div>
          </div>
        </section>

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: `${service.title} Services`,
              description: service.details.overview,
              provider: {
                '@type': 'Organization',
                name: 'Ank Square',
                url: 'https://anksquare.com'
              },
              serviceType: service.title,
              ...(service.details.pricing.length > 0 && {
                offers: service.details.pricing.map(plan => ({
                  '@type': 'Offer',
                  name: plan.plan,
                  price: plan.price.replace(/[^\d]/g, ''),
                  priceCurrency: 'INR',
                  description: plan.features.join(', ')
                }))
              })
            }),
          }}
        />
      </main>

      <EnquiryModal
        open={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
      />
    </>
  )
}
