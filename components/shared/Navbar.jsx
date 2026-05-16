'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IoNotificationsOutline, IoMenuOutline, IoCloseOutline } from 'react-icons/io5'
import { HiOutlineLogout } from 'react-icons/hi'
import { FiGithub } from 'react-icons/fi'
import ThemeToggle from '../ui/ThemeToggle'
import Logo from './Logo'
import useAuth from '../../hooks/useAuth'

const Navbar = () => {
    const { user, role, coins, logout } = useAuth()
    const router = useRouter()
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [dropOpen, setDropOpen] = useState(false)
    const dropRef = useRef(null)

    // Shrink navbar on scroll
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (dropRef.current && !dropRef.current.contains(e.target))
                setDropOpen(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const handleLogout = async () => {
        await logout()
        router.push('/')
    }

    return (
        <nav style={{
            position: 'fixed', top: 0, left: 0, right: 0,
            zIndex: 100,
            background: scrolled ? '#080C18ee' : 'transparent',
            borderBottom: scrolled ? '1px solid #1B3358' : '1px solid transparent',
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            transition: 'all 0.3s ease',
        }}>
            <div className="container" style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
                height: scrolled ? '60px' : '72px',
                transition: 'height 0.3s ease',
            }}>
                {/* Logo */}
                <Logo />

                {/* Desktop Nav */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    className="desktop-nav">

                    {!user ? (
                        // ── Not logged in ──────────────────────────────
                        <>
                            <ThemeToggle />
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noreferrer"
                                className="btn-ghost btn-sm"
                                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                            >
                                <FiGithub size={14} /> Join as Developer
                            </a>
                            <Link href="/login" className="btn-ghost btn-sm">Login</Link>
                            <Link href="/register" className="btn-primary btn-sm">Register</Link>
                        </>
                    ) : (
                        // ── Logged in ──────────────────────────────────
                        <>
                            <ThemeToggle />
                            {/* Coin pill */}
                            <div style={{
                                background: '#7C3AED18',
                                border: '1px solid #7C3AED55',
                                borderRadius: '20px',
                                padding: '5px 14px',
                                fontSize: '13px',
                                color: '#A78BFA',
                                display: 'flex', alignItems: 'center', gap: '6px',
                            }}>
                                <span style={{ color: '#00D4FF' }}>⬡</span>
                                <span>{coins ?? 0} coins</span>
                            </div>

                            {/* Dashboard link */}
                            <Link href="/dashboard" className="btn-ghost btn-sm">
                                Dashboard
                            </Link>

                            {/* Github */}
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noreferrer"
                                className="btn-ghost btn-sm"
                                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                            >
                                <FiGithub size={14} /> Join as Developer
                            </a>

                            {/* Avatar dropdown */}
                            <div ref={dropRef} style={{ position: 'relative' }}>
                                <button
                                    onClick={() => setDropOpen(!dropOpen)}
                                    style={{
                                        background: 'transparent', border: 'none',
                                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                                    }}
                                >
                                    <img
                                        src={user?.photoURL || `https://api.dicebear.com/7.x/identicon/svg?seed=${user?.email}`}
                                        alt="avatar"
                                        style={{
                                            width: '34px', height: '34px', borderRadius: '50%',
                                            border: '2px solid #1B3358',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </button>

                                {/* Dropdown */}
                                {dropOpen && (
                                    <div style={{
                                        position: 'absolute', right: 0, top: 'calc(100% + 10px)',
                                        background: '#111827',
                                        border: '1px solid #1B3358',
                                        borderRadius: '12px',
                                        padding: '8px',
                                        minWidth: '180px',
                                        boxShadow: '0 8px 32px #00000066',
                                        animation: 'fadeUp 0.15s ease',
                                    }}>
                                        <div style={{ padding: '8px 12px 12px', borderBottom: '1px solid #1B3358', marginBottom: '8px' }}>
                                            <p style={{ fontSize: '13px', fontWeight: 600, color: '#E8EAF0' }}>
                                                {user?.displayName || 'User'}
                                            </p>
                                            <p style={{ fontSize: '11px', color: '#8892A4', marginTop: '2px' }}>
                                                {user?.email}
                                            </p>
                                            <span className={`badge-${role}`} style={{ marginTop: '6px', display: 'inline-block' }}>
                                                {capitalize(role)}
                                            </span>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            style={{
                                                width: '100%', background: 'transparent', border: 'none',
                                                cursor: 'pointer', display: 'flex', alignItems: 'center',
                                                gap: '8px', padding: '8px 12px', borderRadius: '8px',
                                                color: '#F87171', fontSize: '13px',
                                                transition: 'background 0.15s',
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.background = '#EF444415'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                        >
                                            <HiOutlineLogout size={16} /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* Mobile menu button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="mobile-menu-btn"
                    style={{
                        background: 'transparent', border: 'none',
                        cursor: 'pointer', color: '#E8EAF0',
                        display: 'none',
                    }}
                >
                    {menuOpen ? <IoCloseOutline size={26} /> : <IoMenuOutline size={26} />}
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div style={{
                    background: '#080C18',
                    borderTop: '1px solid #1B3358',
                    padding: '16px 24px',
                    display: 'flex', flexDirection: 'column', gap: '8px',
                }}>
                    {!user ? (
                        <>
                            <Link href="/login" className="btn-ghost" onClick={() => setMenuOpen(false)}>Login</Link>
                            <Link href="/register" className="btn-primary" onClick={() => setMenuOpen(false)}>Register</Link>
                            <a href="https://github.com" target="_blank" rel="noreferrer" className="btn-ghost">
                                <FiGithub size={14} /> Join as Developer
                            </a>
                        </>
                    ) : (
                        <>
                            <Link href="/dashboard" className="btn-ghost" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                            <a href="https://github.com" target="_blank" rel="noreferrer" className="btn-ghost">
                                <FiGithub size={14} /> Join as Developer
                            </a>
                            <button className="btn-danger" onClick={handleLogout}>Logout</button>
                        </>
                    )}
                </div>
            )}

            {/* Responsive style */}
            <style>{`
        @media (max-width: 768px) {
          .desktop-nav    { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
        </nav>
    )
}

export default Navbar