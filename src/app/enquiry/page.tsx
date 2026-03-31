import { Metadata } from 'next'
import EnquiryForm from '@/components/enquiry/EnquiryForm'
import Heading from '@/components/heading/heading'
import { about, contact, profile, service, social } from '@/data/details'
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
        <section className={styles.pageIntro}>
          <Heading
            subtitle="Get Started"
            title="Grow Your Business With "
            titleHighlight={profile.nameCompany}
          />
          <p className={styles.pageIntroText}>{about.missionStatement}</p>
        </section>

        <div className={styles.contentGrid}>

          {/* Why Choose Us Section */}
          <section className={styles.whyChooseSection}>
            <Heading
              subtitle="Why Choose Us"
              title="Why Choose "
              titleHighlight={profile.nameCompany}
            />
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
            <Heading
              subtitle="Our Expertise"
              title="Explore Our "
              titleHighlight="Services"
            />
            <div className={styles.servicesGrid}>
              {Object.values(service).map((item) => (
                <div key={item.title} className={styles.serviceCard}>
                  <h3>
                    <span className={styles.serviceIcon}>{item.icon}</span>
                    {item.title}
                  </h3>
                  <p>{item.features.slice(0, 3).join(' • ')}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Information */}
          <section className={styles.contactSection}>
            <Heading
              subtitle="Need Help Now?"
              title="Get in Touch With "
              titleHighlight={profile.nameCompany}
              theme="light"
            />
            <div className={styles.contactMethodsGrid}>
              <div className={styles.contactMethod}>
                <Phone className={styles.contactMethodIcon} />
                <div>
                  <h3>Call Us</h3>
                  <p>{contact.phone}</p>
                  <p>{contact.timezone}</p>
                </div>
              </div>
              <div className={styles.contactMethod}>
                <Email className={styles.contactMethodIcon} />
                <div>
                  <h3>Email Us</h3>
                  <p>{contact.email}</p>
                  <p>We respond within 24 hours</p>
                </div>
              </div>
              <div className={styles.contactMethod}>
                <Chat className={styles.contactMethodIcon} />
                <div>
                  <h3>Visit Website</h3>
                  <p>{social.website}</p>
                  <p>{contact.address.city}, {contact.address.state}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}