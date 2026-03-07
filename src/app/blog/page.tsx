import { Metadata } from 'next'
import Blog from '@/components/blog/blog'
import Breadcrumbs from '@/components/seo/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Blog - Digital Marketing Insights & E-commerce Trends | Ank Square',
  description: 'Stay updated with the latest digital marketing trends, e-commerce strategies, and industry insights. Expert articles on SEO, social media, AI marketing, and online business growth.',
  keywords: 'digital marketing blog, e-commerce trends, SEO tips, social media marketing, AI marketing, online business, digital strategy, marketing insights',
  openGraph: {
    title: 'Digital Marketing Blog & E-commerce Insights | Ank Square',
    description: 'Expert articles on digital marketing, e-commerce trends, SEO strategies, and online business growth. Stay ahead with Ank Square\'s latest insights.',
    url: 'https://anksquare.com/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Marketing Blog | Ank Square',
    description: 'Latest insights on digital marketing, e-commerce, and online business strategies.',
  },
}

export default function BlogPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' }
  ]

  return (
    <>
            <Blog isSlider={false} />
    </>
  )
}