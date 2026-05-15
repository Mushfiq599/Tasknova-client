'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'
import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'
import axiosInstance from '../../api/axiosInstance'

const SocialLogin = () => {
    const { googleLogin } = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleGoogle = async () => {
        setLoading(true)
        try {
            const result = await googleLogin()
            const u = result.user

            // Save user in DB (will skip if already exists)
            await axiosInstance.post('/users', {
                name: u.displayName,
                email: u.email,
                photoURL: u.photoURL,
                role: 'worker',   // default role for google signup
            })

            toast.success('Logged in with Google!')
            router.push('/dashboard')
        } catch (err) {
            toast.error(err?.message || 'Google login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            {/* Divider */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                margin: '20px 0',
            }}>
                <div style={{ flex: 1, height: '1px', background: '#1B3358' }} />
                <span style={{ fontSize: '12px', color: '#4A5568' }}>OR</span>
                <div style={{ flex: 1, height: '1px', background: '#1B3358' }} />
            </div>

            <button
                onClick={handleGoogle}
                disabled={loading}
                style={{
                    width: '100%',
                    background: 'transparent',
                    border: '1px solid #1B3358',
                    borderRadius: '8px',
                    padding: '10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: '10px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    color: '#E8EAF0',
                    fontSize: '14px',
                    fontWeight: 500,
                    transition: 'all 0.2s',
                    opacity: loading ? 0.6 : 1,
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#2A4A7A'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#1B3358'}
            >
                <FcGoogle size={20} />
                {loading ? 'Connecting...' : 'Continue with Google'}
            </button>
        </div>
    )
}

export default SocialLogin