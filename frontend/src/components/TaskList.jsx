import TaskItem from './TaskItem'

function TaskList({ tasks, onTaskUpdated, onTaskDeleted }) {
    const pending = tasks.filter(task => !task.completed)
    const completed = tasks.filter(task => task.completed)

    if (tasks.length === 0) {
        return (
            <p style={{ color: '#6b7280', textAlign: 'center', marginTop: '2rem' }}>
                No tasks yet. Add one above!
            </p>
        )
    }

    return (
        <div>
            {pending.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onTaskUpdated={onTaskUpdated}
                    onTaskDeleted={onTaskDeleted}
                />
            ))}

            {completed.length > 0 && (
                <div style={{ marginTop: '1.5rem' }}>
                    <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                        Completed ({completed.length})
                    </p>
                    {completed.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onTaskUpdated={onTaskUpdated}
                            onTaskDeleted={onTaskDeleted}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default TaskList