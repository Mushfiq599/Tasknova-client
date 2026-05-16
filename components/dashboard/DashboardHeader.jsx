'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiMenu, FiLogOut } from 'react-icons/fi'
import { IoNotificationsOutline } from 'react-icons/io5'
import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'
import NotificationPanel from './NotificationPanel'
import ThemeToggle from '../ui/ThemeToggle'
import { capitalize } from '../../utils/helpers'

const DashboardHeader = ({ onMenuClick }) => {
    const { user, role, coins, logout } = useAuth()
    const router = useRouter()
    const [notifOpen, setNotifOpen] = useState(false)

    const handleLogout = async () => {
        await logout()
        toast.success('Logged out successfully')
        router.push('/')
    }

    return (
        <header style={{
            height: '64px',
            background: '#080C18',
            borderBottom: '1px solid #1B3358',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            position: 'sticky',
            top: 0,
            zIndex: 30,
        }}>
            {/* Left — mobile menu + page title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                    onClick={onMenuClick}
                    className="mobile-menu-btn"
                    style={{
                        background: 'transparent', border: 'none',
                        cursor: 'pointer', color: '#8892A4',
                        display: 'none', padding: '4px',
                    }}
                >
                    <FiMenu size={20} />
                </button>
                <div>
                    <p style={{ fontSize: '13px', color: '#4A5568' }}>Welcome back,</p>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#E8EAF0', lineHeight: 1.2 }}>
                        {user?.displayName || user?.email?.split('@')[0]}
                    </p>
                </div>
            </div>

            {/* Right — coins + notif + avatar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Coin display */}
                <div style={{
                    background: '#7C3AED18',
                    border: '1px solid #7C3AED44',
                    borderRadius: '20px',
                    padding: '5px 14px',
                    display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                    <span style={{ color: '#00D4FF', fontSize: '14px' }}>⬡</span>
                    <span style={{ fontSize: '13px', color: '#A78BFA', fontWeight: 500 }}>
                        {coins ?? 0}
                    </span>
                </div>

                {/* Notifications */}
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => setNotifOpen(o => !o)}
                        style={{
                            background: 'transparent',
                            border: '1px solid #1B3358',
                            borderRadius: '8px',
                            padding: '7px',
                            cursor: 'pointer',
                            color: '#8892A4',
                            display: 'flex',
                            position: 'relative',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = '#2A4A7A'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = '#1B3358'}
                    >
                        <IoNotificationsOutline size={18} />
                        {/* Unread dot */}
                        <span style={{
                            position: 'absolute', top: '6px', right: '6px',
                            width: '7px', height: '7px',
                            background: '#00D4FF',
                            borderRadius: '50%',
                            border: '1.5px solid #080C18',
                        }} />
                    </button>

                    <NotificationPanel
                        isOpen={notifOpen}
                        onClose={() => setNotifOpen(false)}
                    />
                </div>

                {/* Role badge */}
                <span className={`badge-${role || 'worker'}`} style={{ fontSize: '11px' }} >
                    {capitalize(role || 'worker')}
                </span>

                {/* Theme toggle */}
                <ThemeToggle />

                {/* Avatar */}
                <img
                    src={user?.photoURL || `https://api.dicebear.com/7.x/identicon/svg?seed=${user?.email}`}
                    alt="avatar"
                    style={{
                        width: '34px', height: '34px',
                        borderRadius: '50%',
                        border: '2px solid #1B3358',
                        objectFit: 'cover',
                    }}
                />

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    style={{
                        background: 'transparent',
                        border: '1px solid #1B3358',
                        borderRadius: '8px',
                        padding: '7px',
                        cursor: 'pointer',
                        color: '#8892A4',
                        display: 'flex',
                        transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.borderColor = '#EF4444'
                        e.currentTarget.style.color = '#F87171'
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.borderColor = '#1B3358'
                        e.currentTarget.style.color = '#8892A4'
                    }}
                >
                    <FiLogOut size={16} />
                </button>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
        </header>
    )
}

export default DashboardHeader