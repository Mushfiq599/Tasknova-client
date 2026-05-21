'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useAuth from '../../hooks/useAuth'
import { useTheme } from '../../context/ThemeContext'
import DashboardSidebar from './DashboardSidebar'
import DashboardHeader from './DashboardHeader'
import { FullPageLoader } from '../ui/LoadingSpinner'

const DashboardShell = ({ children }) => {
    const { user, loading } = useAuth()
    const { theme } = useTheme()
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const isLight = theme === 'light'

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!loading && !user) router.replace('/login')
    }, [user, loading, router])

    if (loading) return <FullPageLoader />
    if (!user) return null

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            // ✅ Theme-aware dashboard background
            background: isLight ? '#E0F2FE' : '#0A0F1E',
            transition: 'background 0.3s ease',
        }}>
            {/* Sidebar */}
            <DashboardSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    style={{
                        position: 'fixed', inset: 0,
                        background: '#00000066',
                        zIndex: 40,
                        display: 'none',
                    }}
                    className="sidebar-overlay"
                />
            )}

            {/* Main content */}
            <div style={{
                flex: 1,
                marginLeft: '240px',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }} className="dashboard-main">
                <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

                <main style={{
                    flex: 1,
                    padding: '24px',
                    maxWidth: '1200px',
                    width: '100%',
                }}>
                    {children}
                </main>
            </div>

            <style>{`
                @media (max-width: 768px) {
                  .dashboard-main   { margin-left: 0 !important; }
                  .sidebar-overlay  { display: block !important; }
                }
            `}</style>
        </div>
    )
}

export default DashboardShell