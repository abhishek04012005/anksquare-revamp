import { Metadata } from 'next'
import EnquiryForm from '@/components/enquiry/EnquiryForm'
import styles from './enquiry.module.css'
import {
  Lightbulb,
  FlashOn,
  Work,
  TrendingUp,
  Phone,
  Email,
  Chat,
} from '@mui/icons-material'

export const metadata: Metadata = {
  title: 'Enquiry - Get Started with Ank Square Services',
  description: 'Contact Ank Square for professional e-commerce account management, website development, and digital marketing services. Get a free consultation today.',
  keywords: 'enquiry, contact, consultation, e-commerce services, digital marketing, web development, Ank Square',
  openGraph: {
    title: 'Enquiry - Get Started with Ank Square',
    description: 'Ready to grow your business? Contact us for expert e-commerce and digital marketing solutions.',
    url: 'https://anksquare.com/enquiry',
    type: 'website',
  },
}

export default function EnquiryPage() {
  return (
    <>
      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.contentGrid}>

          {/* Why Choose Us Section */}
          <section className={styles.whyChooseSection}>
            <h2 className={styles.sectionHeading}>
              Why Choose Ank Square?
            </h2>
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitItem}>
                <Lightbulb className={styles.benefitIcon} />
                <div className={styles.benefitContent}>
                  <h3>Expert Guidance</h3>
                  <p>Professional consultation tailored to your business needs</p>
                </div>
              </div>
              <div className={styles.benefitItem}>
                <FlashOn className={styles.benefitIcon} />
                <div className={styles.benefitContent}>
                  <h3>Quick Response</h3>
                  <p>Get a response within 24 hours of your enquiry</p>
                </div>
              </div>
              <div className={styles.benefitItem}>
                <Work className={styles.benefitIcon} />
                <div className={styles.benefitContent}>
                  <h3>Comprehensive Solutions</h3>
                  <p>End-to-end services from strategy to implementation</p>
                </div>
              </div>
              <div className={styles.benefitItem}>
                <TrendingUp className={styles.benefitIcon} />
                <div className={styles.benefitContent}>
                  <h3>Proven Results</h3>
                  <p>Track record of helping businesses grow and succeed</p>
                </div>
              </div>
            </div>
          </section>

          {/* Enquiry Form */}
          <section className={styles.enquiryFormSection}>
            <EnquiryForm />
          </section>

          {/* Services Overview */}
          <section className={styles.servicesSection}>
            <h2 className={styles.serviceSectionHeading}>
              Our Services
            </h2>
            <div className={styles.servicesGrid}>
              <div className={styles.serviceCard}>
                <h3>Merchant Account Management</h3>
                <p>Professional management of your e-commerce accounts across all major platforms</p>
              </div>
              <div className={styles.serviceCard}>
                <h3>Website Development</h3>
                <p>Custom websites built with modern technologies and SEO optimization</p>
              </div>
              <div className={styles.serviceCard}>
                <h3>Digital Marketing</h3>
                <p>Comprehensive digital marketing strategies to grow your online presence</p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className={styles.contactSection}>
            <h2 className={styles.contactSectionHeading}>
              Need Immediate Assistance?
            </h2>
            <div className={styles.contactMethodsGrid}>
              <div className={styles.contactMethod}>
                <Phone className={styles.contactMethodIcon} />
                <div>
                  <h3>Call Us</h3>
                  <p>+91-XXXXXXXXXX</p>
                  <p>Mon-Fri: 9AM - 6PM IST</p>
                </div>
              </div>
              <div className={styles.contactMethod}>
                <Email className={styles.contactMethodIcon} />
                <div>
                  <h3>Email Us</h3>
                  <p>info@anksquare.com</p>
                  <p>We respond within 24 hours</p>
                </div>
              </div>
              <div className={styles.contactMethod}>
                <Chat className={styles.contactMethodIcon} />
                <div>
                  <h3>Live Chat</h3>
                  <p>Available on our website</p>
                  <p>Instant support for quick queries</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}