"use client";

import { useState, useEffect } from 'react';
import EnquiryModal from '../components/enquiry/EnquiryModal';
import Hero from '@/components/hero/hero';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(true);

  // open on initial render
  useEffect(() => {
    setModalOpen(true);
  }, []);

  return (
    <>
      <EnquiryModal open={modalOpen} onClose={() => setModalOpen(false)} />
        <Hero/>
    </>
  );
}
