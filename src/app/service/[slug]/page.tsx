import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { marketplaceServices, websiteTypes, digitalMarketingTypes, mainServices } from '@/data/service'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import Button from '@/components/button/Button'
import styles from './service-detail.module.css'

interface Props {
  params: {
    slug: string
  }
}

// Combine all service for lookup - handle mainServices differently since they have different structure
const allServices = [
  ...marketplaceServices, 
  ...websiteTypes, 
  ...digitalMarketingTypes,
  // Transform mainServices to match the expected structure
  ...mainServices.map(service => ({
    ...service,
    slug: service.path.replace('/service/', ''),
    details: {
      overview: service.description,
      benefits: service.features.map(feature => ({ title: feature, description: feature })),
      process: [],
      faq: [],
      pricing: []
    }
  }))
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const service = allServices.find(s => s.slug === resolvedParams.slug)

  if (!service) {
    return {
      title: 'Service Not Found - Ank Square',
      description: 'The service you are looking for could not be found.',
    }
  }

  return {
    title: `${service.title} Services - Professional Solutions by Ank Square`,
    description: `Expert ${service.title} service for businesses. ${service.details.overview} Professional implementation with proven results.`,
    keywords: `${service.title}, ${service.title} service, e-commerce solutions, digital marketing, web development, Ank Square`,
    openGraph: {
      title: `${service.title} Services - Ank Square`,
      description: service.details.overview,
      url: `https://anksquare.com/service/${service.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} - Ank Square`,
      description: service.details.overview,
    },
  }
}

export function generateStaticParams() {
  const mainServiceSlugs = mainServices.map(service => ({
    slug: service.path.replace('/service/', '')
  }))
  
  const subServiceSlugs = allServices
    .filter(service => !mainServices.some(main => main.path.replace('/service/', '') === service.slug))
    .map((service) => ({
      slug: service.slug,
    }))
  
  return [...mainServiceSlugs, ...subServiceSlugs]
}

export const dynamicParams = false

export default async function ServiceDetailPage({ params }: Props) {
  const resolvedParams = await params
  const service = allServices.find(s => s.slug === resolvedParams.slug)

  if (!service) {
    notFound()
  }

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
                <Button variant="primary" href="#contact">Get Started</Button>
                <Button variant="secondary" href="#pricing">View Pricing</Button>
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
              <Button variant="primary" href="/contact">Contact Us</Button>
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
    </>
  )
}