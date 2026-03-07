import { Metadata } from 'next'
import Services from '@/components/service/service'
import Breadcrumbs from '@/components/seo/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Our Services - E-commerce Solutions & Digital Marketing | Ank Square',
  description: 'Comprehensive digital services including merchant account management, website development, and digital marketing. Expert e-commerce solutions for Indian businesses across all major platforms.',
  keywords: 'e-commerce services, merchant account management, website development, digital marketing, SEO services, online marketing, e-commerce platform management, web design India, digital marketing agency',
  openGraph: {
    title: 'Our Services - Complete Digital Solutions | Ank Square',
    description: 'Professional e-commerce account management, custom website development, and comprehensive digital marketing services for growing businesses.',
    url: 'https://anksquare.com/service',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services - Digital Solutions | Ank Square',
    description: 'Expert e-commerce management, website development, and digital marketing services.',
  },
}

export default function ServicesPage() {
  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="sr-only">Skip to main content</a>

      <main id="main-content" role="main">
        {/* Breadcrumb Navigation */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem 0' }}>
          <Breadcrumbs
            items={[
              { label: 'Our Services' }
            ]}
          />
        </div>

        {/* Services Component */}
        <Services />

        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Ank Square',
              url: 'https://anksquare.com',
              description: 'Leading digital services company providing e-commerce account management, website development, and digital marketing solutions for businesses in India',
              serviceType: ['E-commerce Management', 'Web Development', 'Digital Marketing'],
              areaServed: 'India',
              logo: 'https://anksquare.com/logo.svg',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+91-XXXXXXXXXX',
                contactType: 'Customer Service',
                availableLanguage: 'English'
              },
              offers: [
                {
                  '@type': 'Service',
                  name: 'Merchant Account Management',
                  description: 'Professional e-commerce account management across all major Indian marketplaces'
                },
                {
                  '@type': 'Service',
                  name: 'Website Development',
                  description: 'Custom website development with modern technologies and SEO optimization'
                },
                {
                  '@type': 'Service',
                  name: 'Digital Marketing',
                  description: 'Comprehensive digital marketing services including SEO, social media, and paid advertising'
                }
              ]
            }),
          }}
        />
      </main>
    </>
  )
}