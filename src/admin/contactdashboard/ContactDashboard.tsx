'use client'
import { useEffect, useState } from 'react'
import { Phone, Sms, WhatsApp, Check, Archive, Search, Filter, Inbox, Close } from '@mui/icons-material'
import { supabase } from '@/lib/supabase'
import { Loader } from '@/components/loader'
import styles from './ContactDashboard.module.css'

interface Contact {
    id: string
    name: string
    number: string
    subject: string
    message: string
    status: 'new' | 'read' | 'archived'
    created_at: string
}

const ContactDashboard = () => {
    const [contacts, setContacts] = useState<Contact[]>([])
    const [loading, setLoading] = useState(true)
    const [activeFilter, setActiveFilter] = useState<'all' | 'new' | 'read' | 'archived'>('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

    useEffect(() => {
        fetchContacts()
    }, [])

    const fetchContacts = async () => {
        try {
            const { data, error } = await supabase
                .from('contacts')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error

            setContacts(data || [])
        } catch (error) {
            console.error('Error fetching contacts:', error)
        } finally {
            setLoading(false)
        }
    }

    const updateContactStatus = async (id: string, status: 'new' | 'read' | 'archived') => {
        try {
            const { error } = await supabase
                .from('contacts')
                .update({ status })
                .eq('id', id)

            if (error) throw error

            setContacts(contacts.map(contact =>
                contact.id === id ? { ...contact, status } : contact
            ))
        } catch (error) {
            console.error('Error updating contact:', error)
        }
    }

    const filteredContacts = contacts.filter(contact => {
        const matchesFilter = activeFilter === 'all' || contact.status === activeFilter
        const matchesSearch =
            contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.subject.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesFilter && matchesSearch
    })

    return (
        <div className={styles.dashboard}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Contact Submissions</h1>
                    <div className={styles.stats}>
                        <div className={styles.statItem}>
                            <Inbox />
                            <span>New: {contacts.filter(c => c.status === 'new').length}</span>
                        </div>
                        <div className={styles.statItem}>
                            <Check />
                            <span>Read: {contacts.filter(c => c.status === 'read').length}</span>
                        </div>
                        <div className={styles.statItem}>
                            <Archive />
                            <span>Archived: {contacts.filter(c => c.status === 'archived').length}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.controls}>
                    <div className={styles.search}>
                        <Search />
                        <input
                            type="text"
                            placeholder="Search contacts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className={styles.filters}>
                        <Filter />
                        <button
                            className={`${styles.filterButton} ${activeFilter === 'all' ? styles.active : ''}`}
                            onClick={() => setActiveFilter('all')}
                        >
                            All
                        </button>
                        <button
                            className={`${styles.filterButton} ${activeFilter === 'new' ? styles.active : ''}`}
                            onClick={() => setActiveFilter('new')}
                        >
                            New
                        </button>
                        <button
                            className={`${styles.filterButton} ${activeFilter === 'read' ? styles.active : ''}`}
                            onClick={() => setActiveFilter('read')}
                        >
                            Read
                        </button>
                        <button
                            className={`${styles.filterButton} ${activeFilter === 'archived' ? styles.active : ''}`}
                            onClick={() => setActiveFilter('archived')}
                        >
                            Archived
                        </button>
                    </div>
                </div>

                <div className={styles.content}>
                    {loading ? (
                        <Loader 
                            message="Loading contacts..." 
                            type="wave" 
                            size="default" 
                        />
                    ) : filteredContacts.length === 0 ? (
                        <div className={styles.empty}>No contacts found</div>
                    ) : (
                        <div className={styles.tableContainer}>
                            <table className={styles.contactsTable}>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Number</th>
                                        <th>Subject</th>
                                        <th>Message</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredContacts.map((contact) => (
                                        <tr key={contact.id} className={`${styles.contactRow} ${styles[contact.status]}`}>
                                            <td className={styles.nameCell}>{contact.name}</td>
                                            <td className={styles.numberCell}>{contact.number}</td>
                                            <td className={styles.subjectCell}>{contact.subject}</td>
                                            <td className={styles.messageCell}>
                                                {contact.message.length > 50 ? `${contact.message.substring(0, 50)}...` : contact.message}
                                            </td>
                                            <td className={styles.statusCell}>
                                                <span className={`${styles.statusBadge} ${styles[contact.status]}`}>
                                                    {contact.status}
                                                </span>
                                            </td>
                                            <td className={styles.dateCell}>
                                                {new Date(contact.created_at).toLocaleDateString()}
                                            </td>
                                            <td className={styles.actionsCell}>
                                                <div className={styles.actionButtons}>
                                                    <a
                                                        href={`tel:${contact.number}`}
                                                        className={styles.actionButton}
                                                        title="Call"
                                                    >
                                                        <Phone />
                                                    </a>
                                                    <a
                                                        href={`sms:${contact.number}`}
                                                        className={styles.actionButton}
                                                        title="Send SMS"
                                                    >
                                                        <Sms />
                                                    </a>
                                                    <a
                                                        href={`https://wa.me/91${contact.number.replace(/[^0-9]/g, '').slice(-10)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={styles.actionButton}
                                                        title="WhatsApp"
                                                    >
                                                        <WhatsApp />
                                                    </a>
                                                    <select
                                                        value={contact.status}
                                                        onChange={(e) => updateContactStatus(contact.id, e.target.value as 'new' | 'read' | 'archived')}
                                                        className={styles.statusSelect}
                                                    >
                                                        <option value="new">New</option>
                                                        <option value="read">Read</option>
                                                        <option value="archived">Archived</option>
                                                    </select>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            
                {selectedContact && (
                    <div
                        className={styles.modal}
                        onClick={() => setSelectedContact(null)}
                    >
                        <div
                            className={styles.modalContent}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className={styles.closeModal}
                                onClick={() => setSelectedContact(null)}
                            >
                                <Close />
                            </button>
                            <h2>{selectedContact.subject}</h2>
                            <div className={styles.modalMeta}>
                                <span>From: {selectedContact.name}</span>
                                <span>Number: {selectedContact.number}</span>
                                <span>Subject: {selectedContact.subject}</span>
                                <span>Date: {new Date(selectedContact.created_at).toLocaleString()}</span>
                            </div>
                            <div className={styles.messageContent}>
                                Message: {selectedContact.message}
                            </div>
                        </div>
                    </div>
                )}
            
        </div>
    )
}

export default ContactDashboard