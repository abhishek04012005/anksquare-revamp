'use client'
import React, { FC, useMemo, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import ImageIcon from '@mui/icons-material/Image'
import LanguageIcon from '@mui/icons-material/Language'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import ArticleIcon from '@mui/icons-material/Article'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { clients, Client } from '@/data/client'
import styles from './clientprojects.module.css'


interface ClientProjectViewProps {
  slug: string
}

const workTypeIcons = {
  all: ImageIcon,
  logo: ImageIcon,
  website: LanguageIcon,
  visitingCard: CreditCardIcon,
  profile: ArticleIcon,
  business: TrendingUpIcon,
  letterHead: ArticleIcon
}

const ClientProjectView: FC<ClientProjectViewProps> = ({ slug }) => {
  const [selectedType, setSelectedType] = useState<string | null>(null)


  const client = useMemo<Client | undefined>(
    () => clients.find((c) => c.slug === slug),
    [slug]
  )

  if (!client) {
    return (
      <section className={styles.projectView}>
        <div className={styles.container}>
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <h1 style={{ color: '#333', marginBottom: '1rem' }}>Project Not Found</h1>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
              The project you are looking for could not be found.
            </p>
            <a href="/client" style={{
              display: 'inline-block',
              padding: '0.75rem 1.5rem',
              background: '#213f61',
              color: 'white',
              borderRadius: '0.5rem',
              textDecoration: 'none'
            }}>
              Back to Clients
            </a>
          </div>
        </div>
      </section>
    )
  }

  const filteredWork = client.workDone.filter(work =>
    !selectedType || work.type === selectedType
  )

  return (
    <section className={styles.projectView}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.clientInfo}>
            <Image
              src={`/assets/client${client.logo}`}
              alt={`${client.name} Logo`}
              width={180}
              height={90}
              className={styles.logo}
              priority
            />
            <div>
              <h1 className={styles.title}>{client.name}</h1>
              <p className={styles.project}>{client.project}</p>
            </div>
          </div>
          <blockquote className={styles.testimonial}>
            {client.testimonial}
          </blockquote>
        </div>

        <div className={styles.workTypes}>
          {Array.from(new Set(client.workDone.map(w => w.type))).map(type => {
            const IconComponent = workTypeIcons[type as keyof typeof workTypeIcons]
            if (!IconComponent) return null
            return (
              <button
                key={type}
                className={`${styles.typeButton} ${selectedType === type ? styles.active : ''
                  }`}
                onClick={() => setSelectedType(type)}
              >
                <IconComponent />
                <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
              </button>
            )
          })}
        </div>

        <div className={styles.workGrid}>
          {filteredWork.map((work, index) => (
            <motion.div
              key={`${work.type}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={styles.workCard}
            >
              <h3 className={styles.workTitle}>{work.title}</h3>
              <p className={styles.description}>{work.description}</p>

              {work.images && (
                <div className={styles.imageGrid}>
                  {work.images.map((image, i) => (
                    <div key={i} className={styles.imageContainer}>
                      <Image
                        src={`/assets/client${image}`}
                        alt={`${work.title} ${i + 1}`}
                        width={1000}
                        height={900}
                        className={styles.workImage}
                      />
                    </div>
                  ))}
                </div>
              )}

              {work.url && (
                <a
                  href={work.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <LanguageIcon />
                  <span>Visit Website</span>
                </a>
              )}

              {work.presentationUrl && (
                <div className={styles.presentation}>
                  <iframe
                    src={work.presentationUrl}
                    width="100%"
                    height="500"
                    frameBorder="0"
                    allowFullScreen
                    title={`${client.name} Presentation`}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ClientProjectView