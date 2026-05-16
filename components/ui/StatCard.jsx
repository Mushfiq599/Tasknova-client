'use client'

const StatCard = ({ label, value, icon, color = 'cyan', sub }) => {
    const colors = {
        cyan: { val: '#00D4FF', bg: '#00D4FF12', border: '#00D4FF33' },
        purple: { val: '#A78BFA', bg: '#7C3AED12', border: '#7C3AED33' },
        green: { val: '#34D399', bg: '#10B98112', border: '#10B98133' },
        amber: { val: '#FCD34D', bg: '#F59E0B12', border: '#F59E0B33' },
    }
    const c = colors[color] || colors.cyan

    return (
        <div className="card" style={{ borderColor: c.border }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                    <p style={{ fontSize: '12px', color: '#8892A4', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                        {label}
                    </p>
                    <p style={{ fontSize: '28px', fontWeight: 600, color: c.val, lineHeight: 1 }}>
                        {value}
                    </p>
                    {sub && (
                        <p style={{ fontSize: '12px', color: '#4A5568', marginTop: '6px' }}>{sub}</p>
                    )}
                </div>
                {icon && (
                    <div style={{
                        width: '44px', height: '44px',
                        background: c.bg,
                        border: `1px solid ${c.border}`,
                        borderRadius: '10px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '20px',
                    }}>
                        {icon}
                    </div>
                )}
            </div>
        </div>
    )
}

export default StatCard