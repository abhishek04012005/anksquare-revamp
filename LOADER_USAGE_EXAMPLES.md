# Loader & SkeletonLoader - Practical Usage Examples

This file contains practical examples of using the Loader and SkeletonLoader components in real-world scenarios.

## Basic Usage

### Example 1: Simple Data Fetching with Loader

```typescript
'use client'
import { useState, useEffect } from 'react'
import { Loader } from '@/components/loader'

export default function UsersList() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/users')
            const data = await response.json()
            setUsers(data)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            {loading ? (
                <Loader message="Loading users..." type="spinner" size="large" />
            ) : (
                <div>
                    {users.map(user => (
                        <div key={user.id}>{user.name}</div>
                    ))}
                </div>
            )}
        </div>
    )
}
```

### Example 2: Skeleton Loader for Data Updates

```typescript
'use client'
import { useState, useEffect } from 'react'
import { SkeletonLoader } from '@/components/loader'

export default function Dashboard() {
    const [data, setData] = useState(null)
    const [isUpdating, setIsUpdating] = useState(true)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        setIsUpdating(true)
        try {
            const response = await fetch('/api/dashboard')
            const result = await response.json()
            setData(result)
        } finally {
            setIsUpdating(false)
        }
    }

    return (
        <div>
            {isUpdating ? (
                <SkeletonLoader type="dashboard" count={5} />
            ) : (
                <div>
                    {/* Render your dashboard content */}
                </div>
            )}
        </div>
    )
}
```

## Advanced Scenarios

### Example 3: Table with Skeleton Loader

```typescript
'use client'
import { useState, useEffect } from 'react'
import { SkeletonLoader, Loader } from '@/components/loader'

interface Product {
    id: string
    name: string
    price: number
    stock: number
}

export default function ProductsTable() {
    const [products, setProducts] = useState<Product[]>([])
    const [isInitialLoad, setIsInitialLoad] = useState(true)
    const [isRefreshing, setIsRefreshing] = useState(false)

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = async () => {
        try {
            const response = await fetch('/api/products')
            const data = await response.json()
            setProducts(data)
        } finally {
            setIsInitialLoad(false)
            setIsRefreshing(false)
        }
    }

    const refresh = async () => {
        setIsRefreshing(true)
        await loadProducts()
    }

    // Initial load - show full page loader
    if (isInitialLoad) {
        return <Loader message="Loading products..." type="spinner" size="large" />
    }

    return (
        <div>
            <button onClick={refresh} disabled={isRefreshing}>
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>

            {/* Show skeleton while refreshing to prevent layout shift */}
            {isRefreshing ? (
                <SkeletonLoader type="table" count={10} />
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
```

### Example 4: Grid of Cards with Different Loader Types

```typescript
'use client'
import { useState, useEffect } from 'react'
import { SkeletonLoader, Loader } from '@/components/loader'

interface BlogPost {
    id: string
    title: string
    image: string
    excerpt: string
}

export default function BlogGrid() {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [isInitialLoad, setIsInitialLoad] = useState(true)

    useEffect(() => {
        loadPosts()
    }, [])

    const loadPosts = async () => {
        try {
            const response = await fetch('/api/blog')
            const data = await response.json()
            setPosts(data)
        } finally {
            setIsInitialLoad(false)
        }
    }

    return (
        <div>
            {isInitialLoad ? (
                // Show skeleton grid on initial load
                <SkeletonLoader type="grid" count={6} gridColumns="cols3" />
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                    {posts.map(post => (
                        <div key={post.id} className="card">
                            <img src={post.image} alt={post.title} />
                            <h3>{post.title}</h3>
                            <p>{post.excerpt}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
```

### Example 5: Form Submission with Loader

```typescript
'use client'
import { useState } from 'react'
import { Loader } from '@/components/loader'

interface FormData {
    name: string
    email: string
    message: string
}

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                setSubmitted(true)
                setFormData({ name: '', email: '', message: '' })
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    if (submitted) {
        return <div>Thank you for contacting us!</div>
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                disabled={isSubmitting}
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                disabled={isSubmitting}
            />
            <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                disabled={isSubmitting}
            />
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send'}
            </button>

            {isSubmitting && (
                <Loader message="Sending your message..." type="dots" size="compact" />
            )}
        </form>
    )
}
```

### Example 6: Infinite Scroll with Loaders

```typescript
'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Loader, SkeletonLoader } from '@/components/loader'

interface Item {
    id: string
    title: string
}

export default function InfiniteScroll() {
    const [items, setItems] = useState<Item[]>([])
    const [page, setPage] = useState(0)
    const [isInitialLoad, setIsInitialLoad] = useState(true)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const observerTarget = useRef(null)

    // Initial load
    useEffect(() => {
        loadItems(0)
    }, [])

    const loadItems = async (pageNum: number) => {
        try {
            const response = await fetch(`/api/items?page=${pageNum}`)
            const data = await response.json()

            if (pageNum === 0) {
                setItems(data.items)
            } else {
                setItems(prev => [...prev, ...data.items])
            }

            setHasMore(data.hasMore)
            setPage(pageNum + 1)
        } finally {
            setIsInitialLoad(false)
            setIsLoadingMore(false)
        }
    }

    const loadMore = useCallback(() => {
        if (!isLoadingMore && hasMore) {
            setIsLoadingMore(true)
            loadItems(page)
        }
    }, [page, isLoadingMore, hasMore])

    // Intersection Observer for infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    loadMore()
                }
            },
            { threshold: 0.1 }
        )

        if (observerTarget.current) {
            observer.observe(observerTarget.current)
        }

        return () => observer.disconnect()
    }, [loadMore])

    if (isInitialLoad) {
        return <SkeletonLoader type="card" count={5} />
    }

    return (
        <>
            <div>
                {items.map(item => (
                    <div key={item.id}>{item.title}</div>
                ))}
            </div>

            {isLoadingMore && (
                <SkeletonLoader type="card" count={3} />
            )}

            {hasMore && (
                <div ref={observerTarget} style={{ padding: '2rem', textAlign: 'center' }}>
                    <Loader message="Loading more..." type="dots" size="compact" />
                </div>
            )}

            {!hasMore && (
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                    No more items
                </div>
            )}
        </>
    )
}
```

### Example 7: Multiple States with Different Loaders

```typescript
'use client'
import { useState, useEffect } from 'react'
import { Loader, SkeletonLoader } from '@/components/loader'

interface ApiResponse {
    data: any[]
    error?: string
}

export default function MultiStateComponent() {
    const [state, setState] = useState<'idle' | 'loading' | 'updating' | 'success' | 'error'>('idle')
    const [data, setData] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        loadInitialData()
    }, [])

    const loadInitialData = async () => {
        setState('loading')
        try {
            const response = await fetch('/api/data')
            const result: ApiResponse = await response.json()

            if (result.error) {
                setError(result.error)
                setState('error')
            } else {
                setData(result.data)
                setState('success')
            }
        } catch (err) {
            setError('Failed to load data')
            setState('error')
        }
    }

    const refresh = async () => {
        setState('updating')
        try {
            const response = await fetch('/api/data')
            const result: ApiResponse = await response.json()

            if (result.error) throw new Error(result.error)
            setData(result.data)
            setState('success')
        } catch (err) {
            setError(String(err))
            setState('error')
        }
    }

    // Render based on state
    switch (state) {
        case 'loading':
            return <Loader message="Loading data..." type="spinner" size="large" />

        case 'updating':
            return <SkeletonLoader type="card" count={5} />

        case 'error':
            return (
                <div>
                    <p>Error: {error}</p>
                    <button onClick={loadInitialData}>Try Again</button>
                </div>
            )

        case 'success':
            return (
                <div>
                    <button onClick={refresh}>Refresh</button>
                    {data.map((item, idx) => (
                        <div key={idx}>{item}</div>
                    ))}
                </div>
            )

        default:
            return <button onClick={loadInitialData}>Load Data</button>
    }
}
```

## Custom Styling Examples

### Example 8: Custom Styled Loader

```typescript
// MyCustomLoader.tsx
import { Loader } from '@/components/loader'
import styles from './MyCustomLoader.module.css'

export default function MyCustomLoader() {
    return (
        <Loader
            message="Loading your awesome content..."
            type="wave"
            size="large"
            className={styles.customLoader}
        />
    )
}
```

```css
/* MyCustomLoader.module.css */
.customLoader {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 1rem;
    padding: 3rem;
}

.customLoader :global(.loadingText) {
    color: white;
    font-weight: 600;
}
```

## Performance Tips

1. **Memoize loaders for frequently updated components**
```typescript
const MemoizedLoader = React.memo(() => <Loader />)
```

2. **Use SkeletonLoader for better perceived performance**
- Maintains layout stability
- Shows users content is loading
- Better than full-page loaders

3. **Combine with Suspense (React 18+)**
```typescript
<Suspense fallback={<Loader message="Loading..." />}>
    <MyAsyncComponent />
</Suspense>
```

4. **Lazy load heavy components**
```typescript
const HeavyComponent = lazy(() => import('./HeavyComponent'))

<Suspense fallback={<SkeletonLoader type="dashboard" />}>
    <HeavyComponent />
</Suspense>
```

## Common Patterns

### Polling with Loader
```typescript
useEffect(() => {
    const interval = setInterval(refresh, 5000)
    return () => clearInterval(interval)
}, [])
```

### Debounced Refresh
```typescript
const debouncedRefresh = useMemo(
    () => debounce(() => refresh(), 300),
    []
)
```

### Progressive Loading
```typescript
{isInitialLoad && <Loader size="large" />}
{!isInitialLoad && isRefreshing && <SkeletonLoader type="card" count={3} />}
{!isInitialLoad && !isRefreshing && <YourContent />}
```
