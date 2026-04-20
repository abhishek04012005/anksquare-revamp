'use client'

import React from 'react'
import styles from './Loader.module.css'

type SpinnerType = 'spinner' | 'dots' | 'bars' | 'wave'
type LoaderSize = 'compact' | 'default' | 'large'

interface LoaderProps {
    message?: string
    type?: SpinnerType
    size?: LoaderSize
    className?: string
}

const Loader: React.FC<LoaderProps> = ({
    message = 'Loading...',
    type = 'spinner',
    size = 'default',
    className = ''
}) => {
    const getSizeClass = () => {
        switch (size) {
            case 'compact':
                return styles.compactLoader
            case 'large':
                return styles.largeLoader
            default:
                return ''
        }
    }

    const renderSpinner = () => {
        switch (type) {
            case 'dots':
                return (
                    <div className={styles.dotsSpinner}>
                        <div className={styles.dot}></div>
                        <div className={styles.dot}></div>
                        <div className={styles.dot}></div>
                    </div>
                )
            case 'bars':
                return (
                    <div className={styles.barSpinner}>
                        <div className={styles.bar}></div>
                        <div className={styles.bar}></div>
                        <div className={styles.bar}></div>
                    </div>
                )
            case 'wave':
                return (
                    <div className={styles.waveSpinner}>
                        <div className={styles.wave}></div>
                        <div className={styles.wave}></div>
                        <div className={styles.wave}></div>
                        <div className={styles.wave}></div>
                        <div className={styles.wave}></div>
                    </div>
                )
            case 'spinner':
            default:
                return <div className={styles.spinner}></div>
        }
    }

    return (
        <div className={`${styles.loaderContainer} ${getSizeClass()} ${className}`}>
            {renderSpinner()}
            {message && <p className={styles.loadingText}>{message}</p>}
        </div>
    )
}

export default Loader
