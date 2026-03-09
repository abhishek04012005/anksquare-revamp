'use client'

import { usePathname } from 'next/navigation'
import AdminNavbar from '@/adminNavbar/AdminNavbar'

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Don't show AdminNavbar on login page
  const showNavbar = pathname !== '/admin/login'

  return (
    <>
      {showNavbar && <AdminNavbar />}
      <main>
        {children}
      </main>
    </>
  )
}