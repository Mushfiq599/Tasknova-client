'use client'

import { useTheme } from '../../context/ThemeContext'

const stats = [
    { value: '10,000+', label: 'Registered Workers', icon: '👷', color: 'cyan' },
    { value: '50,000+', label: 'Tasks Completed', icon: '✅', color: 'purple' },
    { value: '$120K+', label: 'Total Paid Out', icon: '💰', color: 'green' },
    { value: '2,500+', label: 'Active Buyers', icon: '🧑‍💼', color: 'amber' },
]

const darkColors = {
    cyan: { val: '#00D4FF', bg: '#00D4FF12', border: '#00D4FF33' },
    purple: { val: '#A78BFA', bg: '#7C3AED12', border: '#7C3AED33' },
    green: { val: '#34D399', bg: '#10B98112', border: '#10B98133' },
    amber: { val: '#FCD34D', bg: '#F59E0B12', border: '#F59E0B33' },
}

const lightColors = {
    cyan: { val: '#0284C7', bg: '#0284C718', border: '#0284C744' },
    purple: { val: '#6D28D9', bg: '#7C3AED18', border: '#7C3AED44' },
    green: { val: '#059669', bg: '#10B98118', border: '#10B98144' },
    amber: { val: '#D97706', bg: '#F59E0B18', border: '#F59E0B44' },
}

const StatsSection = () => {
    const { theme } = useTheme()
    const isLight = theme === 'light'
    const colorMap = isLight ? lightColors : darkColors

    return (
        <section style={{ padding: '0 0 80px', background: 'transparent' }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '16px',
                }} className="stats-grid">
                    {stats.map(({ value, label, icon, color }) => {
                        const c = colorMap[color]
                        return (
                            <div key={label} style={{
                                background: isLight ? '#F0F9FF' : '#111827',
                                border: `1px solid ${c.border}`,
                                borderRadius: '12px', padding: '20px',
                                textAlign: 'center',
                            }}>
                                <div style={{
                                    width: '48px', height: '48px',
                                    background: c.bg, border: `1px solid ${c.border}`,
                                    borderRadius: '12px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '22px', margin: '0 auto 12px',
                                }}>
                                    {icon}
                                </div>
                                <p style={{ fontSize: '26px', fontWeight: 700, color: c.val }}>{value}</p>
                                <p style={{ fontSize: '13px', color: isLight ? '#0C4A6E' : '#8892A4', marginTop: '4px' }}>{label}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <style>{`
        @media (max-width: 768px) { .stats-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .stats-grid { grid-template-columns: 1fr !important; } }
      `}</style>
        </section>
    )
}

export default StatsSection