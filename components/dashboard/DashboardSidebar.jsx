'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  FiHome, FiList, FiFileText, FiDollarSign,
  FiPlusCircle, FiCheckSquare, FiCreditCard,
  FiClock, FiUsers, FiSettings, FiX,
} from 'react-icons/fi'
import Logo from '../shared/Logo'
import useAuth from '../../hooks/useAuth'
import { useTheme } from '../../context/ThemeContext'

const navItems = {
  worker: [
    { label:'Home',           href:'/dashboard/worker-home',    icon:<FiHome size={16}/> },
    { label:'Task List',      href:'/dashboard/task-list',       icon:<FiList size={16}/> },
    { label:'My Submissions', href:'/dashboard/my-submissions',  icon:<FiFileText size={16}/> },
    { label:'Withdrawals',    href:'/dashboard/withdrawals',     icon:<FiDollarSign size={16}/> },
  ],
  buyer: [
    { label:'Home',            href:'/dashboard/buyer-home',      icon:<FiHome size={16}/> },
    { label:'Add New Task',    href:'/dashboard/add-task',        icon:<FiPlusCircle size={16}/> },
    { label:'My Tasks',        href:'/dashboard/my-tasks',        icon:<FiCheckSquare size={16}/> },
    { label:'Purchase Coin',   href:'/dashboard/purchase-coin',   icon:<FiCreditCard size={16}/> },
    { label:'Payment History', href:'/dashboard/payment-history', icon:<FiClock size={16}/> },
  ],
  admin: [
    { label:'Home',         href:'/dashboard/admin-home',    icon:<FiHome size={16}/> },
    { label:'Manage Users', href:'/dashboard/manage-users',  icon:<FiUsers size={16}/> },
    { label:'Manage Tasks', href:'/dashboard/manage-tasks',  icon:<FiSettings size={16}/> },
  ],
}

const DashboardSidebar = ({ isOpen, onClose }) => {
  const { role } = useAuth()
  const { theme } = useTheme()
  const pathname = usePathname()
  const items = navItems[role] || navItems.worker
  const isLight = theme === 'light'

  /* ── tokens ── */
  const bg          = isLight ? '#BAE6FD' : '#060A14'
  const borderColor = isLight ? '#7DD3FC' : '#1B3358'
  const activeColor = isLight ? '#0284C7' : '#00D4FF'
  const activeBg    = isLight ? 'rgba(2,132,199,0.10)' : 'rgba(0,212,255,0.06)'
  const inactiveClr = isLight ? '#0C4A6E' : '#8892A4'
  const hoverClr    = isLight ? '#0C1A2E' : '#E8EAF0'
  const hoverBg     = isLight ? 'rgba(14,165,233,0.12)' : 'rgba(255,255,255,0.04)'
  const divider     = isLight ? '#93C5FD' : '#1B3358'
  const backClr     = isLight ? '#0369A1' : '#4A5568'
  const backHover   = isLight ? '#0284C7' : '#8892A4'

  return (
    <aside style={{
      position:'fixed', top:0, left:isOpen?0:undefined,
      width:'240px', height:'100vh',
      background:bg, borderRight:`1px solid ${borderColor}`,
      display:'flex', flexDirection:'column',
      zIndex:50, transition:'transform 0.3s ease, background 0.3s ease',
    }} className="dashboard-sidebar">

      {/* Logo + close */}
      <div style={{ padding:'20px 16px', borderBottom:`1px solid ${divider}`, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <Logo />
        <button onClick={onClose} className="sidebar-close-btn" style={{
          background:'transparent', border:'none', cursor:'pointer',
          color:inactiveClr, display:'none', padding:'4px',
        }}>
          <FiX size={18} />
        </button>
      </div>

      {/* Role badge */}
      <div style={{ padding:'12px 16px' }}>
        <span className={`badge-${role||'worker'}`} style={{ fontSize:'11px' }}>
          {role ? role.charAt(0).toUpperCase()+role.slice(1) : 'Worker'} Panel
        </span>
      </div>

      {/* Nav items */}
      <nav style={{ flex:1, padding:'8px 12px', overflowY:'auto' }}>
        {items.map(item => {
          const active = pathname === item.href
          return (
            <Link key={item.href} href={item.href} onClick={onClose} style={{
              display:'flex', alignItems:'center', gap:'10px',
              padding:'10px 12px', borderRadius:'8px', marginBottom:'4px',
              textDecoration:'none', fontSize:'14px',
              fontWeight: active ? 500 : 400,
              color:  active ? activeColor : inactiveClr,
              background: active ? activeBg : 'transparent',
              borderLeft: `2px solid ${active ? activeColor : 'transparent'}`,
              transition:'all 0.15s',
            }}
              onMouseEnter={e=>{ if(!active){ e.currentTarget.style.color=hoverClr; e.currentTarget.style.background=hoverBg }}}
              onMouseLeave={e=>{ if(!active){ e.currentTarget.style.color=inactiveClr; e.currentTarget.style.background='transparent' }}}
            >
              {item.icon}
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Back to home */}
      <div style={{ padding:'16px 12px', borderTop:`1px solid ${divider}` }}>
        <Link href="/" style={{
          display:'flex', alignItems:'center', gap:'10px',
          padding:'10px 12px', borderRadius:'8px',
          textDecoration:'none', fontSize:'13px',
          color:backClr, transition:'color 0.15s',
        }}
          onMouseEnter={e=>e.currentTarget.style.color=backHover}
          onMouseLeave={e=>e.currentTarget.style.color=backClr}
        >
          ← Back to Home
        </Link>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .dashboard-sidebar { transform: ${isOpen?'translateX(0)':'translateX(-100%)'}; }
          .sidebar-close-btn { display: flex !important; }
        }
      `}</style>
    </aside>
  )
}

export default DashboardSidebar