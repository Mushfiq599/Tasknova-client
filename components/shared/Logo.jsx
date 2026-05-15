'use client'

import Link from 'next/link'

const Logo = ({ size = 'md' }) => {
    const sizes = {
        sm: { icon: '20px', text: '16px' },
        md: { icon: '26px', text: '20px' },
        lg: { icon: '32px', text: '26px' },
    }
    const s = sizes[size] || sizes.md

    return (
        <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center',
            gap: '10px', textDecoration: 'none',
        }}>
            {/* Hexagon icon */}
            <div style={{
                width: s.icon, height: s.icon,
                background: 'linear-gradient(135deg, #00D4FF, #7C3AED)',
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                flexShrink: 0,
            }} />
            <span style={{
                fontSize: s.text,
                fontWeight: 700,
                fontFamily: 'Space Grotesk, sans-serif',
                background: 'linear-gradient(135deg, #00D4FF, #A78BFA)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em',
            }}>
                TaskNova
            </span>
        </Link>
    )
}

export default Logo