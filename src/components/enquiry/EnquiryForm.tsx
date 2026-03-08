'use client';

import React, { useState } from 'react';
import { service } from '@/data/details';
import { supabase } from '@/lib/supabase';
import NotificationModal from '@/components/notification/NotificationModal';
import Button from '@/components/button/Button';
import styles from './EnquiryForm.module.css';

export default function EnquiryForm() {
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
      setNotificationMessage('Your enquiry has been submitted successfully. We will get back to you within 24 hours.');
      setNotificationOpen(true);
      setName('');
      setMobile('');
      setServiceType('');
    }
  };

  return (
    <>
      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>Send us your enquiry</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className={styles.input}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="mobile" className={styles.label}>
              Mobile Number *
            </label>
            <input
              type="tel"
              id="mobile"
              value={mobile}
              onChange={handleMobileChange}
              className={styles.input}
              placeholder="Enter 10-digit mobile number"
              maxLength={10}
              required
            />
            <small className={styles.helpText}>
              We will contact you on this number
            </small>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="service" className={styles.label}>
              Service Type *
            </label>
            <select
              id="service"
              value={serviceType}
              onChange={e => setServiceType(e.target.value)}
              className={styles.select}
              required
            >
              <option value="">-- Choose a service --</option>
              {Object.values(service).map(s => (
                <option key={s.title} value={s.title}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>

          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
          </Button>
        </form>
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