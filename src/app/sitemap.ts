import { MetadataRoute } from 'next'
import { marketplaceServices, websiteTypes, digitalMarketingTypes, mainServices } from '@/data/service'
import { cities, getCitySlug } from '@/data/cities'
import { blogPosts } from '@/data/blog'

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

  // City service pages (dynamic for all services except merchant-management and web-development)
  const cityServicePages: MetadataRoute.Sitemap = []

  // Services that have city pages: all except merchant-management and web-development
  const servicesWithCityPages = [
    ...marketplaceServices,
    ...websiteTypes,
    ...digitalMarketingTypes,
    // Include digital-marketing from mainServices
    {
      slug: 'digital-marketing',
      title: 'Digital Marketing'
    }
  ]

  // Generate city pages for each service
  servicesWithCityPages.forEach(service => {
    cities.forEach(city => {
      const citySlug = getCitySlug(city.name)
      cityServicePages.push({
        url: `${baseUrl}/service/${service.slug}/${citySlug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })
    })
  })

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

  // Blog pages
  const blogPages = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    ...staticPages,
    ...servicePages,
    ...cityServicePages,
    ...clientPages,
    ...blogPages,
  ]
}