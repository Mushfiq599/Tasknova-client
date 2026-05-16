'use client'

import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext'

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <button
            onClick={toggleTheme}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
                background: 'transparent',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '7px',
                cursor: 'pointer',
                color: 'var(--color-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--color-cyan)'
                e.currentTarget.style.color = 'var(--color-cyan)'
            }}
            onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.color = 'var(--color-muted)'
            }}
        >
            {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
        </button>
    )
}

export default ThemeToggle