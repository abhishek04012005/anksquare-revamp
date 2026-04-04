'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import {
    FiGrid, FiMessageSquare, FiPhone,
    FiLogOut, FiMenu, FiX, FiUser, FiMessageCircle
} from 'react-icons/fi'
import styles from './AdminNavbar.module.css'

const menuItems = [
    {
        title: 'Dashboard',
        icon: <FiGrid />,
        path: '/admin/dashboard'
    },
    {
        title: 'Contacts',
        icon: <FiMessageSquare />,
        path: '/admin/contacts'
    },
    {
        title: 'Enquiries',
        icon: <FiPhone />,
        path: '/admin/enquiries'
    },
    {
        title: 'WhatsApp',
        icon: <FiMessageCircle />,
        path: '/admin/whatsapp'
    }
]

const AdminNavbar = () => {
    const router = useRouter()
    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const handleLogout = async () => {
        try {
            // Clear authentication data
            document.cookie = 'adminAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
            localStorage.removeItem('adminAuth')

            // Add small delay to ensure cookies are cleared
            await new Promise(resolve => setTimeout(resolve, 100))

            router.push('/admin/login')
        } catch (error) {
            console.error('Error logging out:', error)
        }
    }

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.container}>
                    <div className={styles.brand}>
                        <Link href="/admin/dashboard">
                            <span className={styles.logo}>Admin Panel</span>
                        </Link>
                        <button 
                            className={styles.mobileMenuButton}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
                        </button>
                    </div>

                    <div className={`${styles.menuContainer} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
                        <ul className={styles.menu}>
                            {menuItems.map((item) => (
                                <li key={item.path}>
                                    <Link 
                                        href={item.path}
                                        className={`${styles.menuItem} ${
                                            pathname === item.path ? styles.active : ''
                                        }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.icon}
                                        <span>{item.title}</span>
                                        {pathname === item.path && (
                                            <div className={styles.activeIndicator} />
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className={styles.userSection}>
                            <div className={styles.userInfo}>
                                <FiUser />
                                <span>Admin</span>
                            </div>
                            <button 
                                className={styles.logoutButton}
                                onClick={handleLogout}
                            >
                                <FiLogOut />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            
            {/* Mobile menu backdrop */}
            
                {isMobileMenuOpen && (
                    <div
                        className={styles.backdrop}
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}
            
        </>
    )
}

export default AdminNavbar