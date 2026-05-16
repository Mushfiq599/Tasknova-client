'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiInfo } from 'react-icons/fi'
import toast from 'react-hot-toast'
import useAuth from '../../../hooks/useAuth'
import axiosInstance from '../../../api/axiosInstance'
import { calcTotalPayable } from '../../../utils/helpers'

const AddTask = () => {
    const { user } = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
        task_title: '',
        task_detail: '',
        required_workers: '',
        payable_amount: '',
        completion_date: '',
        submission_info: '',
        task_image_url: '',
    })

    const totalPayable = calcTotalPayable(Number(form.required_workers), Number(form.payable_amount))

    const handleChange = (e) => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }))
        setErrors(err => ({ ...err, [e.target.name]: '' }))
    }

    const validate = () => {
        const e = {}
        if (!form.task_title.trim()) e.task_title = 'Task title is required'
        if (!form.task_detail.trim()) e.task_detail = 'Task detail is required'
        if (!form.required_workers || Number(form.required_workers) < 1)
            e.required_workers = 'Enter a valid number of workers'
        if (!form.payable_amount || Number(form.payable_amount) < 1)
            e.payable_amount = 'Enter a valid amount'
        if (!form.completion_date) e.completion_date = 'Deadline is required'
        if (!form.submission_info.trim()) e.submission_info = 'Submission info is required'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) return
        setLoading(true)
        try {
            // Check buyer coins
            const coinsRes = await axiosInstance.get(`/users/coins/${user.email}`)
            const available = coinsRes.data?.coins || 0

            if (totalPayable > available) {
                toast.error('Not enough coins. Please purchase more coins.')
                router.push('/dashboard/purchase-coin')
                return
            }

            await axiosInstance.post('/tasks', {
                ...form,
                required_workers: Number(form.required_workers),
                payable_amount: Number(form.payable_amount),
                Buyer_name: user.displayName,
                Buyer_email: user.email,
                created_at: new Date(),
            })

            toast.success('Task created successfully!')
            setForm({
                task_title: '', task_detail: '', required_workers: '',
                payable_amount: '', completion_date: '',
                submission_info: '', task_image_url: '',
            })
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Failed to create task')
        } finally {
            setLoading(false)
        }
    }

    const Field = ({ name, label, children }) => (
        <div style={{ marginBottom: '16px' }}>
            <label className="label">{label}</label>
            {children}
            {errors[name] && (
                <p style={{ fontSize: '12px', color: '#F87171', marginTop: '4px' }}>{errors[name]}</p>
            )}
        </div>
    )

    return (
        <div style={{ maxWidth: '720px' }}>
            <div style={{ marginBottom: '28px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#E8EAF0', fontFamily: 'Space Grotesk, sans-serif' }}>
                    Add New Task
                </h1>
                <p style={{ fontSize: '14px', color: '#8892A4', marginTop: '4px' }}>
                    Create a task for workers to complete and earn coins.
                </p>
            </div>

            <div className="card">
                <form onSubmit={handleSubmit}>
                    <Field name="task_title" label="Task Title">
                        <input name="task_title" className="input" placeholder="e.g. Watch my YouTube video and leave a comment"
                            value={form.task_title} onChange={handleChange}
                            style={{ borderColor: errors.task_title ? '#EF4444' : undefined }} />
                    </Field>

                    <Field name="task_detail" label="Task Detail">
                        <textarea name="task_detail" className="input" rows={4}
                            placeholder="Describe exactly what workers need to do..."
                            value={form.task_detail} onChange={handleChange}
                            style={{ resize: 'vertical', borderColor: errors.task_detail ? '#EF4444' : undefined }} />
                    </Field>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="two-col">
                        <Field name="required_workers" label="Required Workers">
                            <input name="required_workers" type="number" min="1" className="input"
                                placeholder="e.g. 100"
                                value={form.required_workers} onChange={handleChange}
                                style={{ borderColor: errors.required_workers ? '#EF4444' : undefined }} />
                        </Field>
                        <Field name="payable_amount" label="Coins Per Worker">
                            <input name="payable_amount" type="number" min="1" className="input"
                                placeholder="e.g. 10"
                                value={form.payable_amount} onChange={handleChange}
                                style={{ borderColor: errors.payable_amount ? '#EF4444' : undefined }} />
                        </Field>
                    </div>

                    {/* Total payable preview */}
                    {totalPayable > 0 && (
                        <div style={{
                            background: '#00D4FF08', border: '1px solid #00D4FF22',
                            borderRadius: '8px', padding: '12px 16px',
                            display: 'flex', alignItems: 'center', gap: '10px',
                            marginBottom: '16px',
                        }}>
                            <FiInfo size={15} style={{ color: '#00D4FF', flexShrink: 0 }} />
                            <p style={{ fontSize: '13px', color: '#8892A4' }}>
                                Total cost:{' '}
                                <span style={{ color: '#00D4FF', fontWeight: 600 }}>⬡ {totalPayable} coins</span>
                                {' '}({form.required_workers} workers × {form.payable_amount} coins)
                            </p>
                        </div>
                    )}

                    <Field name="completion_date" label="Completion Deadline">
                        <input name="completion_date" type="date" className="input"
                            value={form.completion_date} onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                            style={{ borderColor: errors.completion_date ? '#EF4444' : undefined }} />
                    </Field>

                    <Field name="submission_info" label="Submission Info">
                        <input name="submission_info" className="input"
                            placeholder="e.g. Screenshot of your comment, proof link..."
                            value={form.submission_info} onChange={handleChange}
                            style={{ borderColor: errors.submission_info ? '#EF4444' : undefined }} />
                    </Field>

                    <Field name="task_image_url" label="Task Image URL (optional)">
                        <input name="task_image_url" type="url" className="input"
                            placeholder="https://example.com/image.jpg"
                            value={form.task_image_url} onChange={handleChange} />
                    </Field>

                    <button type="submit" disabled={loading} className="btn-primary"
                        style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '15px', opacity: loading ? 0.7 : 1 }}>
                        {loading ? 'Creating Task...' : 'Add Task'}
                    </button>
                </form>
            </div>

            <style>{`
        @media (max-width: 640px) {
          .two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    )
}

export default AddTask