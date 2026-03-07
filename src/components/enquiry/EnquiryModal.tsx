'use client';

import React, { useState } from 'react';
import styles from './EnquiryModal.module.css';
import { service } from '@/data/details';
import { supabase } from '@/lib/supabase';
import NotificationModal from '@/components/notification/NotificationModal';
import Button from '@/components/button/Button';

interface EnquiryModalProps {
  open: boolean;
  onClose: () => void;
}

export default function EnquiryModal({ open, onClose }: EnquiryModalProps) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationType, setNotificationType] = useState<'success'|'error'|'warning'>('success');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobile(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !mobile || !serviceType) {
      setNotificationType('warning');
      setNotificationMessage('All fields are required.');
      setNotificationOpen(true);
      return;
    }

    if (mobile.length !== 10) {
      setNotificationType('warning');
      setNotificationMessage('Please enter a valid 10-digit mobile number.');
      setNotificationOpen(true);
      return;
    }

    setIsSubmitting(true);

    const { error: supaErr } = await supabase.from('enquiries').insert([
      {
        name,
        mobile,
        service_type: serviceType,
        submitted_at: new Date().toISOString(),
      },
    ]);

    setIsSubmitting(false);

    if (supaErr) {
      setNotificationType('error');
      setNotificationMessage('Submission failed, please try again later.');
      setNotificationOpen(true);
      console.error(supaErr);
    } else {
      setNotificationType('success');
      setNotificationMessage('Your enquiry has been submitted successfully.');
      setNotificationOpen(true);
      setName('');
      setMobile('');
      setServiceType('');
      // Close the enquiry modal after successful submission
      setTimeout(() => {
        onClose();
      }, 2000); // Close after 2 seconds to show success message
    }
  };

  if (!open) return null;

  return (
    <>
      <div className={styles.modalBackdrop} onClick={onClose}>
        <div className={styles.modalContainer} onClick={e => e.stopPropagation()}>
          <h2 className={styles.modalHeader}>Enquiry Form</h2>
          <div style={{ padding: '24px' }}>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="mobile">Mobile Number</label>
                <input
                  type="tel"
                  id="mobile"
                  value={mobile}
                  onChange={handleMobileChange}
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="service">Service Type</label>
                <select
                  id="service"
                  value={serviceType}
                  onChange={e => setServiceType(e.target.value)}
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
                <Button variant="secondary" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <NotificationModal
        open={notificationOpen}
        type={notificationType}
        message={notificationMessage}
        onClose={() => setNotificationOpen(false)}
      />
    </>
  );
}
