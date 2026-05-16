'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiCheckCircle, FiXCircle, FiEye } from 'react-icons/fi'
import toast from 'react-hot-toast'
import StatCard from '../../ui/StatCard'
import EmptyState from '../../ui/EmptyState'
import Modal from '../../ui/Modal'
import useAuth from '../../../hooks/useAuth'
import axiosInstance from '../../../api/axiosInstance'
import { formatDate } from '../../../utils/helpers'

const BuyerHome = () => {
    const { user } = useAuth()
    const router = useRouter()
    const [stats, setStats] = useState({ taskCount: 0, pendingWorkers: 0, totalPaid: 0 })
    const [submissions, setSubmissions] = useState([])
    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)

    const fetchData = async () => {
        if (!user?.email) return
        try {
            const [statsRes, subsRes] = await Promise.all([
                axiosInstance.get(`/tasks/buyer-stats/${user.email}`),
                axiosInstance.get(`/submissions/buyer-pending/${user.email}`),
            ])
            setStats(statsRes.data)
            setSubmissions(subsRes.data || [])
        } catch {
            // keep defaults
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchData() }, [user?.email])

    const handleApprove = async (sub) => {
        try {
            await axiosInstance.patch(`/submissions/approve/${sub._id}`, {
                worker_email: sub.worker_email,
                payable_amount: sub.payable_amount,
            })
            toast.success(`Approved! ${sub.payable_amount} coins sent to ${sub.worker_name}`)
            fetchData()
        } catch {
            toast.error('Failed to approve')
        }
    }

    const handleReject = async (sub) => {
        try {
            await axiosInstance.patch(`/submissions/reject/${sub._id}`, {
                task_id: sub.task_id,
            })
            toast.success('Submission rejected')
            fetchData()
        } catch {
            toast.error('Failed to reject')
        }
    }

    return (
        <div>
            <div style={{ marginBottom: '28px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#E8EAF0', fontFamily: 'Space Grotesk, sans-serif' }}>
                    Buyer Dashboard
                </h1>
                <p style={{ fontSize: '14px', color: '#8892A4', marginTop: '4px' }}>
                    Manage your tasks and review worker submissions.
                </p>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}
                className="stats-grid">
                <StatCard label="Total Tasks" value={loading ? '—' : stats.taskCount} icon="📋" color="cyan" sub="Tasks you have posted" />
                <StatCard label="Pending Workers" value={loading ? '—' : stats.pendingWorkers} icon="⏳" color="amber" sub="Workers still needed" />
                <StatCard label="Total Paid" value={loading ? '—' : `$${stats.totalPaid}`} icon="💰" color="green" sub="Coins paid to workers" />
            </div>

            {/* Submissions to review */}
            <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div>
                        <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#E8EAF0' }}>Tasks To Review</h2>
                        <p style={{ fontSize: '13px', color: '#8892A4', marginTop: '2px' }}>Pending submissions awaiting your approval</p>
                    </div>
                    {submissions.length > 0 && (
                        <span style={{
                            background: '#F59E0B18', border: '1px solid #F59E0B44',
                            color: '#FCD34D', fontSize: '12px', fontWeight: 600,
                            padding: '3px 10px', borderRadius: '20px',
                        }}>
                            {submissions.length} pending
                        </span>
                    )}
                </div>

                {loading ? (
                    <div style={{ padding: '32px', textAlign: 'center', color: '#4A5568' }}>Loading...</div>
                ) : submissions.length === 0 ? (
                    <EmptyState icon="✅" title="All caught up!" subtitle="No pending submissions to review right now." />
                ) : (
                    <div className="table-wrapper">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Worker</th>
                                    <th>Task</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>View</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissions.map(s => (
                                    <tr key={s._id}>
                                        <td style={{ color: '#E8EAF0', fontWeight: 500 }}>{s.worker_name}</td>
                                        <td style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {s.task_title}
                                        </td>
                                        <td style={{ color: '#00D4FF', fontWeight: 600 }}>⬡ {s.payable_amount}</td>
                                        <td>{formatDate(s.current_date)}</td>
                                        <td>
                                            <button
                                                className="btn-ghost btn-sm"
                                                onClick={() => { setSelected(s); setModalOpen(true) }}
                                                style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                                            >
                                                <FiEye size={13} /> View
                                            </button>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '6px' }}>
                                                <button
                                                    className="btn-primary btn-sm"
                                                    onClick={() => handleApprove(s)}
                                                    style={{ borderColor: '#10B981', color: '#34D399', display: 'flex', alignItems: 'center', gap: '4px' }}
                                                >
                                                    <FiCheckCircle size={13} /> Approve
                                                </button>
                                                <button
                                                    className="btn-danger btn-sm"
                                                    onClick={() => handleReject(s)}
                                                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                                                >
                                                    <FiXCircle size={13} /> Reject
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Submission detail modal */}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Submission Details">
                {selected && (
                    <div>
                        <div style={{ marginBottom: '16px' }}>
                            <p className="label">Task</p>
                            <p style={{ fontSize: '15px', color: '#E8EAF0', fontWeight: 500 }}>{selected.task_title}</p>
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <p className="label">Worker</p>
                            <p style={{ fontSize: '14px', color: '#8892A4' }}>{selected.worker_name} · {selected.worker_email}</p>
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <p className="label">Submission Details</p>
                            <div style={{
                                background: '#0D1526', border: '1px solid #1B3358',
                                borderRadius: '8px', padding: '14px',
                                fontSize: '14px', color: '#8892A4',
                                lineHeight: 1.7, whiteSpace: 'pre-wrap',
                            }}>
                                {selected.submission_details}
                            </div>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <p className="label">Reward</p>
                            <p style={{ fontSize: '16px', color: '#00D4FF', fontWeight: 600 }}>⬡ {selected.payable_amount} coins</p>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                className="btn-primary"
                                style={{ flex: 1, justifyContent: 'center', borderColor: '#10B981', color: '#34D399' }}
                                onClick={() => { handleApprove(selected); setModalOpen(false) }}
                            >
                                <FiCheckCircle size={15} /> Approve
                            </button>
                            <button
                                className="btn-danger"
                                style={{ flex: 1, justifyContent: 'center' }}
                                onClick={() => { handleReject(selected); setModalOpen(false) }}
                            >
                                <FiXCircle size={15} /> Reject
                            </button>
                        </div>
                    </div>
                )}
            </Modal>

            <style>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    )
}

export default BuyerHome