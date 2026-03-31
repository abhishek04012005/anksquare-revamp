'use client';

import React, { useState, useEffect } from 'react';
import styles from './EnquiryModal.module.css';
import { service } from '@/data/details';
import { supabase } from '@/lib/supabase';
import NotificationModal from '@/components/notification/NotificationModal';
import Button from '@/components/button/Button';

interface EnquiryModalProps {
  open: boolean;
  onClose: () => void;
  selectedService?: string;
}

interface FormData {
  name: string;
  phone: string;
  service: string;
}

interface FormErrors {
  name: string;
  phone: string;
}

export default function EnquiryModal({ open, onClose, selectedService }: EnquiryModalProps) {
  const defaultService = service.websiteDevelopment.title

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    service: selectedService || defaultService,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    phone: ''
  })

  // Lock body scroll when popup is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  // Update service if selectedService changes
  useEffect(() => {
    setFormData(prev => ({ ...prev, service: selectedService || defaultService }))
  }, [selectedService, defaultService])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const nameValid = /^[A-Za-z\s]+$/.test(formData.name.trim())
    const phoneValid = /^[6-9]\d{9}$/.test(formData.phone)

    if (!nameValid || !phoneValid) {
      setErrors({
        name: nameValid ? '' : 'Please enter a valid name',
        phone: phoneValid ? '' : 'Please enter a valid 10-digit number'
      })
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('quotes')
        .insert([
          {
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            service: formData.service,
            status: 'pending'
          }
        ])

      if (error) throw error

      setSubmitted(true)

      // Auto-close after 2 seconds
      setTimeout(() => {
        onClose()
        setSubmitted(false)
        setFormData({
          name: '',
          phone: '',
          service: selectedService || defaultService,
        })
        setErrors({ name: '', phone: '' })
      }, 2000)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!open) return null;

  return (
    <>
      <div className={styles.modalBackdrop} onClick={onClose}>
        <div className={styles.modalContainer} onClick={e => e.stopPropagation()}>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close enquiry popup"
          >
            ×
          </button>
          <h2 className={styles.modalHeader}>Enquiry Form</h2>
          <div style={{ padding: '24px' }}>
            {submitted ? (
              <div className={styles.successMessage}>
                <p>Thank you! Your enquiry has been submitted successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    placeholder='Enter Your Name'
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className={errors.name ? styles.error : ''}
                  />
                  {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Mobile Number</label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                    placeholder="Enter 10-digit mobile number"
                    maxLength={10}
                    className={errors.phone ? styles.error : ''}
                  />
                  {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="service">Service Type</label>
                  <select
                    id="service"
                    value={formData.service}
                    onChange={e => setFormData(prev => ({ ...prev, service: e.target.value }))}
                  >
                    <option value="">-- choose --</option>
                    {Object.values(service).map(s => (
                      <option key={s.title} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.buttonGroup}>
                  <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
