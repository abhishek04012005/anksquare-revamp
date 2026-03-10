import { MetadataRoute } from 'next'
import { marketplaceServices, websiteTypes, digitalMarketingTypes, mainServices } from '@/data/service'
import { cities, getCitySlug } from '@/data/cities'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://anksquare.com'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/service`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/testimonial`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  // Service pages
  const servicePages = [
    ...marketplaceServices,
    ...websiteTypes,
    ...digitalMarketingTypes,
    ...mainServices.map(service => ({
      ...service,
      slug: service.path.replace('/service/', ''),
    }))
  ].map(service => ({
    url: `${baseUrl}/service/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // City service pages (dynamic for all services)
  const cityServicePages: MetadataRoute.Sitemap = []
  // Removed: City pages are now dynamic routes - will be rendered on-demand

  // Client project pages
  const clientPages = [
    'sharma-interiors',
    'sah-constructions',
    'achintya-enterprises',
    'sl-engineerings'
  ].map(client => ({
    url: `${baseUrl}/client/${client}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...servicePages,
    ...cityServicePages,
    ...clientPages,
  ]
}