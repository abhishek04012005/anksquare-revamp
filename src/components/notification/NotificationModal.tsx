'use client';

import styles from './NotificationModal.module.css';

type NotificationType = 'success' | 'error' | 'warning';

interface NotificationModalProps {
  open: boolean;
  type: NotificationType;
  message: string;
  onClose: () => void;
}

export default function NotificationModal({ open, type, message, onClose }: NotificationModalProps) {
  if (!open) return null;

  const headerText = {
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
  }[type];

  return (
    <div className={styles.modBackdrop} onClick={onClose}>
      <div className={styles.modContainer} onClick={e => e.stopPropagation()}>
        <h3 className={`${styles.modHeader} ${styles[type]}`}>{headerText}</h3>
        <p className={styles.modMessage}>{message}</p>
        <button className={styles.btnClose} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
