'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiMenu, FiLogOut } from 'react-icons/fi'
import { IoNotificationsOutline } from 'react-icons/io5'
import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'
import { useTheme } from '../../context/ThemeContext'
import NotificationPanel from './NotificationPanel'
import ThemeToggle from '../ui/ThemeToggle'
import { capitalize } from '../../utils/helpers'

const DashboardHeader = ({ onMenuClick }) => {
    const { user, role, coins, logout } = useAuth()
    const { theme } = useTheme()
    const router = useRouter()
    const [notifOpen, setNotifOpen] = useState(false)

    const isLight = theme === 'light'

    // ── Theme tokens ──────────────────────────────────────────────────────────
    const headerBg     = isLight ? '#BAE6FD' : '#080C18'
    const headerBorder = isLight ? '#38BDF8' : '#1B3358'
    const mutedColor   = isLight ? '#0C4A6E' : '#8892A4'
    const strongColor  = isLight ? '#0C1A2E' : '#E8EAF0'
    const iconBorder   = isLight ? '#7DD3FC' : '#1B3358'
    const iconColor    = isLight ? '#0369A1' : '#8892A4'
    const notifDot     = isLight ? '#0284C7' : '#00D4FF'
    const dotBorder    = isLight ? '#BAE6FD' : '#080C18'
    const avatarBorder = isLight ? '#38BDF8' : '#1B3358'
    const coinBg       = isLight ? '#BAE6FD' : '#7C3AED18'
    const coinBorder   = isLight ? '#38BDF8' : '#7C3AED55'
    const coinColor    = isLight ? '#0369A1' : '#A78BFA'
    const coinIcon     = isLight ? '#0284C7' : '#00D4FF'

    const handleLogout = async () => {
        await logout()
        toast.success('Logged out successfully')
        router.push('/')
    }

    return (
        <header style={{
            height: '64px',
            background: headerBg,
            borderBottom: `1px solid ${headerBorder}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            position: 'sticky',
            top: 0,
            zIndex: 30,
            transition: 'background 0.3s ease',
        }}>
            {/* Left — mobile menu + welcome */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                    onClick={onMenuClick}
                    className="mobile-menu-btn"
                    style={{
                        background: 'transparent', border: 'none',
                        cursor: 'pointer', color: mutedColor,
                        display: 'none', padding: '4px',
                    }}
                >
                    <FiMenu size={20} />
                </button>
                <div>
                    <p style={{ fontSize: '13px', color: mutedColor }}>Welcome back,</p>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: strongColor, lineHeight: 1.2 }}>
                        {user?.displayName || user?.email?.split('@')[0]}
                    </p>
                </div>
            </div>

            {/* Right — coins + notif + role + avatar + logout */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

                {/* Coin pill */}
                <div style={{
                    background: coinBg,
                    border: `1px solid ${coinBorder}`,
                    borderRadius: '20px',
                    padding: '5px 14px',
                    fontSize: '13px',
                    color: coinColor,
                    display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                    <span style={{ color: coinIcon }}>⬡</span>
                    <span>{coins ?? 0} coins</span>
                </div>

                {/* Notification bell */}
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => setNotifOpen(!notifOpen)}
                        style={{
                            background: 'transparent',
                            border: `1px solid ${iconBorder}`,
                            borderRadius: '8px',
                            padding: '7px',
                            cursor: 'pointer',
                            color: iconColor,
                            display: 'flex',
                            position: 'relative',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = isLight ? '#0284C7' : '#2A4A7A'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = iconBorder}
                    >
                        <IoNotificationsOutline size={18} />
                        {/* Unread dot */}
                        <span style={{
                            position: 'absolute', top: '6px', right: '6px',
                            width: '7px', height: '7px',
                            background: notifDot,
                            borderRadius: '50%',
                            border: `1.5px solid ${dotBorder}`,
                        }} />
                    </button>

                    <NotificationPanel
                        isOpen={notifOpen}
                        onClose={() => setNotifOpen(false)}
                    />
                </div>

                {/* Role badge */}
                <span className={`badge-${role || 'worker'}`} style={{ fontSize: '11px' }}>
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
                        border: `2px solid ${avatarBorder}`,
                        objectFit: 'cover',
                    }}
                />

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    style={{
                        background: 'transparent',
                        border: `1px solid ${iconBorder}`,
                        borderRadius: '8px',
                        padding: '7px',
                        cursor: 'pointer',
                        color: iconColor,
                        display: 'flex',
                        transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.borderColor = '#EF4444'
                        e.currentTarget.style.color = '#F87171'
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.borderColor = iconBorder
                        e.currentTarget.style.color = iconColor
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