'use client'

import { usePathname } from 'next/navigation'
import Navbar from "../components/navbar/navbar"
import Footer from "@/components/footer/footer"

export default function NavigationWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  )
}