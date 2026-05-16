'use client'

import { useState } from 'react'
import { FiZap, FiStar, FiAward, FiTrendingUp } from 'react-icons/fi'
import toast from 'react-hot-toast'
import useAuth from '../../../hooks/useAuth'
import axiosInstance from '../../../api/axiosInstance'

const packages = [
    { coins: 10, price: 1, icon: <FiZap />, label: 'Starter', color: '#8892A4', border: '#1B3358', popular: false },
    { coins: 150, price: 10, icon: <FiStar />, label: 'Popular', color: '#00D4FF', border: '#00D4FF44', popular: true },
    { coins: 500, price: 20, icon: <FiAward />, label: 'Pro', color: '#A78BFA', border: '#7C3AED44', popular: false },
    { coins: 1000, price: 35, icon: <FiTrendingUp />, label: 'Business', color: '#34D399', border: '#10B98144', popular: false },
]

const PurchaseCoin = () => {
    const { user } = useAuth()
    const [selected, setSelected] = useState(null)
    const [paying, setPaying] = useState(false)

    // Dummy payment handler (replace with Stripe when ready)
    const handlePurchase = async () => {
        if (!selected) return
        setPaying(true)
        try {
            await axiosInstance.post('/payments', {
                buyer_email: user.email,
                coins: selected.coins,
                amount: selected.price,
                date: new Date(),
            })
            toast.success(`🎉 ${selected.coins} coins added to your account!`)
            setSelected(null)
        } catch {
            toast.error('Payment failed. Please try again.')
        } finally {
            setPaying(false)
        }
    }

    return (
        <div style={{ maxWidth: '800px' }}>
            <div style={{ marginBottom: '28px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#E8EAF0', fontFamily: 'Space Grotesk, sans-serif' }}>
                    Purchase Coins
                </h1>
                <p style={{ fontSize: '14px', color: '#8892A4', marginTop: '4px' }}>
                    Top up your coin balance to post tasks and pay workers.
                </p>
            </div>

            {/* Info banner */}
            <div style={{
                background: '#00D4FF08', border: '1px solid #00D4FF22',
                borderRadius: '10px', padding: '12px 16px',
                display: 'flex', alignItems: 'center', gap: '10px',
                marginBottom: '28px', fontSize: '13px', color: '#8892A4',
            }}>
                <span style={{ fontSize: '18px' }}>💡</span>
                <p>Rate: <strong style={{ color: '#00D4FF' }}>$1 = 10 coins</strong>. Workers earn coins which they withdraw at 20 coins = $1 — that is how TaskNova earns.</p>
            </div>

            {/* Packages grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '28px' }}
                className="packages-grid">
                {packages.map(pkg => (
                    <div
                        key={pkg.coins}
                        onClick={() => setSelected(pkg)}
                        style={{
                            position: 'relative',
                            background: selected?.coins === pkg.coins ? `${pkg.color}10` : '#111827',
                            border: `1px solid ${selected?.coins === pkg.coins ? pkg.color : pkg.border}`,
                            borderRadius: '12px', padding: '24px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: selected?.coins === pkg.coins ? `0 0 20px ${pkg.color}20` : 'none',
                        }}
                    >
                        {/* Popular badge */}
                        {pkg.popular && (
                            <div style={{
                                position: 'absolute', top: '-10px', right: '16px',
                                background: '#00D4FF', color: '#0A0F1E',
                                fontSize: '11px', fontWeight: 700,
                                padding: '3px 10px', borderRadius: '20px',
                            }}>
                                MOST POPULAR
                            </div>
                        )}

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <div style={{
                                width: '44px', height: '44px',
                                background: `${pkg.color}18`,
                                border: `1px solid ${pkg.color}44`,
                                borderRadius: '10px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: pkg.color, fontSize: '20px',
                            }}>
                                {pkg.icon}
                            </div>
                            <div>
                                <p style={{ fontSize: '13px', color: '#8892A4' }}>{pkg.label}</p>
                                <p style={{ fontSize: '22px', fontWeight: 700, color: pkg.color, lineHeight: 1 }}>
                                    ⬡ {pkg.coins.toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '28px', fontWeight: 700, color: '#E8EAF0' }}>
                                ${pkg.price}
                            </span>
                            <span style={{ fontSize: '12px', color: '#4A5568' }}>
                                ${(pkg.price / pkg.coins).toFixed(2)}/coin
                            </span>
                        </div>

                        {/* Selected indicator */}
                        {selected?.coins === pkg.coins && (
                            <div style={{
                                marginTop: '12px', paddingTop: '12px',
                                borderTop: `1px solid ${pkg.color}33`,
                                fontSize: '12px', color: pkg.color, fontWeight: 500,
                                textAlign: 'center',
                            }}>
                                ✓ Selected
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Purchase button */}
            {selected && (
                <div className="card" style={{ borderColor: selected.color + '44' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <div>
                            <p style={{ fontSize: '13px', color: '#8892A4' }}>You are purchasing</p>
                            <p style={{ fontSize: '18px', fontWeight: 700, color: selected.color }}>
                                ⬡ {selected.coins} coins for ${selected.price}
                            </p>
                        </div>
                        <button onClick={() => setSelected(null)} className="btn-ghost btn-sm">Change</button>
                    </div>
                    <button
                        onClick={handlePurchase}
                        disabled={paying}
                        className="btn-primary"
                        style={{
                            width: '100%', justifyContent: 'center',
                            padding: '12px', fontSize: '15px',
                            borderColor: selected.color,
                            color: selected.color,
                            opacity: paying ? 0.7 : 1,
                        }}
                    >
                        {paying ? 'Processing...' : `Pay $${selected.price} — Get ${selected.coins} Coins`}
                    </button>
                    <p style={{ fontSize: '12px', color: '#4A5568', textAlign: 'center', marginTop: '10px' }}>
                        🔒 Secure payment · Coins credited instantly
                    </p>
                </div>
            )}

            <style>{`
        @media (max-width: 640px) {
          .packages-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    )
}

export default PurchaseCoin