'use client'

import { useTheme } from '../../context/ThemeContext'

const SectionHeading = ({ label, title, highlight, subtitle, center = false }) => {
    const { theme } = useTheme()
    const isLight = theme === 'light'

    return (
        <div style={{ textAlign: center ? 'center' : 'left', marginBottom: '48px' }}>
            {label && (
                <span style={{
                    fontSize: '12px', fontWeight: 500,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: isLight ? '#0284C7' : '#00D4FF',
                    display: 'inline-block', marginBottom: '12px',
                }}>
                    — {label}
                </span>
            )}
            <h2 style={{
                fontSize: '32px', fontWeight: 700,
                color: isLight ? '#0284C7' : '#E8EAF0',
                lineHeight: 1.2, marginBottom: '12px',
            }}>
                {title}{' '}
                {highlight && (
                    <span style={{
                        background: isLight
                            ? 'linear-gradient(135deg, #0284C7, #7C3AED)'
                            : 'linear-gradient(135deg, #00D4FF, #A78BFA)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}>
                        {highlight}
                    </span>
                )}
            </h2>
            {subtitle && (
                <p style={{
                    fontSize: '15px',
                    color: isLight ? '#0284C7' : '#8892A4',
                    maxWidth: '540px',
                    margin: center ? '0 auto' : '0',
                    lineHeight: 1.7,
                }}>
                    {subtitle}
                </p>
            )}
        </div>
    )
}

export default SectionHeading