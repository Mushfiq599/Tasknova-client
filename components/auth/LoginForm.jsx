'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiEye, FiEyeOff, FiMail, FiLock } from 'react-icons/fi'
import toast from 'react-hot-toast'
import AuthLayout from './AuthLayout'
import SocialLogin from './SocialLogin'
import useAuth from '../../hooks/useAuth'

const LoginForm = () => {
    const { login } = useAuth()
    const router = useRouter()
    const [form, setForm] = useState({ email: '', password: '' })
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const validate = () => {
        const e = {}
        if (!form.email) e.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
        if (!form.password) e.password = 'Password is required'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const handleChange = (e) => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }))
        setErrors(err => ({ ...err, [e.target.name]: '' }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) return
        setLoading(true)
        try {
            await login(form.email, form.password)
            toast.success('Welcome back!')
            router.push('/dashboard')
        } catch (err) {
            const msg = err?.code === 'auth/invalid-credential'
                ? 'Invalid email or password'
                : err?.message || 'Login failed'
            toast.error(msg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to your TaskNova account"
            footerText="Don't have an account?"
            footerLink="/register"
            footerLabel="Create one free"
        >
            <form onSubmit={handleSubmit}>
                {/* Email */}
                <div style={{ marginBottom: '16px' }}>
                    <label className="label">Email Address</label>
                    <div style={{ position: 'relative' }}>
                        <FiMail size={15} style={{
                            position: 'absolute', left: '14px',
                            top: '50%', transform: 'translateY(-50%)',
                            color: '#4A5568',
                        }} />
                        <input
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            className="input"
                            style={{ paddingLeft: '40px', borderColor: errors.email ? '#EF4444' : undefined }}
                        />
                    </div>
                    {errors.email && (
                        <p style={{ fontSize: '12px', color: '#F87171', marginTop: '4px' }}>{errors.email}</p>
                    )}
                </div>

                {/* Password */}
                <div style={{ marginBottom: '24px' }}>
                    <label className="label">Password</label>
                    <div style={{ position: 'relative' }}>
                        <FiLock size={15} style={{
                            position: 'absolute', left: '14px',
                            top: '50%', transform: 'translateY(-50%)',
                            color: '#4A5568',
                        }} />
                        <input
                            name="password"
                            type={showPass ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={form.password}
                            onChange={handleChange}
                            className="input"
                            style={{
                                paddingLeft: '40px', paddingRight: '40px',
                                borderColor: errors.password ? '#EF4444' : undefined,
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPass(s => !s)}
                            style={{
                                position: 'absolute', right: '14px',
                                top: '50%', transform: 'translateY(-50%)',
                                background: 'transparent', border: 'none',
                                cursor: 'pointer', color: '#4A5568',
                            }}
                        >
                            {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                        </button>
                    </div>
                    {errors.password && (
                        <p style={{ fontSize: '12px', color: '#F87171', marginTop: '4px' }}>{errors.password}</p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                    style={{
                        width: '100%', justifyContent: 'center',
                        padding: '12px', fontSize: '15px',
                        opacity: loading ? 0.7 : 1,
                        cursor: loading ? 'not-allowed' : 'pointer',
                    }}
                >
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>

                <SocialLogin />
            </form>
        </AuthLayout>
    )
}

export default LoginForm