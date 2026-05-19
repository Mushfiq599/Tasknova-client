'use client'

import SectionHeading from '../ui/SectionHeading'
import { useTheme } from '../../context/ThemeContext'

const testimonials = [
    { name: 'Sarah Johnson', role: 'Worker', email: 'sarah@example.com', text: 'TaskNova completely changed how I earn money online. I made over $200 in my first month just completing small tasks in my spare time. The coin system is transparent and withdrawals are fast.' },
    { name: 'David Kim', role: 'Buyer', email: 'david@example.com', text: 'As a small business owner, TaskNova has been a game-changer. I get genuine engagement for my content at a fraction of the cost. The review system ensures I only pay for quality work.' },
    { name: 'Amina Diallo', role: 'Worker', email: 'amina@example.com', text: 'The platform is so easy to navigate. Tasks are clearly described and the approval process is fair. I love that I can choose tasks that fit my skills and schedule.' },
    { name: 'Carlos Mendes', role: 'Buyer', email: 'carlos@example.com', text: 'I have tried many micro-task platforms and TaskNova stands out for its clean interface and reliable workers. The admin team is responsive and the platform keeps improving.' },
    { name: 'Priya Nair', role: 'Worker', email: 'priya@example.com', text: 'What I love most is the notification system — I know exactly when my work gets approved. Withdrawing to bKash is seamless and quick.' },
    { name: 'James Okafor', role: 'Worker', email: 'james@example.com', text: 'I have earned over $500 in three months. The tasks are varied and interesting. TaskNova is the most reliable earning platform I have used.' },
    { name: 'Lena Fischer', role: 'Buyer', email: 'lena@example.com', text: 'Posting tasks is incredibly easy. I get real results within hours of posting. The quality of submissions has consistently exceeded my expectations.' },
]

const TestimonialCard = ({ t, isLight }) => {
    const cardBg = isLight ? '#F0F9FF' : '#111827'
    const cardBorder = isLight ? '#38BDF8' : '#1B3358'
    const textColor = isLight ? '#0C4A6E' : '#8892A4'
    const nameColor = isLight ? '#0C1A2E' : '#E8EAF0'

    return (
        <div style={{
            minWidth: '320px',
            maxWidth: '320px',
            background: cardBg,
            border: `1px solid ${cardBorder}`,
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            userSelect: 'none',
        }}>
            {/* Stars */}
            <div style={{ display: 'flex', gap: '3px' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} style={{ color: '#FCD34D', fontSize: '14px' }}>★</span>
                ))}
            </div>

            {/* Quote mark */}
            <div style={{
                fontSize: '40px', lineHeight: 0.8,
                color: isLight ? '#BAE6FD' : '#1B3358',
                fontFamily: 'Georgia, serif',
            }}>
                "
            </div>

            {/* Text */}
            <p style={{
                fontSize: '14px', color: textColor,
                lineHeight: 1.75, fontStyle: 'italic', flex: 1,
            }}>
                {t.text}
            </p>

            {/* Divider */}
            <div style={{ height: '1px', background: isLight ? '#BAE6FD' : '#1B3358' }} />

            {/* Author */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                    <img
                        src={`https://api.dicebear.com/7.x/identicon/svg?seed=${t.email}`}
                        alt={t.name}
                        style={{
                            width: '40px', height: '40px', borderRadius: '50%',
                            border: `2px solid ${cardBorder}`,
                        }}
                    />
                    <div style={{
                        position: 'absolute', bottom: 1, right: 1,
                        width: '10px', height: '10px', borderRadius: '50%',
                        background: '#10B981',
                        border: `2px solid ${cardBg}`,
                    }} />
                </div>
                <div>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: nameColor }}>{t.name}</p>
                    <span className={`badge-${t.role.toLowerCase()}`} style={{ fontSize: '11px' }}>
                        {t.role}
                    </span>
                </div>
            </div>
        </div>
    )
}

const Testimonials = () => {
    const { theme } = useTheme()
    const isLight = theme === 'light'

    // Duplicate list for seamless infinite loop
    const items = [...testimonials, ...testimonials]

    return (
        <section id="testimonials" className="section" style={{ background: 'transparent' }}>
            <div className="container">
                <SectionHeading
                    label="Testimonials" title="What Our" highlight="Community Says"
                    subtitle="Thousands of workers and buyers trust TaskNova every day. Here is what they have to say."
                    center
                />
            </div>

            {/* Full-width marquee — outside container intentionally */}
            <div style={{ position: 'relative', overflow: 'hidden', padding: '8px 0 16px' }}>

                {/* Left fade */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, bottom: 0, width: '80px', zIndex: 2,
                    background: isLight
                        ? 'linear-gradient(to right, #E0F2FE, transparent)'
                        : 'linear-gradient(to right, #0A0F1E, transparent)',
                    pointerEvents: 'none',
                }} />

                {/* Right fade */}
                <div style={{
                    position: 'absolute', top: 0, right: 0, bottom: 0, width: '80px', zIndex: 2,
                    background: isLight
                        ? 'linear-gradient(to left, #E0F2FE, transparent)'
                        : 'linear-gradient(to left, #0A0F1E, transparent)',
                    pointerEvents: 'none',
                }} />

                {/* Track */}
                <div
                    className="marquee-track"
                    style={{
                        display: 'flex',
                        gap: '16px',
                        width: 'max-content',
                        animation: 'marqueeScroll 40s linear infinite',
                    }}
                    onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
                    onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
                >
                    {items.map((t, i) => (
                        <TestimonialCard key={i} t={t} isLight={isLight} />
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
        </section>
    )
}

export default Testimonials