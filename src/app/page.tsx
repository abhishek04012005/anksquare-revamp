"use client";

import { useState, useEffect } from 'react';
import EnquiryModal from '../components/enquiry/EnquiryModal';
import Hero from '@/components/hero/hero';
import About from '@/components/about/about';
import Contact from '@/components/contact/contact';
import Testimonial from '@/components/testimonial/testimonial';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(true);

  // open on initial render
  useEffect(() => {
    setModalOpen(true);
  }, []);

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="sr-only">Skip to main content</a>
      
      <EnquiryModal open={modalOpen} onClose={() => setModalOpen(false)} />
      
      <main id="main-content" role="main">
        <Hero />
        <About />
        <Testimonial/>
        <Contact/>
      </main>
    </>
  );
}
