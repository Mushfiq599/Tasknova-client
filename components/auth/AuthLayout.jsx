'use client'

import Link from 'next/link'
import Logo from '../shared/Logo'

const AuthLayout = ({ children, title, subtitle, footerText, footerLink, footerLabel }) => {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            padding: '24px',
        }}>
            {/* Background */}
            <div className="bg-grid" style={{ position: 'fixed', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />
            <div style={{
                position: 'fixed', top: '20%', left: '10%',
                width: '300px', height: '300px',
                background: 'radial-gradient(circle, #00D4FF12, transparent 70%)',
                borderRadius: '50%', pointerEvents: 'none',
            }} />
            <div style={{
                position: 'fixed', bottom: '20%', right: '10%',
                width: '300px', height: '300px',
                background: 'radial-gradient(circle, #7C3AED12, transparent 70%)',
                borderRadius: '50%', pointerEvents: 'none',
            }} />

            {/* Card */}
            <div style={{
                width: '100%',
                maxWidth: '460px',
                position: 'relative',
                zIndex: 1,
            }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <Logo size="lg" />
                </div>

                <div className="card" style={{
                    borderColor: '#1B3358',
                    boxShadow: '0 8px 40px #00000055',
                }}>
                    {/* Header */}
                    <div style={{ marginBottom: '28px', textAlign: 'center' }}>
                        <h1 style={{
                            fontSize: '22px', fontWeight: 700,
                            color: '#E8EAF0', marginBottom: '6px',
                            fontFamily: 'Space Grotesk, sans-serif',
                        }}>
                            {title}
                        </h1>
                        <p style={{ fontSize: '13px', color: '#8892A4' }}>{subtitle}</p>
                    </div>

                    {children}
                </div>

                {/* Footer link */}
                <p style={{
                    textAlign: 'center', marginTop: '20px',
                    fontSize: '13px', color: '#8892A4',
                }}>
                    {footerText}{' '}
                    <Link href={footerLink} style={{
                        color: '#00D4FF', textDecoration: 'none', fontWeight: 500,
                    }}>
                        {footerLabel}
                    </Link>
                </p>

                {/* Back home */}
                <p style={{ textAlign: 'center', marginTop: '12px' }}>
                    <Link href="/" style={{
                        fontSize: '12px', color: '#4A5568',
                        textDecoration: 'none', transition: 'color 0.2s',
                    }}>
                        ← Back to Home
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default AuthLayout