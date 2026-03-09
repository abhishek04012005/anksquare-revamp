"use client";

import { useState, useEffect } from 'react'
import EnquiryModal from '../components/enquiry/EnquiryModal'
import Hero from '@/components/hero/hero'
import About from '@/components/about/about'
import Contact from '@/components/contact/contact'
import Testimonial from '@/components/testimonial/testimonial'
import Clients from '@/components/clients/clients'
import Services from '@/components/service/service'
import Blog from '@/components/blog/blog'

export default function Home() {
  const [modalOpen, setModalOpen] = useState(true)

  // open on initial render
  useEffect(() => {
    setModalOpen(true)
  }, [])

  return (
    <>
      <EnquiryModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <main id="main-content" role="main">
        <Hero />
        <About />
        <Services />
        <Clients />
        <Blog />
        <Testimonial />
        <Contact />
      </main>
    </>
  )
}
