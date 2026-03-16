import { useState, useEffect } from 'react'
import axios from 'axios'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import TaskItem from './components/TaskItem'

function App() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  )
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/tasks?date=${selectedDate}`)
        setTasks(response.data)
      } catch (error) {
        console.error('Failed to fetch tasks:', error)
      }
    }
    fetchTasks()
  }, [selectedDate])

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask])
  }

  const handleTaskUpdated = (updatedTask) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        Number(task.id) === Number(updatedTask.id) ? updatedTask : task
      )
    )
  }

  const handleTaskDeleted = (deletedId) => {
    setTasks(tasks.filter(t => t.id !== deletedId))
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#111', color: 'white', padding: '2rem' }}>
      <div style={{ maxWidth: '672px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Task Tracker</h1>
        <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>Stay on top of your day</p>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{ backgroundColor: '#1f2937', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', marginBottom: '2rem', border: '1px solid #374151' }}
        />

        <TaskForm selectedDate={selectedDate} onTaskAdded={handleTaskAdded} />
        <TaskList
          tasks={tasks}
          onTaskUpdated={handleTaskUpdated}
          onTaskDeleted={handleTaskDeleted}
        />
      </div>
    </div>
  )
}

export default App