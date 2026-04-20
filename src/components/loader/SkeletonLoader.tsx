'use client'

import React from 'react'
import styles from './SkeletonLoader.module.css'

type SkeletonType = 'card' | 'table' | 'dashboard' | 'grid' | 'custom'
type GridColumns = 'cols2' | 'cols3' | 'cols4'

interface SkeletonLoaderProps {
    type?: SkeletonType
    count?: number
    gridColumns?: GridColumns
    className?: string
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
    type = 'card',
    count = 3,
    gridColumns = 'cols2',
    className = ''
}) => {
    const renderCardSkeleton = () => (
        <div className={styles.skeletonCard}>
            <div className={styles.skeletonCardHeader}>
                <div className={`${styles.skeletonItem} ${styles.skeletonAvatar}`}></div>
                <div className={styles.skeletonCardContent}>
                    <div className={`${styles.skeletonItem} ${styles.skeletonTitle}`}></div>
                    <div className={`${styles.skeletonItem} ${styles.skeletonText}`}></div>
                </div>
            </div>
            <div className={`${styles.skeletonItem} ${styles.skeletonLine} ${styles.full}`}></div>
            <div className={`${styles.skeletonItem} ${styles.skeletonLine} ${styles.medium}`}></div>
        </div>
    )

    const renderTableSkeleton = () => (
        <div className={styles.skeletonTable}>
            {[...Array(count)].map((_, idx) => (
                <div key={idx} className={styles.skeletonTableRow}>
                    <div className={`${styles.skeletonItem} ${styles.skeletonTableCell} ${styles.narrow}`}></div>
                    <div className={`${styles.skeletonItem} ${styles.skeletonTableCell} ${styles.wide}`}></div>
                    <div className={`${styles.skeletonItem} ${styles.skeletonTableCell}`}></div>
                    <div className={`${styles.skeletonItem} ${styles.skeletonTableCell}`}></div>
                    <div className={`${styles.skeletonItem} ${styles.skeletonTableCell} ${styles.narrow}`}></div>
                </div>
            ))}
        </div>
    )

    const renderDashboardSkeleton = () => (
        <div className={styles.dashboardSkeleton}>
            <div className={styles.dashboardHeader}>
                <div className={`${styles.skeletonItem} ${styles.dashboardTitle}`}></div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div className={`${styles.skeletonItem} ${styles.skeletonButton}`}></div>
                    <div className={`${styles.skeletonItem} ${styles.skeletonButton}`}></div>
                </div>
            </div>

            <div className={styles.dashboardStats}>
                {[...Array(4)].map((_, idx) => (
                    <div key={idx} className={styles.dashboardStatItem}>
                        <div className={`${styles.skeletonItem} ${styles.dashboardStatNumber}`}></div>
                        <div className={`${styles.skeletonItem} ${styles.dashboardStatLabel}`}></div>
                    </div>
                ))}
            </div>

            <div>
                {[...Array(count)].map((_, idx) => (
                    <div key={idx} style={{ marginBottom: '1rem' }}>
                        <div className={`${styles.skeletonItem} ${styles.skeletonLine} ${styles.full}`}></div>
                        <div className={`${styles.skeletonItem} ${styles.skeletonLine} ${styles.medium}`}></div>
                    </div>
                ))}
            </div>
        </div>
    )

    const renderGridSkeleton = () => (
        <div className={`${styles.skeletonGrid} ${styles[gridColumns]}`}>
            {[...Array(count)].map((_, idx) => (
                <div key={idx}>
                    <div className={`${styles.skeletonItem} ${styles.skeletonImage}`}></div>
                    <div className={`${styles.skeletonItem} ${styles.skeletonLine} ${styles.full}`}></div>
                    <div className={`${styles.skeletonItem} ${styles.skeletonLine} ${styles.medium}`}></div>
                </div>
            ))}
        </div>
    )

    const renderSkeleton = () => {
        switch (type) {
            case 'card':
                return renderCardSkeleton()
            case 'table':
                return renderTableSkeleton()
            case 'dashboard':
                return renderDashboardSkeleton()
            case 'grid':
                return renderGridSkeleton()
            default:
                return renderCardSkeleton()
        }
    }

    return (
        <div className={`${styles.skeletonContainer} ${className}`}>
            {[...Array(type === 'card' || type === 'grid' || type === 'dashboard' ? 1 : count)].map((_, idx) => (
                <div key={idx}>
                    {renderSkeleton()}
                </div>
            ))}
        </div>
    )
}

export default SkeletonLoader
