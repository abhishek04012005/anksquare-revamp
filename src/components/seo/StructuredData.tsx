import { details } from '@/data/details';

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": details.profile.nameCompany,
    "url": "https://anksquare.com",
    "logo": "https://anksquare.com/logo.svg",
    "description": details.about.missionStatement,
    "founder": {
      "@type": "Person",
      "name": details.profile.name,
      "jobTitle": details.profile.title
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": details.social.phone,
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "sameAs": [
      details.social.instagram,
      details.social.pinterest
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": details.profile.nameCompany,
    "description": details.about.missionStatement,
    "url": "https://anksquare.com",
    "telephone": details.social.phone,
    "email": details.social.email,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.6139",
      "longitude": "77.2090"
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "$$"
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Digital Services",
    "description": "Comprehensive digital solutions including merchant account management, website development, and digital marketing",
    "provider": {
      "@type": "Organization",
      "name": details.profile.nameCompany
    },
    "serviceType": "Digital Marketing",
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": details.services.merchantAccountManagement.title,
            "description": details.services.merchantAccountManagement.features.join(", ")
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": details.services.websiteDevelopment.title,
            "description": details.services.websiteDevelopment.features.join(", ")
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": details.services.digitalMarketing.title,
            "description": details.services.digitalMarketing.features.join(", ")
          }
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
    </>
  );
}