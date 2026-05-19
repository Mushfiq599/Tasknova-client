'use client'

import { useEffect, useRef, useState } from 'react'
import SectionHeading from '../ui/SectionHeading'
import { useTheme } from '../../context/ThemeContext'
import axiosInstance from '../../api/axiosInstance'

const fallbackWorkers = [
  { _id: '1', name: 'Alex Rivera',  coins: 4820, photoURL: '', email: 'alex@example.com' },
  { _id: '2', name: 'Sana Malik',   coins: 4310, photoURL: '', email: 'sana@example.com' },
  { _id: '3', name: 'James Okafor', coins: 3990, photoURL: '', email: 'james@example.com' },
  { _id: '4', name: 'Lin Wei',      coins: 3650, photoURL: '', email: 'lin@example.com' },
  { _id: '5', name: 'Maria Santos', coins: 3200, photoURL: '', email: 'maria@example.com' },
  { _id: '6', name: 'Omar Hassan',  coins: 2980, photoURL: '', email: 'omar@example.com' },
]

const WorkerCard = ({ worker, rank, isLight, index }) => {
  const rankColors = ['#FFD700', '#C0C0C0', '#CD7F32']
  const avatarSrc  = worker.photoURL ||
    `https://api.dicebear.com/7.x/identicon/svg?seed=${worker.email}`
  const cardBg     = isLight ? '#F0F9FF' : '#111827'
  const cardBorder = isLight ? '#38BDF8' : '#1B3358'
  const nameColor  = isLight ? '#0C1A2E' : '#E8EAF0'
  const cyan       = isLight ? '#0284C7' : '#00D4FF'

  return (
    <div className="reveal reveal-scale card-interactive" style={{
      background: cardBg,
      border: `1px solid ${cardBorder}`,
      borderRadius: '12px', padding: '20px',
      textAlign: 'center', position: 'relative',
      animationDelay: `${index * 0.1}s`,
    }}>
      {rank <= 3 && (
        <div style={{
          position: 'absolute', top: '12px', right: '12px',
          width: '26px', height: '26px',
          background: `${rankColors[rank - 1]}22`,
          border: `1px solid ${rankColors[rank - 1]}66`,
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '12px', fontWeight: 700, color: rankColors[rank - 1],
        }}>#{rank}</div>
      )}

      {/* Avatar with ring animation */}
      <div style={{ width: '80px', height: '80px', margin: '0 auto 12px', position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: '-4px', borderRadius: '50%',
          background: `linear-gradient(135deg, ${cyan}44, #7C3AED44)`,
          animation: 'glowPulse 3s ease-in-out infinite',
        }} />
        <img src={avatarSrc} alt={worker.name} style={{
          width: '80px', height: '80px', borderRadius: '50%',
          objectFit: 'cover', position: 'relative',
          border: `3px solid ${isLight ? '#E0F2FE' : '#0A0F1E'}`,
          transition: 'transform 0.3s ease',
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
      </div>

      <h4 style={{ fontSize: '15px', fontWeight: 600, color: nameColor, marginBottom: '4px' }}>
        {worker.name}
      </h4>

      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        background: `${cyan}18`, border: `1px solid ${cyan}33`,
        borderRadius: '20px', padding: '4px 12px', marginTop: '8px',
        transition: 'all 0.2s ease',
      }}>
        <span style={{ color: cyan, fontSize: '14px' }}>⬡</span>
        <span style={{ fontSize: '13px', fontWeight: 600, color: cyan }}>
          {worker.coins.toLocaleString()} coins
        </span>
      </div>
    </div>
  )
}

const TopWorkers = () => {
  const { theme }              = useTheme()
  const isLight                = theme === 'light'
  const [workers, setWorkers]  = useState(fallbackWorkers)
  const gridRef                = useRef(null)

  useEffect(() => {
    axiosInstance.get('/users/top-workers')
      .then(res => { if (res.data?.length) setWorkers(res.data) })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.reveal').forEach((card, i) => {
            setTimeout(() => card.classList.add('visible'), i * 100)
          })
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [workers])

  return (
    <section id="workers" className="section" style={{ background: 'transparent' }}>
      <div className="container">
        <SectionHeading
          label="Leaderboard" title="Top Earning" highlight="Workers"
          subtitle="Meet the highest earning workers on TaskNova. Complete more tasks to climb the leaderboard."
          center
        />
        <div ref={gridRef} style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px',
        }} className="workers-grid">
          {workers.slice(0, 6).map((w, i) => (
            <WorkerCard key={w._id} worker={w} rank={i + 1} isLight={isLight} index={i} />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .workers-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .workers-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

export default TopWorkers