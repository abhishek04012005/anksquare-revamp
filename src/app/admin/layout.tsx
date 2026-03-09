import AdminNavbar from '@/adminNavbar/AdminNavbar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AdminNavbar />
      <main>
        {children}
      </main>
    </>
  )
}