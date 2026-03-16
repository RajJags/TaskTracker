import { useState } from 'react'
import axios from 'axios'

function TaskForm({ selectedDate, onTaskAdded }) {
    const [title, setTitle] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title.trimEnd()) return

        setLoading(true)
        try {
            const response = await axios.post('http://localhost:3000/api/tasks', {
                title,
                date: selectedDate
            })
            onTaskAdded(response.data)
            setTitle('')
        } catch (error) {
            console.error('Failed to add task:', error)
        } finally {
            setLoading(false)
        }
    }


    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a task..."
                className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
            />
            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg"
            >
                {loading ? 'Adding...' : 'Add'}
            </button>
        </form>
    )
}

export default TaskForm