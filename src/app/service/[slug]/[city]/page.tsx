import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { marketplaceServices, websiteTypes, digitalMarketingTypes, mainServices } from '@/data/service'
import { cities, getCityBySlug, getCitySlug } from '@/data/cities'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import Button from '@/components/button/Button'
import { EmojiEvents, Bolt, Business, TrackChanges } from '@mui/icons-material'
import styles from '../service-detail.module.css'
import cityStyles from './city-service.module.css'

interface Props {
  params: {
    slug: string
    city: string
  }
}

// Combine all services for lookup
const allServices = [
  ...marketplaceServices, 
  ...websiteTypes, 
  ...digitalMarketingTypes,
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
  const city = getCityBySlug(resolvedParams.city)

  if (!service || !city) {
    return {
      title: 'Service Not Found - Ank Square',
      description: 'The service you are looking for could not be found.',
    }
  }

  const title = `${service.title} Services in ${city.name}, ${city.state} | Ank Square`
  const description = `Expert ${service.title} service in ${city.name}. Professional implementation with proven results in ${city.state}. Trusted by local businesses.`

  return {
    title,
    description,
    keywords: `${service.title} in ${city.name}, ${service.title} ${city.name}, ${service.title} services ${city.state}, local ${service.title}`,
    openGraph: {
      title,
      description,
      url: `https://anksquare.com/service/${service.slug}/${getCitySlug(city.name)}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export function generateStaticParams() {
  const params: Array<{ slug: string; city: string }> = []

  // Generate params for all main services with all cities
  mainServices.forEach(mainService => {
    const slug = mainService.path.replace('/service/', '')
    cities.forEach(city => {
      params.push({
        slug,
        city: getCitySlug(city.name)
      })
    })
  })

  // Generate params for popular marketplace services
  const popularMarketplaceServices = ['amazon', 'flipkart', 'meesho', 'shopsy']
  marketplaceServices
    .filter(service => popularMarketplaceServices.some(popular => 
      service.slug.toLowerCase().includes(popular.toLowerCase())
    ))
    .forEach(service => {
      cities.forEach(city => {
        params.push({
          slug: service.slug,
          city: getCitySlug(city.name)
        })
      })
    })

  // Limit to top 50 cities for website and digital marketing to keep build time reasonable
  const topCities = cities.slice(0, 50)
  
  websiteTypes.forEach(service => {
    topCities.forEach(city => {
      params.push({
        slug: service.slug,
        city: getCitySlug(city.name)
      })
    })
  })

  digitalMarketingTypes.forEach(service => {
    topCities.forEach(city => {
      params.push({
        slug: service.slug,
        city: getCitySlug(city.name)
      })
    })
  })

  return params
}

export const dynamicParams = true

export default async function CityServicePage({ params }: Props) {
  const resolvedParams = await params
  const service = allServices.find(s => s.slug === resolvedParams.slug)
  const city = getCityBySlug(resolvedParams.city)

  if (!service || !city) {
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
              { label: service.title, href: `/service/${service.slug}` },
              { label: `${city.name}, ${city.state}` }
            ]}
          />
        </div>

        {/* City Service Header */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <div className={cityStyles.locationBadge}>{city.name}, {city.state}</div>
              <h1 className={styles.title}>{service.title} in {city.name}</h1>
              <p className={styles.overview}>
                {service.details.overview} Serving businesses in {city.name} and across {city.state}.
              </p>
              <div className={styles.heroFeatures}>
                {service.features.map((feature, index) => (
                  <span key={index} className={styles.featureTag}>
                    {feature}
                  </span>
                ))}
              </div>
              <div className={styles.ctaButtons}>
                <Button variant="primary" href="#contact">Get Started in {city.name}</Button>
                <Button variant="secondary" href={`/service/${service.slug}`}>View All Details</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Local Benefits Section */}
        <section className={cityStyles.localBenefits}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Why Choose Us in {city.name}?</h2>
            <div className={cityStyles.benefitsGrid}>
              <div className={cityStyles.benefitCard}>
                <div className={cityStyles.icon}>
                  <EmojiEvents fontSize="large" />
                </div>
                <h3>Local Expertise</h3>
                <p>Deep understanding of {city.name}'s market dynamics and business ecosystem</p>
              </div>
              <div className={cityStyles.benefitCard}>
                <div className={cityStyles.icon}>
                  <Bolt fontSize="large" />
                </div>
                <h3>Quick Response</h3>
                <p>Fast support and on-site assistance for businesses in {city.name}</p>
              </div>
              <div className={cityStyles.benefitCard}>
                <div className={cityStyles.icon}>
                  <Business fontSize="large" />
                </div>
                <h3>Proven Track Record</h3>
                <p>Trusted by 100+ businesses in {city.name} and {city.state}</p>
              </div>
              <div className={cityStyles.benefitCard}>
                <div className={cityStyles.icon}>
                  <TrackChanges fontSize="large" />
                </div>
                <h3>Tailored Solutions</h3>
                <p>Custom strategies for {city.name} market conditions</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section from Service */}
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
              <h2 className={styles.sectionTitle}>Frequently Asked Questions about {service.title} in {city.name}</h2>
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

        {/* Pricing Section */}
        {service.details.pricing.length > 0 && (
          <section id="pricing" className={styles.pricing}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>Pricing Plans for {city.name}</h2>
              <div className={styles.pricingGrid}>
                {service.details.pricing.map((plan, index) => (
                  <div key={index} className={styles.pricingCard}>
                    <h3 className={styles.pricingPlan}>{plan.plan}</h3>
                    <div className={styles.pricingPrice}>{plan.price}</div>
                    <ul className={styles.pricingFeatures}>
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Location CTA Section */}
        <section className={cityStyles.locationCta}>
          <div className={styles.container}>
            <h2>Ready to Grow Your Business in {city.name}?</h2>
            <p>
              Connect with our {service.title} experts in {city.name}. We understand the unique challenges and opportunities in {city.name}, {city.state}.
            </p>
            <div className={styles.ctaButtons}>
              <Button variant="primary" href="#contact">Schedule a Free Consultation</Button>
              <Button variant="secondary" href="/contact">Contact Us Today</Button>
            </div>
          </div>
        </section>

        {/* Structured Data for Local Service */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: `Ank Square - ${service.title} in ${city.name}`,
              description: `Professional ${service.title} service in ${city.name}, ${city.state}`,
              url: `https://anksquare.com/service/${service.slug}/${getCitySlug(city.name)}`,
              telephone: '+91-XXXXXXXXXX',
              areaServed: {
                '@type': 'City',
                name: city.name,
                addressRegion: city.state,
                addressCountry: 'IN'
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: city.name,
                addressRegion: city.state,
                addressCountry: 'IN'
              },
              serviceType: service.title,
              priceRange: '$$',
              image: 'https://anksquare.com/logo.svg',
              sameAs: [
                'https://www.instagram.com/anksquare',
                'https://www.facebook.com/anksquare'
              ]
            }),
          }}
        />

        {/* Structured Data for Service */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: `${service.title} in ${city.name}`,
              description: service.details.overview,
              areaServed: {
                '@type': 'City',
                name: city.name
              },
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
