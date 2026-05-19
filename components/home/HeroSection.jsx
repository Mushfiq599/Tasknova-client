'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext'

// Theme-aware illustration component
const Illustration = ({ index, isLight }) => {
  const cardBg     = isLight ? '#FFFFFF' : '#111827'
  const cardBorder = isLight ? '#38BDF8' : '#1B3358'
  const textLight  = isLight ? '#0C4A6E' : '#8892A4'
  const textStrong = isLight ? '#0C1A2E' : '#E8EAF0'
  const cyan       = isLight ? '#0284C7' : '#00D4FF'
  const purple     = isLight ? '#6D28D9' : '#A78BFA'
  const bgDeep     = isLight ? '#E0F2FE' : '#0D1526'
  const green      = '#10B981'

  if (index === 0) return (
    <svg viewBox="0 0 420 360" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Main card — task */}
      <rect x="30" y="40" width="240" height="130" rx="14" fill={cardBg} stroke={cardBorder} strokeWidth="1.5"/>
      <rect x="50" y="62" width="100" height="10" rx="5" fill={cyan} opacity="0.8"/>
      <rect x="50" y="80" width="160" height="7" rx="3.5" fill={isLight ? '#BAE6FD' : '#1B3358'}/>
      <rect x="50" y="95" width="130" height="7" rx="3.5" fill={isLight ? '#BAE6FD' : '#1B3358'}/>
      <rect x="50" y="118" width="80" height="30" rx="8" fill={`${cyan}18`} stroke={cyan} strokeWidth="1"/>
      <text x="90" y="137" fontSize="11" fill={cyan} textAnchor="middle" fontFamily="Inter" fontWeight="600">View Task</text>
      {/* Coin badge */}
      <rect x="170" y="118" width="80" height="30" rx="8" fill={`${green}18`} stroke={green} strokeWidth="1"/>
      <text x="210" y="137" fontSize="11" fill={green} textAnchor="middle" fontFamily="Inter" fontWeight="600">+20 coins</text>

      {/* Worker avatar card */}
      <rect x="200" y="190" width="190" height="110" rx="14" fill={cardBg} stroke={cardBorder} strokeWidth="1.5"/>
      <circle cx="248" cy="230" r="26" fill={bgDeep} stroke={cyan} strokeWidth="1.5"/>
      <circle cx="248" cy="222" r="10" fill={isLight ? '#BAE6FD' : '#1B3358'}/>
      <path d="M224 248 Q248 238 272 248" fill={isLight ? '#BAE6FD' : '#1B3358'}/>
      {/* Check */}
      <circle cx="268" cy="212" r="10" fill={green} stroke={cardBg} strokeWidth="2"/>
      <path d="M263 212 L266 216 L274 207" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <rect x="280" y="218" width="90" height="8" rx="4" fill={cyan} opacity="0.7"/>
      <rect x="280" y="232" width="70" height="7" rx="3.5" fill={isLight ? '#BAE6FD' : '#1B3358'}/>
      <rect x="280" y="246" width="55" height="7" rx="3.5" fill={isLight ? '#BAE6FD' : '#1B3358'}/>

      {/* Floating coins */}
      <circle cx="340" cy="80" r="28" fill={`${cyan}18`} stroke={cyan} strokeWidth="1.5"/>
      <text x="332" y="87" fontSize="20" fill={cyan}>⬡</text>
      <circle cx="375" cy="130" r="18" fill={`${purple}18`} stroke={purple} strokeWidth="1"/>
      <text x="368" y="137" fontSize="13" fill={purple}>⬡</text>
      <circle cx="310" cy="155" r="12" fill={`${cyan}12`} stroke={`${cyan}55`} strokeWidth="1"/>
      <text x="305" y="161" fontSize="9" fill={cyan}>⬡</text>

      {/* Arrow */}
      <path d="M270 105 Q310 120 310 155" stroke={`${cyan}66`} strokeWidth="1.5" strokeDasharray="5 4" fill="none"/>

      {/* Bottom status bar */}
      <rect x="30" y="310" width="380" height="34" rx="10" fill={cardBg} stroke={cardBorder} strokeWidth="1"/>
      <text x="50" y="331" fontSize="11" fill={textStrong} fontFamily="Inter" fontWeight="600">Task submitted for review</text>
      <rect x="295" y="317" width="100" height="20" rx="6" fill={`${green}18`} stroke={green} strokeWidth="0.8"/>
      <text x="345" y="330" fontSize="10" fill={green} textAnchor="middle" fontFamily="Inter">✓ Pending</text>
    </svg>
  )

  if (index === 1) return (
    <svg viewBox="0 0 420 360" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Dashboard window */}
      <rect x="20" y="20" width="380" height="280" rx="14" fill={cardBg} stroke={cardBorder} strokeWidth="1.5"/>
      {/* Top bar */}
      <rect x="20" y="20" width="380" height="36" rx="14" fill={bgDeep}/>
      <rect x="20" y="42" width="380" height="14" fill={bgDeep}/>
      <circle cx="42" cy="38" r="5" fill="#EF444444"/>
      <circle cx="58" cy="38" r="5" fill="#F59E0B44"/>
      <circle cx="74" cy="38" r="5" fill="#10B98144"/>
      <text x="210" y="43" fontSize="10" fill={textLight} textAnchor="middle" fontFamily="Inter">TaskNova — Buyer Dashboard</text>

      {/* Stat cards row */}
      {[
        { x: 36,  label: 'Tasks',    val: '12',   color: cyan   },
        { x: 162, label: 'Workers',  val: '84',   color: purple },
        { x: 288, label: 'Paid Out', val: '$340', color: green  },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y="72" width="110" height="56" rx="8" fill={bgDeep} stroke={`${s.color}44`} strokeWidth="1"/>
          <text x={s.x + 55} y="97" fontSize="18" fill={s.color} textAnchor="middle" fontFamily="Inter" fontWeight="700">{s.val}</text>
          <text x={s.x + 55} y="115" fontSize="8" fill={textLight} textAnchor="middle" fontFamily="Inter">{s.label}</text>
        </g>
      ))}

      {/* Task rows */}
      {['Watch YouTube & Comment', 'Complete App Survey', 'Write Product Review'].map((t, i) => (
        <g key={i}>
          <rect x="36" y={146 + i * 38} width="348" height="30" rx="6" fill={bgDeep} stroke={`${cardBorder}`} strokeWidth="0.5"/>
          <rect x="48" y={154 + i * 38} width="140" height="7" rx="3.5" fill={cyan} opacity="0.7"/>
          <rect x="48" y={165 + i * 38} width="90" height="5" rx="2.5" fill={isLight ? '#BAE6FD' : '#1B3358'}/>
          <rect x="310" y={152 + i * 38} width="60" height="14" rx="4" fill={`${green}18`} stroke={`${green}55`} strokeWidth="0.5"/>
          <text x="340" y={163 + i * 38} fontSize="7" fill={green} textAnchor="middle" fontFamily="Inter">Active</text>
        </g>
      ))}

      {/* Add task button */}
      <rect x="36" y="264" width="160" height="24" rx="7" fill={`${cyan}18`} stroke={cyan} strokeWidth="1"/>
      <text x="116" y="280" fontSize="10" fill={cyan} textAnchor="middle" fontFamily="Inter" fontWeight="600">+ Add New Task</text>

      {/* Floating coin */}
      <circle cx="385" cy="15" r="22" fill={`${purple}18`} stroke={purple} strokeWidth="1.5"/>
      <text x="377" y="22" fontSize="15" fill={purple}>⬡</text>

      {/* Bottom label */}
      <text x="210" y="340" fontSize="11" fill={textLight} textAnchor="middle" fontFamily="Inter">Real-time task management dashboard</text>
    </svg>
  )

  return (
    <svg viewBox="0 0 420 360" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Shield */}
      <path d="M210 30 L310 72 L310 185 Q310 270 210 300 Q110 270 110 185 L110 72 Z"
        fill={`${green}12`} stroke={green} strokeWidth="2"/>
      <path d="M210 55 L290 90 L290 182 Q290 252 210 276 Q130 252 130 182 L130 90 Z"
        fill={`${green}18`}/>
      {/* Check */}
      <path d="M170 178 L198 210 L252 152" stroke={green} strokeWidth="5"
        fill="none" strokeLinecap="round" strokeLinejoin="round"/>

      {/* Transaction cards */}
      <rect x="10" y="120" width="115" height="66" rx="10" fill={cardBg} stroke={`${green}55`} strokeWidth="1.2"/>
      <text x="22" y="140" fontSize="9" fill={green} fontFamily="Inter" fontWeight="600">Payment Sent</text>
      <text x="22" y="158" fontSize="15" fill={isLight ? '#059669' : '#34D399'} fontFamily="Inter" fontWeight="700">+$12.50</text>
      <rect x="22" y="166" width="60" height="12" rx="4" fill={`${green}18`} stroke={`${green}44`}/>
      <text x="52" y="175" fontSize="7" fill={green} textAnchor="middle" fontFamily="Inter">Approved ✓</text>

      <rect x="295" y="80" width="118" height="66" rx="10" fill={cardBg} stroke={`${purple}55`} strokeWidth="1.2"/>
      <text x="307" y="100" fontSize="9" fill={purple} fontFamily="Inter" fontWeight="600">Submission</text>
      <text x="307" y="116" fontSize="11" fill={textStrong} fontFamily="Inter">Task #2841</text>
      <rect x="307" y="124" width="65" height="12" rx="4" fill={`${purple}18`} stroke={`${purple}44`}/>
      <text x="339" y="133" fontSize="7" fill={purple} textAnchor="middle" fontFamily="Inter">Reviewed ✓</text>

      {/* People row */}
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <circle cx={120 + i * 38} cy={330} r={18}
            fill={cardBg} stroke={i % 2 === 0 ? `${green}55` : `${cyan}55`} strokeWidth="1.2"/>
          <circle cx={120 + i * 38} cy={323} r={7} fill={bgDeep}/>
          <path d={`M${103 + i*38} 344 Q${120 + i*38} 335 ${137 + i*38} 344`} fill={bgDeep}/>
        </g>
      ))}
      <text x="210" y="358" fontSize="9" fill={textLight} textAnchor="middle" fontFamily="Inter">10,000+ trusted users worldwide</text>

      {/* Lock */}
      <rect x="191" y="225" width="38" height="30" rx="5" fill={`${green}22`} stroke={green} strokeWidth="1.2"/>
      <path d="M198 225 L198 216 Q198 208 210 208 Q222 208 222 216 L222 225"
        stroke={green} strokeWidth="1.5" fill="none"/>
      <circle cx="210" cy="238" r="5" fill={green}/>
    </svg>
  )
}

const slides = [
  {
    tag: 'Earn Real Money', title: 'Complete Tasks,', highlight: 'Get Paid Fast',
    subtitle: 'Join thousands of workers completing micro-tasks daily and earning coins you can withdraw as real cash.',
    cta: { label: 'Start Earning', href: '/register' },
    ctaSecondary: { label: 'Browse Tasks', href: '/register' },
    accent: '#00D4FF',
  },
  {
    tag: 'For Task Buyers', title: 'Grow Your Project', highlight: 'With Real Workers',
    subtitle: 'Post tasks, set your budget, and get results from a global pool of skilled micro-task workers.',
    cta: { label: 'Post a Task', href: '/register' },
    ctaSecondary: { label: 'Learn More', href: '/#how-it-works' },
    accent: '#7C3AED',
  },
  {
    tag: 'Trusted Platform', title: 'Safe, Transparent', highlight: '& Rewarding',
    subtitle: 'Every transaction is tracked, every submission reviewed. TaskNova ensures fair pay for every completed task.',
    cta: { label: 'Join TaskNova', href: '/register' },
    ctaSecondary: { label: 'How It Works', href: '/#how-it-works' },
    accent: '#10B981',
  },
]

const HeroSection = () => {
  const { theme }                 = useTheme()
  const isLight                   = theme === 'light'
  const [current, setCurrent]     = useState(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => goTo((current + 1) % slides.length), 5000)
    return () => clearInterval(timer)
  }, [current])

  const goTo = (idx) => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => { setCurrent(idx); setAnimating(false) }, 300)
  }

  const slide  = slides[current]
  const accent = isLight ? '#0284C7' : slide.accent

  return (
    <section style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center', overflow: 'hidden',
      background: isLight ? '#E0F2FE' : 'transparent',
    }}>
      {/* Grid — dark only */}
      {!isLight && (
        <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
      )}

      {/* Glow blobs */}
      <div style={{
        position: 'absolute', top: '20%', left: '5%', width: '400px', height: '400px',
        background: `radial-gradient(circle, ${accent}18 0%, transparent 70%)`,
        borderRadius: '50%', pointerEvents: 'none', transition: 'background 0.8s ease',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '5%', width: '300px', height: '300px',
        background: `radial-gradient(circle, ${isLight ? '#0284C718' : '#7C3AED18'} 0%, transparent 70%)`,
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '100px', paddingBottom: '80px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '40px', alignItems: 'center',
        }} className="hero-grid">

          {/* Left — text */}
          <div style={{
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateY(16px)' : 'translateY(0)',
            transition: 'all 0.4s ease',
          }}>
            {/* Tag */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: `${accent}15`, border: `1px solid ${accent}44`,
              borderRadius: '20px', padding: '6px 14px', marginBottom: '24px',
            }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: accent }} />
              <span style={{ fontSize: '13px', color: accent, fontWeight: 500 }}>{slide.tag}</span>
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 700, lineHeight: 1.1,
              color: isLight ? '#0C1A2E' : '#E8EAF0',
              marginBottom: '8px', fontFamily: 'Space Grotesk, sans-serif',
            }}>
              {slide.title}
            </h1>

            {/* Highlight — vivid accent for both themes */}
            <h1 style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 700, lineHeight: 1.1,
              color: isLight ? slide.accent : slide.accent,
              marginBottom: '24px',
              fontFamily: 'Space Grotesk, sans-serif',
              textShadow: isLight ? `0 0 30px ${slide.accent}44` : `0 0 40px ${slide.accent}66`,
            }}>
              {slide.highlight}
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: '16px', color: isLight ? '#0C4A6E' : '#8892A4',
              lineHeight: 1.7, maxWidth: '460px', marginBottom: '36px',
            }}>
              {slide.subtitle}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href={slide.cta.href} style={{
                background: 'transparent', border: `1px solid ${accent}`,
                color: accent, padding: '12px 28px', borderRadius: '8px',
                fontSize: '15px', fontWeight: 500, textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                transition: 'all 0.2s',
              }}>
                {slide.cta.label} <FiArrowRight size={16} />
              </Link>
              <Link href={slide.ctaSecondary.href} style={{
                background: 'transparent',
                border: `1px solid ${isLight ? '#38BDF8' : '#1B3358'}`,
                color: isLight ? '#0C4A6E' : '#8892A4',
                padding: '12px 28px', borderRadius: '8px',
                fontSize: '15px', fontWeight: 500, textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                transition: 'all 0.2s',
              }}>
                {slide.ctaSecondary.label}
              </Link>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: '28px', marginTop: '48px', flexWrap: 'wrap' }}>
              {[
                { val: '10K+', label: 'Active Workers' },
                { val: '50K+', label: 'Tasks Completed' },
                { val: '$120K', label: 'Total Paid Out' },
              ].map(({ val, label }) => (
                <div key={label}>
                  <p style={{ fontSize: '22px', fontWeight: 700, color: isLight ? '#0C1A2E' : '#E8EAF0' }}>{val}</p>
                  <p style={{ fontSize: '12px', color: isLight ? '#0C4A6E' : '#4A5568', marginTop: '2px' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — illustration */}
          <div className="hero-illustration" style={{
            opacity: animating ? 0 : 1,
            transform: animating ? 'scale(0.97)' : 'scale(1)',
            transition: 'all 0.4s ease',
            height: '360px', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <Illustration index={current} isLight={isLight} />
          </div>
        </div>

        {/* Slide indicators */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '32px' }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              width: i === current ? '28px' : '8px', height: '8px',
              borderRadius: '4px', border: 'none', cursor: 'pointer',
              background: i === current ? accent : (isLight ? '#BAE6FD' : '#1B3358'),
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { display: none !important; }
        }
      `}</style>
    </section>
  )
}

export default HeroSection