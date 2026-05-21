'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'

const palette = {
  cyan:   { dark:{ val:'#00D4FF', bg:'#00D4FF12', border:'#00D4FF33', glow:'#00D4FF' }, light:{ val:'#0284C7', bg:'rgba(2,132,199,0.08)', border:'rgba(2,132,199,0.3)', glow:'#0284C7' } },
  purple: { dark:{ val:'#A78BFA', bg:'#7C3AED12', border:'#7C3AED33', glow:'#A78BFA' }, light:{ val:'#7C3AED', bg:'rgba(124,58,237,0.08)', border:'rgba(124,58,237,0.3)', glow:'#7C3AED' } },
  green:  { dark:{ val:'#34D399', bg:'#10B98112', border:'#10B98133', glow:'#34D399' }, light:{ val:'#059669', bg:'rgba(16,185,129,0.08)', border:'rgba(16,185,129,0.3)', glow:'#059669' } },
  amber:  { dark:{ val:'#FCD34D', bg:'#F59E0B12', border:'#F59E0B33', glow:'#FCD34D' }, light:{ val:'#D97706', bg:'rgba(245,158,11,0.08)', border:'rgba(245,158,11,0.3)', glow:'#D97706' } },
}

const StatCard = ({ label, value, icon, color='cyan', sub, delay=0 }) => {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const cardRef = useRef(null)

  const c = (palette[color] || palette.cyan)[isLight ? 'light' : 'dark']

  const surfaceBg = isLight ? '#F0F9FF' : '#111827'
  const surfaceBorder = isLight ? c.border : '#1B3358'
  const labelClr = isLight ? '#0C4A6E' : '#8892A4'
  const subClr   = isLight ? '#0369A1' : '#4A5568'
  const textClr  = isLight ? '#0C1A2E' : '#E8EAF0'

  /* entrance animation via IntersectionObserver */
  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(24px)'
    el.style.transition = `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
        observer.disconnect()
      }
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={cardRef}
      className="stat-card-animated"
      style={{
        background: surfaceBg,
        border: `1px solid ${surfaceBorder}`,
        borderRadius: '12px',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = c.val
        e.currentTarget.style.boxShadow = `0 0 0 1px ${c.val}22, 0 8px 32px ${c.glow}18`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = surfaceBorder
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Subtle top accent line */}
      <div style={{
        position:'absolute', top:0, left:0, right:0, height:'2px',
        background:`linear-gradient(90deg, ${c.val}00, ${c.val}88, ${c.val}00)`,
        borderRadius:'12px 12px 0 0',
      }} />

      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
        <div style={{ flex:1 }}>
          <p style={{ fontSize:'12px', color:labelClr, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'10px', fontWeight:500 }}>
            {label}
          </p>
          <p style={{ fontSize:'28px', fontWeight:700, color:c.val, lineHeight:1, fontFamily:'Space Grotesk, sans-serif' }}>
            {value}
          </p>
          {sub && (
            <p style={{ fontSize:'12px', color:subClr, marginTop:'8px' }}>{sub}</p>
          )}
        </div>

        {icon && (
          <div style={{
            width:'46px', height:'46px',
            background: c.bg,
            border: `1px solid ${c.border}`,
            borderRadius:'10px',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'20px', color:c.val,
            flexShrink:0, marginLeft:'12px',
            transition:'transform 0.25s ease',
          }}
            className="stat-icon"
          >
            {icon}
          </div>
        )}
      </div>

      <style>{`
        .stat-card-animated:hover .stat-icon {
          transform: scale(1.12) rotate(-4deg);
        }
      `}</style>
    </div>
  )
}

export default StatCard