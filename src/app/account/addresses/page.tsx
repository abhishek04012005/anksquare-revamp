'use client'
import { useState, useRef } from 'react'
import AddressForm from '@/components/address/AddressForm'
import AddressList from '@/components/address/AddressList'
import styles from './page.module.css'

interface AddressFormData {
  street: string
  city: string
  state: string
  zipcode: string
  phone: string
  email: string
}

export default function AddressesPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<AddressFormData | null>(null)
  const listRef = useRef<{ refresh: () => void }>(null)

  const handleEdit = (address: AddressFormData) => {
    setEditingAddress(address)
    setShowForm(true)
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingAddress(null)
    // Refresh the address list
    listRef.current?.refresh?.()
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingAddress(null)
  }

  const handleAddClick = () => {
    setEditingAddress(null)
    setShowForm(true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h1>Manage Addresses</h1>
        <p>Save and manage delivery addresses for faster checkout</p>
      </div>

      <div className={styles.content}>
        {showForm ? (
          <div className={styles.formWrapper}>
            <button
              onClick={handleCloseForm}
              className={styles.backButton}
            >
              ← Back to Addresses
            </button>
            <AddressForm
              onSuccess={handleFormSuccess}
              initialData={editingAddress || undefined}
              isEditing={!!editingAddress}
            />
          </div>
        ) : (
          <AddressList 
            ref={listRef}
            onEdit={handleEdit}
            onAddClick={handleAddClick}
          />
        )}
      </div>
    </div>
  )
}
