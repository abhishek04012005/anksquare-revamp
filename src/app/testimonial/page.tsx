import { Metadata } from 'next'
import Image from 'next/image'
import { FaStar, FaQuoteLeft } from 'react-icons/fa'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { testimonials } from '@/data/testimonial'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Client Testimonials - What Our Customers Say About Ank Square',
  description: 'Read genuine testimonials from our satisfied clients. Discover how Ank Square has helped businesses succeed with merchant account management, website development, and digital marketing services.',
  keywords: 'client testimonials, customer reviews, Ank Square feedback, business success stories, merchant account testimonials, digital services reviews',
  openGraph: {
    title: 'Client Testimonials - Ank Square Success Stories',
    description: 'Real testimonials from businesses that have grown with Ank Square. See how our services have made a difference.',
    url: 'https://anksquare.com/testimonial',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Client Testimonials - Ank Square',
    description: 'Read what our clients say about our digital services and business solutions.',
  },
}

export default function TestimonialPage() {
  return (
    <>

      <main id="main-content" role="main">
        {/* Breadcrumb Navigation */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem 0' }}>
          <Breadcrumbs
            items={[
              { label: 'Testimonials' }
            ]}
          />
        </div>

        {/* Hero Section */}
        <section
          className={styles.heroSection}
          aria-labelledby="testimonial-heading"
        >
          <div className={styles.heroContainer}>
            <h1
              id="testimonial-heading"
              className={styles.heroTitle}
            >
              What Our Clients Say
            </h1>
            <p
              className={styles.heroDescription}
            >
              Discover how Ank Square has helped businesses across India achieve their digital goals.
              Read genuine testimonials from our satisfied clients.
            </p>
            <div
              className={styles.heroDivider}
            />
          </div>
        </section>

        {/* Testimonials Grid */}
        <section
          className={styles.testimonialsSection}
          aria-labelledby="testimonials-grid-heading"
        >
          <div className={styles.testimonialsContainer}>
            <h2
              id="testimonials-grid-heading"
              className="sr-only"
            >
              Client Testimonials
            </h2>

            <div
              className={styles.testimonialsGrid}
            >
              {testimonials.map((testimonial) => (
                <article
                  key={testimonial.id}
                  className={styles.testimonialCard}
                  itemScope
                  itemType="https://schema.org/Review"
                >
                  <FaQuoteLeft
                    className={styles.quoteIcon}
                  />

                  <p
                    className={styles.quote}
                    itemProp="reviewBody"
                  >
                    {testimonial.quote}
                  </p>

                  <div
                    className={styles.rating}
                  >
                    {Array.from({ length: testimonial.rating }, (_, i) => (
                      <FaStar
                        key={i}
                        className={styles.star}
                      />
                    ))}
                  </div>

                  <div
                    className={styles.clientInfo}
                  >
                    <div
                      className={styles.clientImage}
                    >
                      <Image
                        src={testimonial.image}
                        alt={`Photo of ${testimonial.name}, ${testimonial.position}`}
                        width={60}
                        height={60}
                      />
                    </div>
                    <div className={styles.clientDetails}>
                      <h3
                        itemProp="author"
                        itemScope
                        itemType="https://schema.org/Person"
                      >
                        <span itemProp="name">{testimonial.name}</span>
                      </h3>
                      <p
                        itemProp="jobTitle"
                      >
                        {testimonial.position}
                      </p>
                    </div>
                  </div>

                  <meta itemProp="reviewRating" content={testimonial.rating.toString()} />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section
          className={styles.ctaSection}
          aria-labelledby="cta-heading"
        >
          <div className={styles.ctaContainer}>
            <h2
              id="cta-heading"
              className={styles.ctaTitle}
            >
              Ready to Join Our Success Stories?
            </h2>
            <p
              className={styles.ctaDescription}
            >
              Let Ank Square help your business thrive in the digital world. Contact us today for a free consultation.
            </p>
            <a
              href="/contact"
              className={styles.ctaButton}
            >
              Get Started Today
            </a>
          </div>
        </section>

        {/* Structured Data for Testimonials */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'Client Testimonials - Ank Square',
              description: 'Read genuine testimonials from Ank Square clients about our digital services',
              url: 'https://anksquare.com/testimonial',
              mainEntity: {
                '@type': 'Organization',
                name: 'Ank Square',
                review: testimonials.map(testimonial => ({
                  '@type': 'Review',
                  author: {
                    '@type': 'Person',
                    name: testimonial.name,
                    jobTitle: testimonial.position
                  },
                  reviewBody: testimonial.quote,
                  reviewRating: {
                    '@type': 'Rating',
                    ratingValue: testimonial.rating,
                    bestRating: 5
                  }
                }))
              }
            }),
          }}
        />
      </main>
    </>
  )
}