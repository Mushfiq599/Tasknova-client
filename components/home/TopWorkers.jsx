'use client'

import { useEffect, useState } from 'react'
import SectionHeading from '../ui/SectionHeading'
import { useTheme } from '../../context/ThemeContext'
import axiosInstance from '../../api/axiosInstance'

const fallbackWorkers = [
    { _id: '1', name: 'Alex Rivera', coins: 4820, photoURL: '', email: 'alex@example.com' },
    { _id: '2', name: 'Sana Malik', coins: 4310, photoURL: '', email: 'sana@example.com' },
    { _id: '3', name: 'James Okafor', coins: 3990, photoURL: '', email: 'james@example.com' },
    { _id: '4', name: 'Lin Wei', coins: 3650, photoURL: '', email: 'lin@example.com' },
    { _id: '5', name: 'Maria Santos', coins: 3200, photoURL: '', email: 'maria@example.com' },
    { _id: '6', name: 'Omar Hassan', coins: 2980, photoURL: '', email: 'omar@example.com' },
]

const WorkerCard = ({ worker, rank, isLight }) => {
    const rankColors = ['#FFD700', '#C0C0C0', '#CD7F32']
    const avatarSrc = worker.photoURL ||
        `https://api.dicebear.com/7.x/identicon/svg?seed=${worker.email}`

    return (
        <div style={{
            background: isLight ? '#F0F9FF' : '#111827',
            border: `1px solid ${isLight ? '#38BDF8' : '#1B3358'}`,
            borderRadius: '12px', padding: '20px',
            textAlign: 'center', position: 'relative',
            transition: 'all 0.2s',
            cursor: 'pointer',
        }}
            onMouseEnter={e => e.currentTarget.style.borderColor = isLight ? '#0284C7' : '#2A4A7A'}
            onMouseLeave={e => e.currentTarget.style.borderColor = isLight ? '#38BDF8' : '#1B3358'}
        >
            {rank <= 3 && (
                <div style={{
                    position: 'absolute', top: '12px', right: '12px',
                    width: '26px', height: '26px',
                    background: `${rankColors[rank - 1]}22`,
                    border: `1px solid ${rankColors[rank - 1]}66`,
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '12px', fontWeight: 700,
                    color: rankColors[rank - 1],
                }}>#{rank}</div>
            )}

            <div style={{ width: '80px', height: '80px', margin: '0 auto 12px', position: 'relative' }}>
                <div style={{
                    position: 'absolute', inset: '-4px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #00D4FF44, #7C3AED44)',
                }} />
                <img src={avatarSrc} alt={worker.name} style={{
                    width: '80px', height: '80px', borderRadius: '50%',
                    objectFit: 'cover', position: 'relative',
                    border: `3px solid ${isLight ? '#E0F2FE' : '#0A0F1E'}`,
                }} />
            </div>

            <h4 style={{ fontSize: '15px', fontWeight: 600, color: isLight ? '#0C1A2E' : '#E8EAF0', marginBottom: '4px' }}>
                {worker.name}
            </h4>
            <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                background: isLight ? '#0284C718' : '#00D4FF12',
                border: `1px solid ${isLight ? '#0284C733' : '#00D4FF33'}`,
                borderRadius: '20px', padding: '4px 12px', marginTop: '8px',
            }}>
                <span style={{ color: isLight ? '#0284C7' : '#00D4FF', fontSize: '14px' }}>⬡</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: isLight ? '#0284C7' : '#00D4FF' }}>
                    {worker.coins.toLocaleString()} coins
                </span>
            </div>
        </div>
    )
}

const TopWorkers = () => {
    const { theme } = useTheme()
    const isLight = theme === 'light'
    const [workers, setWorkers] = useState(fallbackWorkers)

    useEffect(() => {
        axiosInstance.get('/users/top-workers')
            .then(res => { if (res.data?.length) setWorkers(res.data) })
            .catch(() => { })
    }, [])

    return (
        <section id="workers" className="section" style={{ background: 'transparent' }}>
            <div className="container">
                <SectionHeading
                    label="Leaderboard" title="Top Earning" highlight="Workers"
                    subtitle="Meet the highest earning workers on TaskNova. Complete more tasks to climb the leaderboard."
                    center
                />
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px',
                }} className="workers-grid">
                    {workers.slice(0, 6).map((w, i) => (
                        <WorkerCard key={w._id} worker={w} rank={i + 1} isLight={isLight} />
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