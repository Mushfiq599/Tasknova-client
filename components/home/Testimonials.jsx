'use client'

import { useState } from 'react'
import SectionHeading from '../ui/SectionHeading'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext'

const testimonials = [
    { name: 'Sarah Johnson', role: 'Worker', email: 'sarah@example.com', text: 'TaskNova completely changed how I earn money online. I made over $200 in my first month just completing small tasks in my spare time. The coin system is transparent and withdrawals are fast.', rating: 5 },
    { name: 'David Kim', role: 'Buyer', email: 'david@example.com', text: 'As a small business owner, TaskNova has been a game-changer. I get genuine engagement for my content at a fraction of the cost. The review system ensures I only pay for quality work.', rating: 5 },
    { name: 'Amina Diallo', role: 'Worker', email: 'amina@example.com', text: 'The platform is so easy to navigate. Tasks are clearly described and the approval process is fair. I love that I can choose tasks that fit my skills and schedule.', rating: 5 },
    { name: 'Carlos Mendes', role: 'Buyer', email: 'carlos@example.com', text: 'I have tried many micro-task platforms and TaskNova stands out for its clean interface and reliable workers. The admin team is responsive and the platform keeps improving.', rating: 5 },
    { name: 'Priya Nair', role: 'Worker', email: 'priya@example.com', text: 'What I love most is the notification system — I know exactly when my work gets approved and coins hit my account. Withdrawing to bKash is seamless and quick.', rating: 5 },
]

const StarRating = ({ count = 5 }) => (
    <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
        {Array.from({ length: count }).map((_, i) => (
            <span key={i} style={{ color: '#FCD34D', fontSize: '14px' }}>★</span>
        ))}
    </div>
)

const Testimonials = () => {
    const { theme } = useTheme()
    const isLight = theme === 'light'
    const [current, setCurrent] = useState(0)
    const visible = 3
    const total = testimonials.length

    const prev = () => setCurrent(c => (c - 1 + total) % total)
    const next = () => setCurrent(c => (c + 1) % total)

    const getVisible = () => {
        const items = []
        for (let i = 0; i < visible; i++) items.push(testimonials[(current + i) % total])
        return items
    }

    const cardBg = isLight ? '#F0F9FF' : '#111827'
    const cardBorder = isLight ? '#38BDF8' : '#1B3358'
    const textColor = isLight ? '#0C4A6E' : '#8892A4'
    const nameColor = isLight ? '#0C1A2E' : '#E8EAF0'
    const accentBorder = isLight ? '#0284C744' : '#00D4FF33'

    return (
        <section id="testimonials" className="section" style={{ background: 'transparent' }}>
            <div className="container">
                <SectionHeading
                    label="Testimonials" title="What Our" highlight="Community Says"
                    subtitle="Thousands of workers and buyers trust TaskNova every day. Here is what they have to say."
                    center
                />
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '16px', marginBottom: '32px',
                }} className="testimonial-grid">
                    {getVisible().map((t, i) => (
                        <div key={i} style={{
                            background: cardBg,
                            border: `1px solid ${i === 1 ? accentBorder : cardBorder}`,
                            borderRadius: '12px', padding: '20px',
                            transform: i === 1 ? 'translateY(-8px)' : 'none',
                            transition: 'all 0.3s ease',
                        }}>
                            <StarRating count={t.rating} />
                            <p style={{ fontSize: '14px', color: textColor, lineHeight: 1.7, marginBottom: '20px', fontStyle: 'italic' }}>
                                "{t.text}"
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <img
                                    src={`https://api.dicebear.com/7.x/identicon/svg?seed=${t.email}`}
                                    alt={t.name}
                                    style={{ width: '40px', height: '40px', borderRadius: '50%', border: `2px solid ${cardBorder}` }}
                                />
                                <div>
                                    <p style={{ fontSize: '14px', fontWeight: 600, color: nameColor }}>{t.name}</p>
                                    <span className={`badge-${t.role.toLowerCase()}`}>{t.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                    <button onClick={prev} className="btn-ghost btn-sm" style={{ padding: '8px' }}>
                        <FiChevronLeft size={18} />
                    </button>
                    {testimonials.map((_, i) => (
                        <button key={i} onClick={() => setCurrent(i)} style={{
                            width: i === current ? '24px' : '8px', height: '8px', borderRadius: '4px',
                            background: i === current ? (isLight ? '#0284C7' : '#00D4FF') : (isLight ? '#BAE6FD' : '#1B3358'),
                            border: 'none', cursor: 'pointer', transition: 'all 0.3s ease',
                        }} />
                    ))}
                    <button onClick={next} className="btn-ghost btn-sm" style={{ padding: '8px' }}>
                        <FiChevronRight size={18} />
                    </button>
                </div>
            </div>
            <style>{`
        @media (max-width: 768px) { .testimonial-grid { grid-template-columns: 1fr !important; } }
      `}</style>
        </section>
    )
}

export default Testimonials