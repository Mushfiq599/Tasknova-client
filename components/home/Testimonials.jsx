'use client'

import { useEffect, useRef } from 'react'
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
    const cardBg     = isLight ? '#F0F9FF' : '#111827'
    const cardBorder = isLight ? '#38BDF8' : '#1B3358'
    const textColor  = isLight ? '#0C4A6E' : '#8892A4'
    const nameColor  = isLight ? '#0C1A2E' : '#E8EAF0'

    return (
        <div style={{
            background: cardBg,
            border: `1px solid ${cardBorder}`,
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            height: '100%',
            boxSizing: 'border-box',
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
            }}>"</div>

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
                    <p style={{ fontSize: '12px', color: textColor, marginTop: '2px' }}>{t.role}</p>
                </div>
            </div>
        </div>
    )
}

const Testimonials = () => {
    const { theme } = useTheme()
    const isLight = theme === 'light'
    const swiperRef = useRef(null)
    const initialized = useRef(false)

    useEffect(() => {
        // Dynamically import Swiper to avoid SSR issues
        const init = async () => {
            if (initialized.current) return
            try {
                const { Swiper } = await import('swiper')
                const { Autoplay, Pagination, Navigation } = await import('swiper/modules')

                // Import Swiper styles dynamically
                await import('swiper/css')
                await import('swiper/css/pagination')
                await import('swiper/css/navigation')

                if (!swiperRef.current) return

                new Swiper(swiperRef.current, {
                    modules: [Autoplay, Pagination, Navigation],
                    slidesPerView: 1,
                    spaceBetween: 20,
                    loop: true,
                    autoplay: {
                        delay: 4000,
                        disableOnInteraction: false,
                    },
                    pagination: {
                        el: '.testimonials-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.testimonials-next',
                        prevEl: '.testimonials-prev',
                    },
                    breakpoints: {
                        640:  { slidesPerView: 2, spaceBetween: 16 },
                        1024: { slidesPerView: 3, spaceBetween: 20 },
                    },
                })
                initialized.current = true
            } catch (err) {
                console.warn('Swiper init failed, falling back to marquee', err)
            }
        }
        init()
    }, [])

    const cyan = isLight ? '#0284C7' : '#00D4FF'

    return (
        <section id="testimonials" className="section" style={{ background: 'transparent' }}>
            <div className="container">
                <SectionHeading
                    label="Testimonials" title="What Our" highlight="Community Says"
                    subtitle="Thousands of workers and buyers trust TaskNova every day. Here is what they have to say."
                    center
                />
            </div>

            {/* Swiper container */}
            <div style={{ padding: '8px 24px 40px', maxWidth: '1200px', margin: '0 auto' }}>
                <div ref={swiperRef} className="swiper testimonials-swiper">
                    <div className="swiper-wrapper">
                        {testimonials.map((t, i) => (
                            <div key={i} className="swiper-slide" style={{ height: 'auto' }}>
                                <TestimonialCard t={t} isLight={isLight} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Controls row */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: '16px', marginTop: '28px',
                }}>
                    <button className="testimonials-prev" style={{
                        background: 'transparent',
                        border: `1px solid ${isLight ? '#38BDF8' : '#1B3358'}`,
                        borderRadius: '50%',
                        width: '38px', height: '38px',
                        cursor: 'pointer', color: isLight ? '#0C4A6E' : '#8892A4',
                        fontSize: '18px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.2s',
                    }} aria-label="Previous">‹</button>

                    <div className="testimonials-pagination" style={{ position: 'static', display: 'flex', gap: '6px' }} />

                    <button className="testimonials-next" style={{
                        background: 'transparent',
                        border: `1px solid ${isLight ? '#38BDF8' : '#1B3358'}`,
                        borderRadius: '50%',
                        width: '38px', height: '38px',
                        cursor: 'pointer', color: isLight ? '#0C4A6E' : '#8892A4',
                        fontSize: '18px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.2s',
                    }} aria-label="Next">›</button>
                </div>
            </div>

            <style>{`
                .testimonials-swiper { overflow: hidden; }
                .testimonials-swiper .swiper-slide { height: auto; }
                .testimonials-pagination .swiper-pagination-bullet {
                    width: 8px; height: 8px;
                    background: ${isLight ? '#BAE6FD' : '#1B3358'};
                    opacity: 1; border-radius: 4px;
                    transition: all 0.3s; cursor: pointer;
                }
                .testimonials-pagination .swiper-pagination-bullet-active {
                    width: 24px; background: ${cyan};
                }
            `}</style>
        </section>
    )
}

export default Testimonials