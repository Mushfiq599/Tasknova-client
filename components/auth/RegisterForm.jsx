'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser, FiImage } from 'react-icons/fi'
import toast from 'react-hot-toast'
import AuthLayout from './AuthLayout'
import SocialLogin from './SocialLogin'
import useAuth from '../../hooks/useAuth'
import axiosInstance from '../../api/axiosInstance'

const RegisterForm = () => {
    const { register, updateUserProfile } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()
    const defaultRole = searchParams.get('role') || 'worker'

    const [form, setForm] = useState({
        name: '', email: '', photoURL: '', password: '', role: defaultRole,
    })
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const validate = () => {
        const e = {}
        if (!form.name.trim()) e.name = 'Name is required'
        if (!form.email) e.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
        if (!form.password) e.password = 'Password is required'
        else if (form.password.length < 6) e.password = 'Password must be at least 6 characters'
        else if (!/[A-Z]/.test(form.password)) e.password = 'Must contain at least one uppercase letter'
        if (!form.role) e.role = 'Please select a role'
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
            const result = await register(form.email, form.password)
            await updateUserProfile(form.name, form.photoURL)

            // Save user to DB with default coins
            await axiosInstance.post('/users', {
                name: form.name,
                email: form.email,
                photoURL: form.photoURL,
                role: form.role,
                coins: form.role === 'buyer' ? 50 : 10,
            })

            toast.success(`Welcome to TaskNova! You got ${form.role === 'buyer' ? 50 : 10} free coins 🎉`)
            router.push('/dashboard')
        } catch (err) {
            const msg = err?.code === 'auth/email-already-in-use'
                ? 'This email is already registered'
                : err?.message || 'Registration failed'
            toast.error(msg)
        } finally {
            setLoading(false)
        }
    }

    const inputIcon = (icon, name) => ({
        position: 'absolute', left: '14px',
        top: '50%', transform: 'translateY(-50%)',
        color: errors[name] ? '#EF4444' : '#4A5568',
    })

    return (
        <AuthLayout
            title="Create Account"
            subtitle="Join TaskNova and start earning today"
            footerText="Already have an account?"
            footerLink="/login"
            footerLabel="Sign in"
        >
            <form onSubmit={handleSubmit}>
                {/* Name */}
                <div style={{ marginBottom: '14px' }}>
                    <label className="label">Full Name</label>
                    <div style={{ position: 'relative' }}>
                        <FiUser size={15} style={inputIcon(null, 'name')} />
                        <input
                            name="name" type="text" placeholder="John Doe"
                            value={form.name} onChange={handleChange}
                            className="input"
                            style={{ paddingLeft: '40px', borderColor: errors.name ? '#EF4444' : undefined }}
                        />
                    </div>
                    {errors.name && <p style={{ fontSize: '12px', color: '#F87171', marginTop: '4px' }}>{errors.name}</p>}
                </div>

                {/* Email */}
                <div style={{ marginBottom: '14px' }}>
                    <label className="label">Email Address</label>
                    <div style={{ position: 'relative' }}>
                        <FiMail size={15} style={inputIcon(null, 'email')} />
                        <input
                            name="email" type="email" placeholder="you@example.com"
                            value={form.email} onChange={handleChange}
                            className="input"
                            style={{ paddingLeft: '40px', borderColor: errors.email ? '#EF4444' : undefined }}
                        />
                    </div>
                    {errors.email && <p style={{ fontSize: '12px', color: '#F87171', marginTop: '4px' }}>{errors.email}</p>}
                </div>

                {/* Photo URL */}
                <div style={{ marginBottom: '14px' }}>
                    <label className="label">Profile Photo URL <span style={{ color: '#4A5568', textTransform: 'none' }}>(optional)</span></label>
                    <div style={{ position: 'relative' }}>
                        <FiImage size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#4A5568' }} />
                        <input
                            name="photoURL" type="url" placeholder="https://example.com/photo.jpg"
                            value={form.photoURL} onChange={handleChange}
                            className="input" style={{ paddingLeft: '40px' }}
                        />
                    </div>
                </div>

                {/* Password */}
                <div style={{ marginBottom: '14px' }}>
                    <label className="label">Password</label>
                    <div style={{ position: 'relative' }}>
                        <FiLock size={15} style={inputIcon(null, 'password')} />
                        <input
                            name="password" type={showPass ? 'text' : 'password'}
                            placeholder="Min 6 chars, 1 uppercase"
                            value={form.password} onChange={handleChange}
                            className="input"
                            style={{ paddingLeft: '40px', paddingRight: '40px', borderColor: errors.password ? '#EF4444' : undefined }}
                        />
                        <button type="button" onClick={() => setShowPass(s => !s)} style={{
                            position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                            background: 'transparent', border: 'none', cursor: 'pointer', color: '#4A5568',
                        }}>
                            {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                        </button>
                    </div>
                    {errors.password && <p style={{ fontSize: '12px', color: '#F87171', marginTop: '4px' }}>{errors.password}</p>}
                </div>

                {/* Role */}
                <div style={{ marginBottom: '24px' }}>
                    <label className="label">I want to</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {['worker', 'buyer'].map(r => (
                            <button
                                key={r} type="button"
                                onClick={() => { setForm(f => ({ ...f, role: r })); setErrors(e => ({ ...e, role: '' })) }}
                                style={{
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: `1px solid ${form.role === r ? (r === 'worker' ? '#00D4FF' : '#7C3AED') : '#1B3358'}`,
                                    background: form.role === r ? (r === 'worker' ? '#00D4FF12' : '#7C3AED12') : 'transparent',
                                    color: form.role === r ? (r === 'worker' ? '#00D4FF' : '#A78BFA') : '#8892A4',
                                    cursor: 'pointer', fontSize: '13px', fontWeight: 500,
                                    transition: 'all 0.2s',
                                    textAlign: 'center',
                                }}
                            >
                                {r === 'worker' ? '👷 Earn as Worker' : '🧑‍💼 Post as Buyer'}
                                <div style={{ fontSize: '11px', marginTop: '4px', opacity: 0.7 }}>
                                    {r === 'worker' ? 'Get 10 free coins' : 'Get 50 free coins'}
                                </div>
                            </button>
                        ))}
                    </div>
                    {errors.role && <p style={{ fontSize: '12px', color: '#F87171', marginTop: '4px' }}>{errors.role}</p>}
                </div>

                {/* Submit */}
                <button
                    type="submit" disabled={loading}
                    className="btn-primary"
                    style={{
                        width: '100%', justifyContent: 'center',
                        padding: '12px', fontSize: '15px',
                        opacity: loading ? 0.7 : 1,
                        cursor: loading ? 'not-allowed' : 'pointer',
                    }}
                >
                    {loading ? 'Creating account...' : 'Create Account'}
                </button>

                <SocialLogin />
            </form>
        </AuthLayout>
    )
}

export default RegisterForm