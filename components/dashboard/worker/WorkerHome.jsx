'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { FiFileText, FiClock, FiDollarSign, FiArrowRight } from 'react-icons/fi'
import StatCard from '../../ui/StatCard'
import EmptyState from '../../ui/EmptyState'
import Badge from '../../ui/Badge'
import useAuth from '../../../hooks/useAuth'
import { useTheme } from '../../../context/ThemeContext'
import axiosInstance from '../../../api/axiosInstance'
import { formatDate, coinsToDollars } from '../../../utils/helpers'

/* Animated wrapper — slides in from below with a delay */
const FadeCard = ({ children, delay = 0 }) => {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(28px)'
    el.style.transition = `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity='1'; el.style.transform='translateY(0)'; ob.disconnect() }
    }, { threshold: 0.05 })
    ob.observe(el)
    return () => ob.disconnect()
  }, [delay])

  return <div ref={ref}>{children}</div>
}

const WorkerHome = () => {
  const { user } = useAuth()
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const [stats, setStats] = useState({ total:0, pending:0, earning:0 })
  const [approved, setApproved] = useState([])
  const [loading, setLoading] = useState(true)

  /* theme tokens for text inside this page */
  const heading = isLight ? '#0C1A2E' : '#E8EAF0'
  const sub     = isLight ? '#0C4A6E' : '#8892A4'
  const accentTd = isLight ? '#0284C7' : '#00D4FF'
  const strongTd = isLight ? '#0C1A2E' : '#E8EAF0'

  useEffect(() => {
    if (!user?.email) return
    const fetchData = async () => {
      try {
        const [statsRes, approvedRes] = await Promise.all([
          axiosInstance.get(`/submissions/worker-stats/${user.email}`),
          axiosInstance.get(`/submissions/approved/${user.email}`),
        ])
        setStats(statsRes.data)
        setApproved(approvedRes.data || [])
      } catch { /* keep defaults */ }
      finally { setLoading(false) }
    }
    fetchData()
  }, [user?.email])

  return (
    <div>
      {/* Page header */}
      <FadeCard delay={0}>
        <div style={{ marginBottom:'28px' }}>
          <h1 style={{ fontSize:'22px', fontWeight:700, color:heading, fontFamily:'Space Grotesk, sans-serif' }}>
            Worker Dashboard
          </h1>
          <p style={{ fontSize:'14px', color:sub, marginTop:'4px' }}>
            Track your submissions, earnings and task progress.
          </p>
        </div>
      </FadeCard>

      {/* Stat cards — each with staggered delay */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px', marginBottom:'32px' }} className="stats-grid">
        <StatCard label="Total Submissions"  value={loading?'—':stats.total}                          icon={<FiFileText/>} color="cyan"   sub="All time submissions"    delay={80}  />
        <StatCard label="Pending Submissions" value={loading?'—':stats.pending}                        icon={<FiClock/>}   color="amber"  sub="Awaiting buyer review"   delay={160} />
        <StatCard label="Total Earnings"      value={loading?'—':`$${coinsToDollars(stats.earning)}`}  icon={<FiDollarSign/>} color="green" sub={`${stats.earning} coins earned`} delay={240} />
      </div>

      {/* Approved submissions card */}
      <FadeCard delay={320}>
        <div className="card card-animated-entry">
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'20px' }}>
            <div>
              <h2 style={{ fontSize:'16px', fontWeight:600, color:heading }}>
                Approved Submissions
              </h2>
              <p style={{ fontSize:'13px', color:sub, marginTop:'2px' }}>
                Tasks that have been approved by buyers
              </p>
            </div>
            <Link href="/dashboard/my-submissions" className="btn-ghost btn-sm"
              style={{ display:'flex', alignItems:'center', gap:'6px' }}>
              View All <FiArrowRight size={13} />
            </Link>
          </div>

          {loading ? (
            <div style={{ padding:'32px', textAlign:'center', color:sub, fontSize:'14px' }}>Loading...</div>
          ) : approved.length === 0 ? (
            <EmptyState icon="✅" title="No approved submissions yet" subtitle="Complete tasks and get them approved to see them here." />
          ) : (
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Task Title</th>
                    <th>Buyer</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {approved.slice(0,8).map((s,i) => (
                    <tr key={s._id} style={{ animation:`rowSlideIn 0.4s ease ${i*60}ms both` }}>
                      <td style={{ color:strongTd, fontWeight:500 }}>{s.task_title}</td>
                      <td>{s.Buyer_name}</td>
                      <td style={{ color:accentTd, fontWeight:600 }}>+{s.payable_amount} coins</td>
                      <td>{formatDate(s.current_date)}</td>
                      <td><Badge type={s.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </FadeCard>

      <style>{`
        @media (max-width: 768px) { .stats-grid { grid-template-columns: 1fr !important; } }
        @keyframes rowSlideIn {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}

export default WorkerHome