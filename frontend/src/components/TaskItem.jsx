import { useState } from 'react'
import axios from 'axios'

function TaskItem({ task, onTaskUpdated, onTaskDeleted }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title)

    const handleToggle = async () => {
        try {
            const response = await axios.patch(`http://localhost:3000/api/tasks/${task.id}`, {
                completed: task.completed ? 0 : 1
            })
            onTaskUpdated(response.data)
            console.log(response.data)
        } catch (error) {
            console.error('Failed to toggle task:', error)
        }
    }

    const handleEdit = async () => {
        if (!isEditing) {
            setIsEditing(true)
            return
        }
        try {
            const response = await axios.patch(`http://localhost:3000/api/tasks/${task.id}`, {
                title: editTitle
            })
            onTaskUpdated(response.data)
            setIsEditing(false)
        } catch (error) {
            console.error('Failed to edit task:', error)
        }
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/tasks/${task.id}`)
            onTaskDeleted(task.id)
        } catch (error) {
            console.error('Failed to delete task:', error)
        }
    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            marginBottom: '0.5rem',
            backgroundColor: '#1f2937',
            borderRadius: '0.5rem',
            opacity: task.completed ? 0.5 : 1,
            transition: 'opacity 0.3s ease'
        }}>
            <input
                type="checkbox"
                checked={!!task.completed}
                onChange={handleToggle}
                style={{ width: '1.1rem', height: '1.1rem', cursor: 'pointer' }}
            />

            {isEditing ? (
                <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    style={{ flex: 1, backgroundColor: '#374151', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', border: '1px solid #4b5563' }}
                />
            ) : (
                <span style={{
                    flex: 1,
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? '#6b7280' : 'white',
                    transition: 'all 0.3s ease'
                }}>
                    {task.title}
                </span>
            )}

            <button onClick={handleEdit} style={{ color: '#60a5fa', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}>
                {isEditing ? 'Save' : 'Edit'}
            </button>
            <button onClick={handleDelete} style={{ color: '#f87171', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}>
                Delete
            </button>
        </div>
    )
}

export default TaskItem


