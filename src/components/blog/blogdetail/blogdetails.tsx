'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { FiClock, FiUser, FiCalendar, FiLinkedin, FiTwitter, FiFacebook } from 'react-icons/fi'
import { blogPosts, BlogPost } from '../../../data/blog'
import styles from './blogdetails.module.css'

const BlogDetail: React.FC = () => {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState<BlogPost | null>(null)

  useEffect(() => {
    const currentPost = blogPosts.find(p => p.slug === slug)
    if (currentPost) {
      setPost(currentPost)
    }
  }, [slug])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (!post) return null

  return (
    <article className={styles.blogDetail}>
      <div className={styles.container}>
        {/* Featured Image */}
        <div className={styles.featuredImage}>
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={600}
            priority
            className={styles.image}
          />
          <span className={styles.category}>{post.category}</span>
        </div>

        {/* Content Section */}
        <div className={styles.contentWrapper}>
          <div className={styles.mainContent}>
            {/* Title */}
            <div className={styles.header}>
              <h1 className={styles.title}>{post.title}</h1>

              <div className={styles.meta}>
                <div className={styles.metaItem}>
                  <FiUser className={styles.icon} />
                  <span>{post.author}</span>
                </div>
                <div className={styles.metaItem}>
                  <FiCalendar className={styles.icon} />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className={styles.metaItem}>
                  <FiClock className={styles.icon} />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            {/* Excerpt */}
            <p className={styles.excerpt}>{post.excerpt}</p>

            {/* Content Sections */}
            <div className={styles.articleContent}>
              {post.sections &&
                post.sections.map((section, index) => (
                  <div key={index} className={styles.section}>
                    <h2 className={styles.sectionTitle}>{section.subtitle}</h2>
                    <p className={styles.sectionContent}>{section.content}</p>
                  </div>
                ))}
            </div>

            {/* Share Section */}
            <div className={styles.share}>
              <span>Share this article:</span>
              <div className={styles.socialLinks}>
                <button aria-label="Share on LinkedIn">
                  <FiLinkedin />
                </button>
                <button aria-label="Share on Twitter">
                  <FiTwitter />
                </button>
                <button aria-label="Share on Facebook">
                  <FiFacebook />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default BlogDetail