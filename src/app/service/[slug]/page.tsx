import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { marketplaceServices, websiteTypes, digitalMarketingTypes, mainServices } from '@/data/service'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import ServiceDetailClient from './service-detail-client'
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

  // Create a serializable version of the service without functions
  const serializableService = {
    title: service.title,
    slug: service.slug,
    features: service.features,
    details: service.details
  }

  return <ServiceDetailClient service={serializableService} />
}