'use client'
import { useEffect, useState } from 'react'
import {
    WhatsApp, TrendingUp, Smartphone, Monitor,
    Language, AccessTime, BarChart, Search, GetApp
} from '@mui/icons-material'
import { supabase } from '@/lib/supabase'
import { Loader } from '@/components/loader'
import styles from './WhatsAppDashboard.module.css'

interface WhatsAppClick {
    id: string
    user_agent: string
    referrer: string
    ip_address: string
    clicked_at: string
    page_url: string
    device_type: string
    browser_info: any
}

type TimeFilter = 'today' | 'week' | 'month' | 'all'
type DeviceFilter = 'all' | 'mobile' | 'desktop'

const WhatsAppDashboard = () => {
    const [clicks, setClicks] = useState<WhatsAppClick[]>([])
    const [loading, setLoading] = useState(true)
    const [timeFilter, setTimeFilter] = useState<TimeFilter>('week')
    const [deviceFilter, setDeviceFilter] = useState<DeviceFilter>('all')
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        fetchClicks()
    }, [timeFilter])

    const fetchClicks = async () => {
        setLoading(true)
        try {
            let query = supabase
                .from('whatsapp_clicks')
                .select('*')
                .order('clicked_at', { ascending: false })

            // Apply time filter
            if (timeFilter !== 'all') {
                const now = new Date()
                let startDate = new Date()

                switch (timeFilter) {
                    case 'today':
                        startDate.setHours(0, 0, 0, 0)
                        break
                    case 'week':
                        startDate.setDate(now.getDate() - 7)
                        break
                    case 'month':
                        startDate.setMonth(now.getMonth() - 1)
                        break
                }

                query = query.gte('clicked_at', startDate.toISOString())
            }

            const { data, error } = await query

            if (error) throw error

            setClicks(data || [])
        } catch (error) {
            console.error('Error fetching WhatsApp clicks:', error)
        } finally {
            setLoading(false)
        }
    }

    // Filter clicks based on device and search
    const filteredClicks = clicks.filter(click => {
        const matchesDevice = deviceFilter === 'all' || click.device_type === deviceFilter
        const matchesSearch = searchQuery === '' ||
            click.page_url.toLowerCase().includes(searchQuery.toLowerCase()) ||
            click.referrer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            click.user_agent.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesDevice && matchesSearch
    })

    // Calculate statistics
    const totalClicks = filteredClicks.length
    const mobileClicks = filteredClicks.filter(c => c.device_type === 'mobile').length
    const desktopClicks = filteredClicks.filter(c => c.device_type === 'desktop').length
    const mobilePercentage = totalClicks > 0 ? Math.round((mobileClicks / totalClicks) * 100) : 0

    // Get top pages
    const pageStats = filteredClicks.reduce((acc, click) => {
        const url = new URL(click.page_url).pathname
        acc[url] = (acc[url] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    const topPages = Object.entries(pageStats)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getBrowserInfo = (userAgent: string) => {
        if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) return 'Chrome'
        if (userAgent.includes('Firefox')) return 'Firefox'
        if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari'
        if (userAgent.includes('Edg')) return 'Edge'
        return 'Other'
    }

    if (loading) {
        return (
            <Loader 
                message="Loading WhatsApp analytics..." 
                type="dots" 
                size="large" 
            />
        )
    }

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <WhatsApp className={styles.titleIcon} />
                    <h1>WhatsApp Click Analytics</h1>
                </div>
                <div className={styles.filters}>
                    <div className={styles.filterGroup}>
                        <label>Time Period:</label>
                        <select
                            value={timeFilter}
                            onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}
                        >
                            <option value="today">Today</option>
                            <option value="week">Last 7 Days</option>
                            <option value="month">Last 30 Days</option>
                            <option value="all">All Time</option>
                        </select>
                    </div>
                    <div className={styles.filterGroup}>
                        <label>Device:</label>
                        <select
                            value={deviceFilter}
                            onChange={(e) => setDeviceFilter(e.target.value as DeviceFilter)}
                        >
                            <option value="all">All Devices</option>
                            <option value="mobile">Mobile</option>
                            <option value="desktop">Desktop</option>
                        </select>
                    </div>
                    <div className={styles.searchBox}>
                        <Search className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search by page, referrer, or browser..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                        <WhatsApp />
                    </div>
                    <div className={styles.statContent}>
                        <h3>{totalClicks}</h3>
                        <p>Total Clicks</p>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                        <Smartphone />
                    </div>
                    <div className={styles.statContent}>
                        <h3>{mobileClicks}</h3>
                        <p>Mobile Clicks ({mobilePercentage}%)</p>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                        <Monitor />
                    </div>
                    <div className={styles.statContent}>
                        <h3>{desktopClicks}</h3>
                        <p>Desktop Clicks ({100 - mobilePercentage}%)</p>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                        <TrendingUp />
                    </div>
                    <div className={styles.statContent}>
                        <h3>{topPages.length > 0 ? topPages[0][1] : 0}</h3>
                        <p>Top Page Clicks</p>
                    </div>
                </div>
            </div>

            {/* Top Pages Chart */}
            <div className={styles.chartSection}>
                <h2>Top Pages</h2>
                <div className={styles.pageChart}>
                    {topPages.map(([page, count], index) => (
                        <div key={page} className={styles.pageBar}>
                            <div className={styles.pageInfo}>
                                <span className={styles.pageName}>{page || '/'}</span>
                                <span className={styles.pageCount}>{count} clicks</span>
                            </div>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progressFill}
                                    style={{ width: `${(count / totalClicks) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* All Pages with Clicks */}
            <div className={styles.chartSection}>
                <h2>All Pages with WhatsApp Clicks</h2>
                <div className={styles.allPagesGrid}>
                    {Object.entries(pageStats)
                        .sort(([,a], [,b]) => b - a)
                        .map(([page, count]) => (
                        <div key={page} className={styles.pageCard}>
                            <div className={styles.pageCardHeader}>
                                <Language className={styles.pageCardIcon} />
                                <div className={styles.pageCardInfo}>
                                    <h4 className={styles.pageCardTitle}>
                                        {page || '/'} (Homepage)
                                    </h4>
                                    <span className={styles.pageCardClicks}>
                                        {count} click{count !== 1 ? 's' : ''}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.pageCardBar}>
                                <div
                                    className={styles.pageCardFill}
                                    style={{ width: `${(count / Math.max(...Object.values(pageStats))) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Clicks Table */}
            <div className={styles.tableSection}>
                <div className={styles.tableHeader}>
                    <h2>Recent Clicks ({filteredClicks.length})</h2>
                    <button className={styles.exportBtn}>
                        <GetApp />
                        Export Data
                    </button>
                </div>

                <div className={styles.tableContainer}>
                    <table className={styles.clicksTable}>
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Page</th>
                                <th>Device</th>
                                <th>Browser</th>
                                <th>Referrer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClicks.map((click) => (
                                <tr key={click.id}>
                                    <td>
                                        <div className={styles.timeCell}>
                                            <AccessTime className={styles.timeIcon} />
                                            {formatDate(click.clicked_at)}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.pageCell}>
                                            <Language className={styles.pageIcon} />
                                            <div className={styles.pageDetails}>
                                                <span className={styles.pagePath}>
                                                    {new URL(click.page_url).pathname || '/'}
                                                </span>
                                                <span className={styles.pageFullUrl} title={click.page_url}>
                                                    {click.page_url}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.deviceCell}>
                                            {click.device_type === 'mobile' ? (
                                                <Smartphone className={styles.deviceIcon} />
                                            ) : (
                                                <Monitor className={styles.deviceIcon} />
                                            )}
                                            {click.device_type}
                                        </div>
                                    </td>
                                    <td>{getBrowserInfo(click.user_agent)}</td>
                                    <td>
                                        <div className={styles.referrerCell}>
                                            {click.referrer ? (
                                                <a href={click.referrer} target="_blank" rel="noopener noreferrer">
                                                    {new URL(click.referrer).hostname}
                                                </a>
                                            ) : (
                                                <span className={styles.direct}>Direct</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredClicks.length === 0 && (
                    <div className={styles.emptyState}>
                        <WhatsApp className={styles.emptyIcon} />
                        <h3>No WhatsApp clicks found</h3>
                        <p>Click data will appear here when users interact with the WhatsApp button.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default WhatsAppDashboard