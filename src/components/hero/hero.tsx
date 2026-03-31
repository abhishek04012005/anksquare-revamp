'use client'
import { useState, useEffect } from 'react'
import styles from './hero.module.css'
import Button from '@/components/button/Button'
import HeroSvg from "../../svg/HeroSVG/HeroSVG"
import { FaShoppingCart, FaCode, FaChartLine, FaTools } from 'react-icons/fa'
import type { IconType } from 'react-icons'
import Image from 'next/image'
import { certificates } from '@/data/certificates';


export interface HeroCard {
  id: number
  title: string
  icon: IconType
}

export const heroCards: HeroCard[] = [
  {
    id: 1,
    title: 'E-commerce Solutions',
    icon: FaShoppingCart
  },
  {
    id: 2,
    title: 'Web Development',
    icon: FaCode
  },
  {
    id: 3,
    title: 'Digital Growth',
    icon: FaChartLine
  },
  {
    id: 4,
    title: 'Technical Support',
    icon: FaTools
  }
]



const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className={styles.hero} aria-labelledby="hero-title" itemScope itemType="https://schema.org/WebPage">
      <div className={styles.container}>
        <div className={styles.content}>
          <div
            className={styles.textContent}
          >
            <h1 id="hero-title" className={styles.title}>
              Grow Your Online Business with Smart{' '}
              <span className={styles.highlight}>Marketplace Solutions</span>
            </h1>
            <p className={styles.description}>
              We help businesses sell their products online by taking care of their seller accounts on platforms like Amazon, Flipkart and Others. From setting up your account to improving your product listings and handling daily tasks—we manage it all so your business runs smoothly.
              We also build custom websites that match your brand and help you look professional online. Plus, we offer branding solutions to make your business stand out and be easily recognized.
            </p>

            <div className={styles.cta} role="group" aria-label="Primary actions">
              <Button href="/service" variant="primary">
                Explore Our Solutions
              </Button>
              <Button href="/contact" variant="secondary">
                Get in Touch
              </Button>
            </div>
          </div>

          <div
            className={styles.imageContainer}
          >
            <div className={styles.imageWrapper}>
              <HeroSvg aria-label="Digital solutions illustration showcasing e-commerce and marketplace management" />
            </div>
          </div>
        </div>

        <div className={styles.stats} aria-label="Company statistics">
          {[
            { number: '500+', text: 'Projects Completed' },
            { number: '300+', text: 'Happy Clients' },
            { number: '5+', text: 'Years Experience' }
          ].map((stat, index) => (
            <div
              key={index}
              className={styles.stat}
            >
              <div className={styles.statNumber} aria-label={stat.text}>{stat.number}</div>
              <div className={styles.statText}>{stat.text}</div>
            </div>
          ))}
        </div>


        <div
          className={styles.certificateSection}
        >
          <h2 className={styles.certSectionTitle}>Work With Certified e-Commerce Account Management Partner Only</h2>
          <div className={styles.certContainer}>
            {certificates.map((cert, index) => (
              <div
                key={cert.id}
                className={styles.certificateCard}
              >
                <div className={styles.certImageWrapper}>
                  <Image
                    src={cert.logo}
                    alt={cert.alt}
                    width={180}
                    height={90}
                    className={styles.certImage}
                  />
                </div>
                <div className={styles.certContent}>
                  <h3 className={styles.certTitle}>{cert.title}</h3>
                  <p className={styles.certDescription}>{cert.description}</p>
                  
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero