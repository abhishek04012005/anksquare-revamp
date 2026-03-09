import { details } from '@/data/details'

interface FAQItem {
  question: string
  answer: string
}

interface FAQSchemaProps {
  faqs: FAQItem[]
}

export default function FAQSchema({ faqs }: FAQSchemaProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema),
      }}
    />
  )
}

// Predefined FAQ data for Ank Square
export const ankSquareFAQs: FAQItem[] = [
  {
    question: "What services does Ank Square offer?",
    answer: `${details.profile.nameCompany} offers comprehensive digital services including merchant account management for platforms like Amazon and Flipkart, custom website development, and digital marketing solutions including SEO and social media marketing.`
  },
  {
    question: "How long does it take to set up a merchant account?",
    answer: "Merchant account setup typically takes 3-7 business days depending on the platform and documentation requirements. We handle the entire process from application to approval."
  },
  {
    question: "Do you provide ongoing support after website development?",
    answer: "Yes, we provide comprehensive ongoing support including maintenance, updates, security monitoring, and performance optimization for all our website development projects."
  },
  {
    question: "What is your experience in digital marketing?",
    answer: "With over 5 years of experience and 500+ completed projects, we specialize in SEO, social media marketing, Google Ads, and content marketing strategies that drive measurable results."
  },
  {
    question: "Can you help with Amazon and Flipkart seller accounts?",
    answer: "Absolutely! We specialize in merchant account management for major e-commerce platforms including Amazon, Flipkart, and other online marketplaces. We handle account setup, optimization, and ongoing management."
  },
  {
    question: "What makes Ank Square different from other digital agencies?",
    answer: `Our founder ${details.profile.name} brings extensive experience in digital services with a focus on practical solutions that drive real business growth. We combine technical expertise with strategic thinking to deliver results that matter.`
  }
]