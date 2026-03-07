import { Metadata } from 'next'
import Contact from '@/components/contact/contact'
import Breadcrumbs from '@/components/seo/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Contact Ank Square - Get Your Digital Services Quote Today',
  description: 'Ready to grow your business? Contact Ank Square for expert merchant account management, website development, and digital marketing services. Call us or fill the contact form.',
  keywords: 'contact Ank Square, digital services quote, business consultation, merchant account help, website development inquiry',
  openGraph: {
    title: 'Contact Ank Square - Digital Services Support',
    description: 'Get in touch with our team for digital solutions. Quick response time and personalized service.',
    url: 'https://anksquare.com/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Ank Square',
    description: 'Reach out to Ank Square for digital services consultation and support.',
  },
}

export default function ContactPage() {
  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="sr-only">Skip to main content</a>
      
      <main id="main-content" role="main">
        {/* Breadcrumb Navigation */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem 0' }}>
          <Breadcrumbs
            items={[
              { label: 'Contact Us' }
            ]}
          />
        </div>

        {/* Contact Component */}
        <Contact />

        {/* Structured Data for Contact Page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ContactPage',
              name: 'Ank Square - Contact Us',
              description: 'Contact form and information for Ank Square digital services company',
              url: 'https://anksquare.com/contact',
              mainEntity: {
                '@type': 'Organization',
                name: 'Ank Square',
                url: 'https://anksquare.com',
                contactPoint: {
                  '@type': 'ContactPoint',
                  telephone: '+91-9939337638',
                  contactType: 'customer service',
                  email: 'contact@anksquare.com',
                  availableLanguage: 'English'
                },
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: 'Ank Square Pvt. Ltd., Ramjaipal Road, Opp. Gola Road, Near Hotel Magadh Palace',
                  addressLocality: 'Patna',
                  addressRegion: 'Bihar',
                  postalCode: '801503',
                  addressCountry: 'IN'
                }
              }
            }),
          }}
        />
      </main>
    </>
  )
}
