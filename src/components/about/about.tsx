'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import styles from './About.module.css'
import Heading from '../../components/heading/heading'
import Button from '../../components/button/Button'
import AboutSVG from "../../svg/AboutSVG/AboutSVG"
import { service } from '@/data/details'



const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className={styles.about} ref={ref} aria-labelledby="about-heading" itemScope itemType="https://schema.org/AboutPage">
      <div className={styles.container}>
        <Heading
          id="about-heading"
          subtitle="About Us"
          title="Empowering Ecommerce Through "
          titleHighlight="Digital Expertise"
        />


        <div className={styles.content}>
          <motion.div
            className={styles.imageSection}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={styles.imageBorder}>
              <AboutSVG />
            </div>
            <div className={styles.experience}>
              <span className={styles.number}>5+</span>
              <span className={styles.text}>Years of Excellence</span>
            </div>
          </motion.div>

          <motion.div
            className={styles.textSection}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className={styles.description}>
              At Anksquare, we blend creativity with technology to deliver
              exceptional digital solutions. Our passionate team is dedicated to
              transforming your ideas into impressive digital realities.
            </p>

            <div className={styles.features}>
              {Object.values(service).map((service, index) => (
                <motion.div
                  key={index}
                  className={styles.featureItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <span className={styles.featureIcon}>{service.icon}</span>
                  <div>
                    <h3 className={styles.featureTitle}>{service.title}</h3>
                    <p className={styles.featureDescription}>
                      {service.features.join(' • ')}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className={styles.cta}>
              <Button href="/contact" variant="primary">
                Let&apos;s Work Together
              </Button>
              <Button href="/service" variant="secondary">
                View Our Portfolio
              </Button>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About