'use client'

import { useEffect, useState } from 'react'
import EmptyState from '../../ui/EmptyState'
import StatCard from '../../ui/StatCard'
import useAuth from '../../../hooks/useAuth'
import axiosInstance from '../../../api/axiosInstance'
import { formatDate } from '../../../utils/helpers'

const PaymentHistory = () => {
    const { user } = useAuth()
    const [payments, setPayments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user?.email) return
        axiosInstance.get(`/payments/${user.email}`)
            .then(res => setPayments(res.data || []))
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [user?.email])

    const totalSpent = payments.reduce((s, p) => s + p.amount, 0)
    const totalCoins = payments.reduce((s, p) => s + p.coins, 0)

    return (
        <div>
            <div style={{ marginBottom: '28px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#E8EAF0', fontFamily: 'Space Grotesk, sans-serif' }}>
                    Payment History
                </h1>
                <p style={{ fontSize: '14px', color: '#8892A4', marginTop: '4px' }}>
                    All your coin purchase transactions.
                </p>
            </div>

            {/* Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '28px' }}
                className="stats-grid">
                <StatCard label="Total Transactions" value={payments.length} icon="🧾" color="cyan" />
                <StatCard label="Total Spent" value={`$${totalSpent}`} icon="💳" color="purple" />
                <StatCard label="Total Coins Bought" value={`⬡ ${totalCoins}`} icon="🪙" color="amber" />
            </div>

            <div className="card">
                {loading ? (
                    <div style={{ padding: '32px', textAlign: 'center', color: '#4A5568' }}>Loading...</div>
                ) : payments.length === 0 ? (
                    <EmptyState icon="💳" title="No payments yet" subtitle="Purchase coins to see your transaction history here." />
                ) : (
                    <div className="table-wrapper">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Date</th>
                                    <th>Coins</th>
                                    <th>Amount Paid</th>
                                    <th>Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((p, i) => (
                                    <tr key={p._id}>
                                        <td style={{ color: '#4A5568' }}>{i + 1}</td>
                                        <td>{formatDate(p.date)}</td>
                                        <td style={{ color: '#00D4FF', fontWeight: 600 }}>⬡ {p.coins}</td>
                                        <td style={{ color: '#34D399', fontWeight: 600 }}>${p.amount}</td>
                                        <td style={{ color: '#4A5568', fontSize: '12px' }}>
                                            ${(p.amount / p.coins).toFixed(2)}/coin
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <style>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    )
}

export default PaymentHistory