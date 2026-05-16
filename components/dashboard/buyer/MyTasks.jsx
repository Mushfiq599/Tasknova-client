'use client'

import { useEffect, useState } from 'react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import toast from 'react-hot-toast'
import Modal from '../../ui/Modal'
import EmptyState from '../../ui/EmptyState'
import useAuth from '../../../hooks/useAuth'
import axiosInstance from '../../../api/axiosInstance'
import { formatDate } from '../../../utils/helpers'

const MyTasks = () => {
    const { user } = useAuth()
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [editTask, setEditTask] = useState(null)
    const [editForm, setEditForm] = useState({})
    const [saving, setSaving] = useState(false)

    const fetchTasks = () => {
        if (!user?.email) return
        axiosInstance.get(`/tasks/buyer/${user.email}`)
            .then(res => setTasks(res.data || []))
            .catch(() => { })
            .finally(() => setLoading(false))
    }

    useEffect(() => { fetchTasks() }, [user?.email])

    const openEdit = (task) => {
        setEditTask(task)
        setEditForm({
            task_title: task.task_title,
            task_detail: task.task_detail,
            submission_info: task.submission_info,
        })
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            await axiosInstance.patch(`/tasks/${editTask._id}`, editForm)
            toast.success('Task updated!')
            setEditTask(null)
            fetchTasks()
        } catch {
            toast.error('Update failed')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (task) => {
        if (!confirm(`Delete "${task.task_title}"? Unused coins will be refunded.`)) return
        try {
            await axiosInstance.delete(`/tasks/${task._id}`)
            toast.success('Task deleted and coins refunded!')
            fetchTasks()
        } catch {
            toast.error('Delete failed')
        }
    }

    return (
        <div>
            <div style={{ marginBottom: '28px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#E8EAF0', fontFamily: 'Space Grotesk, sans-serif' }}>
                    My Tasks
                </h1>
                <p style={{ fontSize: '14px', color: '#8892A4', marginTop: '4px' }}>
                    Manage all the tasks you have posted.
                </p>
            </div>

            <div className="card">
                {loading ? (
                    <div style={{ padding: '32px', textAlign: 'center', color: '#4A5568' }}>Loading...</div>
                ) : tasks.length === 0 ? (
                    <EmptyState icon="📋" title="No tasks yet" subtitle="Create your first task to get workers started." />
                ) : (
                    <div className="table-wrapper">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Workers</th>
                                    <th>Per Worker</th>
                                    <th>Deadline</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map(t => (
                                    <tr key={t._id}>
                                        <td style={{ color: '#E8EAF0', fontWeight: 500, maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {t.task_title}
                                        </td>
                                        <td>
                                            <span style={{ color: '#00D4FF' }}>{t.required_workers}</span>
                                            <span style={{ color: '#4A5568', fontSize: '12px' }}> needed</span>
                                        </td>
                                        <td style={{ color: '#A78BFA', fontWeight: 600 }}>⬡ {t.payable_amount}</td>
                                        <td>{formatDate(t.completion_date)}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '6px' }}>
                                                <button className="btn-ghost btn-sm"
                                                    onClick={() => openEdit(t)}
                                                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <FiEdit2 size={13} /> Edit
                                                </button>
                                                <button className="btn-danger btn-sm"
                                                    onClick={() => handleDelete(t)}
                                                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <FiTrash2 size={13} /> Delete
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

            {/* Edit modal */}
            <Modal isOpen={!!editTask} onClose={() => setEditTask(null)} title="Edit Task">
                {editTask && (
                    <div>
                        <div style={{ marginBottom: '14px' }}>
                            <label className="label">Task Title</label>
                            <input className="input" value={editForm.task_title}
                                onChange={e => setEditForm(f => ({ ...f, task_title: e.target.value }))} />
                        </div>
                        <div style={{ marginBottom: '14px' }}>
                            <label className="label">Task Detail</label>
                            <textarea className="input" rows={4} value={editForm.task_detail}
                                onChange={e => setEditForm(f => ({ ...f, task_detail: e.target.value }))}
                                style={{ resize: 'vertical' }} />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label className="label">Submission Info</label>
                            <input className="input" value={editForm.submission_info}
                                onChange={e => setEditForm(f => ({ ...f, submission_info: e.target.value }))} />
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }}
                                onClick={() => setEditTask(null)}>
                                Cancel
                            </button>
                            <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}
                                onClick={handleSave} disabled={saving}>
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    )
}

export default MyTasks