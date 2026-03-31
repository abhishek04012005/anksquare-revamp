'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { supabase } from '../../lib/supabase'
import styles from './Login.module.css'
import { profile } from '@/data/details';


const Login = () => {
    const router = useRouter()
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setErrorMessage(null)

        try {
            const { data, error } = await supabase
                .from('admin_users')
                .select('*')
                .eq('username', credentials.username)
                .eq('password', credentials.password)
                .single()

            if (error || !data) {
                setErrorMessage('Invalid username or password')
                return
            }

            // Store auth flag with 7-day expiration
            const expirationDate = new Date()
            expirationDate.setTime(expirationDate.getTime() + (7 * 24 * 60 * 60 * 1000))
            document.cookie = `adminAuth=true; path=/; expires=${expirationDate.toUTCString()}`
            localStorage.setItem('adminAuth', 'true')

            router.push('/admin/dashboard')
        } catch (err) {
            console.error('Login error:', err)
            setErrorMessage('Login failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className={styles.loginContainer}>
            <div
                className={styles.loginCard}
            >
                <div className={styles.logoContainer}>
                    <Image
                        src={profile.logo}
                        alt="Ank square Logo"
                        width={150}
                        height={50}
                        priority
                    />
                </div>

                <h1 className={styles.title}>Admin Login</h1>
                <p className={styles.subtitle}>Welcome back! Please login to continue.</p>

                {errorMessage && (
                    <div
                        className={styles.error}
                    >
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="username">Username</label>
                        <div className={styles.inputWrapper}>
                            <FiUser className={styles.inputIcon} />
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={credentials.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <div className={styles.inputWrapper}>
                            <FiLock className={styles.inputIcon} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                className={styles.showPassword}
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login