'use client'

import { useState } from 'react'
import styles from './SEOChecklist.module.css'

interface SEOTask {
  id: string
  category: string
  task: string
  status: 'completed' | 'pending' | 'in-progress'
  priority: 'high' | 'medium' | 'low'
  description: string
}

const seoTasks: SEOTask[] = [
  // Technical SEO
  {
    id: 'meta-tags',
    category: 'Technical SEO',
    task: 'Meta Tags Implementation',
    status: 'completed',
    priority: 'high',
    description: 'Title, description, keywords, Open Graph, Twitter Cards'
  },
  {
    id: 'canonical-urls',
    category: 'Technical SEO',
    task: 'Canonical URLs',
    status: 'completed',
    priority: 'high',
    description: 'Proper canonicalization to prevent duplicate content'
  },
  {
    id: 'xml-sitemap',
    category: 'Technical SEO',
    task: 'XML Sitemap',
    status: 'completed',
    priority: 'high',
    description: 'Dynamic sitemap with proper priorities and change frequencies'
  },
  {
    id: 'robots-txt',
    category: 'Technical SEO',
    task: 'Robots.txt Optimization',
    status: 'completed',
    priority: 'high',
    description: 'Optimized for search engine crawling with proper directives'
  },
  {
    id: 'mobile-responsive',
    category: 'Technical SEO',
    task: 'Mobile-First Design',
    status: 'completed',
    priority: 'high',
    description: 'Responsive design with proper viewport meta tags'
  },
  {
    id: 'structured-data',
    category: 'Technical SEO',
    task: 'Structured Data (Schema.org)',
    status: 'completed',
    priority: 'high',
    description: 'Organization, LocalBusiness, Service, FAQ, Website schemas'
  },

  // Content SEO
  {
    id: 'semantic-html',
    category: 'Content SEO',
    task: 'Semantic HTML Structure',
    status: 'completed',
    priority: 'high',
    description: 'Proper heading hierarchy and semantic elements'
  },
  {
    id: 'keyword-optimization',
    category: 'Content SEO',
    task: 'Keyword Optimization',
    status: 'completed',
    priority: 'high',
    description: 'Strategic keyword placement and density optimization'
  },
  {
    id: 'alt-text',
    category: 'Content SEO',
    task: 'Image Alt Text',
    status: 'completed',
    priority: 'medium',
    description: 'Descriptive alt attributes for all images'
  },
  {
    id: 'internal-linking',
    category: 'Content SEO',
    task: 'Internal Linking',
    status: 'completed',
    priority: 'medium',
    description: 'Cross-linking between related content and pages'
  },

  // Performance SEO
  {
    id: 'image-optimization',
    category: 'Performance SEO',
    task: 'Image Optimization',
    status: 'completed',
    priority: 'high',
    description: 'WebP/AVIF formats with lazy loading and proper sizing'
  },
  {
    id: 'core-web-vitals',
    category: 'Performance SEO',
    task: 'Core Web Vitals',
    status: 'completed',
    priority: 'high',
    description: 'Optimized for LCP, FID, CLS metrics'
  },
  {
    id: 'static-generation',
    category: 'Performance SEO',
    task: 'Static Site Generation',
    status: 'completed',
    priority: 'high',
    description: 'Pre-rendered pages for instant loading'
  },

  // Analytics & Monitoring
  {
    id: 'google-analytics',
    category: 'Analytics',
    task: 'Google Analytics Setup',
    status: 'pending',
    priority: 'high',
    description: 'Add GA_MEASUREMENT_ID and implement tracking'
  },
  {
    id: 'search-console',
    category: 'Analytics',
    task: 'Google Search Console',
    status: 'pending',
    priority: 'high',
    description: 'Add verification codes and submit sitemap'
  },
  {
    id: 'performance-monitoring',
    category: 'Analytics',
    task: 'Performance Monitoring',
    status: 'completed',
    priority: 'medium',
    description: 'Web Vitals monitoring and error tracking'
  },

  // Advanced Features
  {
    id: 'cdn-setup',
    category: 'Advanced',
    task: 'CDN Implementation',
    status: 'pending',
    priority: 'medium',
    description: 'Implement CDN for global performance improvement'
  },
  {
    id: 'amp-pages',
    category: 'Advanced',
    task: 'AMP Pages',
    status: 'pending',
    priority: 'low',
    description: 'Accelerated Mobile Pages for mobile SEO boost'
  },
  {
    id: 'multilingual',
    category: 'Advanced',
    task: 'Multilingual Support',
    status: 'pending',
    priority: 'low',
    description: 'Add Hindi/Regional language support for local SEO'
  }
]

export default function SEOChecklist() {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'in-progress'>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const filteredTasks = seoTasks.filter(task => {
    const statusMatch = filter === 'all' || task.status === filter
    const categoryMatch = categoryFilter === 'all' || task.category === categoryFilter
    return statusMatch && categoryMatch
  })

  const categories = Array.from(new Set(seoTasks.map(task => task.category)))

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10b981'
      case 'in-progress': return '#f59e0b'
      case 'pending': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444'
      case 'medium': return '#f59e0b'
      case 'low': return '#10b981'
      default: return '#6b7280'
    }
  }

  const completedCount = seoTasks.filter(task => task.status === 'completed').length
  const totalCount = seoTasks.length
  const completionPercentage = Math.round((completedCount / totalCount) * 100)

  return (
    <div className={styles.checklist}>
      <div className={styles.header}>
        <h2>SEO Implementation Checklist</h2>
        <div className={styles.stats}>
          <div className={styles.progress}>
            <div
              className={styles.progressBar}
              style={{ width: `${completionPercentage}%` }}
            />
            <span className={styles.progressText}>
              {completedCount}/{totalCount} tasks completed ({completionPercentage}%)
            </span>
          </div>
        </div>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Status:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className={styles.select}
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>Category:</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={styles.select}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.tasks}>
        {filteredTasks.map(task => (
          <div key={task.id} className={styles.task}>
            <div className={styles.taskHeader}>
              <div className={styles.taskMeta}>
                <span
                  className={styles.status}
                  style={{ backgroundColor: getStatusColor(task.status) }}
                >
                  {task.status}
                </span>
                <span
                  className={styles.priority}
                  style={{ backgroundColor: getPriorityColor(task.priority) }}
                >
                  {task.priority}
                </span>
                <span className={styles.category}>{task.category}</span>
              </div>
            </div>
            <h3 className={styles.taskTitle}>{task.task}</h3>
            <p className={styles.taskDescription}>{task.description}</p>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className={styles.empty}>
          <p>No tasks match the current filters.</p>
        </div>
      )}
    </div>
  )
}