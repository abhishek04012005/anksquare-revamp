'use client'

import styles from './heading.module.css'

interface HeadingProps {
  subtitle: string
  title: string
  titleHighlight: string
  id?: string
  theme?: 'default' | 'light'
}

const Heading = ({ subtitle, title, titleHighlight, id, theme = 'default' }: HeadingProps) => {

    return (
        <>
            <div
                className={`${styles.heading} ${theme === 'light' ? styles.light : ''}`}
            >
                <span
                    className={styles.subtitle}
                >
                    {subtitle}
                </span>
                <h2
                    id={id}
                    className={styles.title}
                >
                    {title}
                    <span
                        className={styles.highlight}
                    >
                        {titleHighlight}
                    </span>
                </h2>
            </div>
        </>
    )
}

export default Heading