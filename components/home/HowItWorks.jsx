'use client'

import SectionHeading from '../ui/SectionHeading'
import { useTheme } from '../../context/ThemeContext'

const workerSteps = [
    { step: '01', title: 'Create Account', desc: 'Register as a Worker and get 10 free coins to start.', icon: '👤' },
    { step: '02', title: 'Browse Tasks', desc: 'Explore available tasks from buyers across many categories.', icon: '🔍' },
    { step: '03', title: 'Submit Your Work', desc: 'Complete the task and submit your proof for review.', icon: '📤' },
    { step: '04', title: 'Get Paid', desc: 'Once approved, coins are added. Withdraw anytime.', icon: '💸' },
]

const buyerSteps = [
    { step: '01', title: 'Register as Buyer', desc: 'Sign up as a Buyer and receive 50 coins on registration.', icon: '🧑‍💼' },
    { step: '02', title: 'Purchase Coins', desc: 'Top up your wallet using Stripe to fund your tasks.', icon: '💳' },
    { step: '03', title: 'Post a Task', desc: 'Create a task with details, deadline, and coin reward.', icon: '📋' },
    { step: '04', title: 'Review & Approve', desc: 'Check submissions and approve quality work to release pay.', icon: '✅' },
]

const StepCard = ({ step, title, desc, icon, accent, isLight }) => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <div style={{
            width: '48px', height: '48px', flexShrink: 0,
            background: `${accent}18`,
            border: `1px solid ${accent}44`,
            borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '22px',
        }}>
            {icon}
        </div>
        <div>
            <div style={{ fontSize: '11px', color: accent, fontWeight: 600, letterSpacing: '0.1em', marginBottom: '4px' }}>
                STEP {step}
            </div>
            <h4 style={{ fontSize: '15px', fontWeight: 600, color: isLight ? '#0C1A2E' : '#E8EAF0', marginBottom: '6px' }}>
                {title}
            </h4>
            <p style={{ fontSize: '13px', color: isLight ? '#0C4A6E' : '#8892A4', lineHeight: 1.6 }}>{desc}</p>
        </div>
    </div>
)

const HowItWorks = () => {
    const { theme } = useTheme()
    const isLight = theme === 'light'

    const workerAccent = isLight ? '#0284C7' : '#00D4FF'
    const buyerAccent = isLight ? '#6D28D9' : '#A78BFA'
    const cardBg = isLight ? '#F0F9FF' : '#111827'
    const borderBase = isLight ? '#38BDF8' : '#1B3358'

    return (
        <section id="how-it-works" className="section" style={{ background: 'transparent' }}>
            <div className="container">
                <SectionHeading
                    label="How It Works"
                    title="Simple Steps to"
                    highlight="Start Earning"
                    subtitle="Whether you want to complete tasks or post them, TaskNova makes it easy to get started in minutes."
                    center
                />
                <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px',
                }} className="hiw-grid">
                    {/* Workers */}
                    <div style={{
                        background: cardBg,
                        border: `1px solid ${workerAccent}44`,
                        borderRadius: '12px', padding: '20px',
                    }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '10px',
                            marginBottom: '28px', paddingBottom: '16px',
                            borderBottom: `1px solid ${borderBase}`,
                        }}>
                            <span style={{
                                background: `${workerAccent}18`, border: `1px solid ${workerAccent}55`,
                                color: workerAccent, fontSize: '12px', fontWeight: 600,
                                padding: '4px 12px', borderRadius: '20px',
                            }}>For Workers</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {workerSteps.map(s => <StepCard key={s.step} {...s} accent={workerAccent} isLight={isLight} />)}
                        </div>
                    </div>

                    {/* Buyers */}
                    <div style={{
                        background: cardBg,
                        border: `1px solid ${buyerAccent}44`,
                        borderRadius: '12px', padding: '20px',
                    }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '10px',
                            marginBottom: '28px', paddingBottom: '16px',
                            borderBottom: `1px solid ${borderBase}`,
                        }}>
                            <span style={{
                                background: `${buyerAccent}18`, border: `1px solid ${buyerAccent}55`,
                                color: buyerAccent, fontSize: '12px', fontWeight: 600,
                                padding: '4px 12px', borderRadius: '20px',
                            }}>For Buyers</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {buyerSteps.map(s => <StepCard key={s.step} {...s} accent={buyerAccent} isLight={isLight} />)}
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
        @media (max-width: 768px) { .hiw-grid { grid-template-columns: 1fr !important; } }
      `}</style>
        </section>
    )
}

export default HowItWorks