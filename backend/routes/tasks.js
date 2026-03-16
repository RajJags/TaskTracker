const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
    const { title, date } = req.body;

    if (!title || !date) {
        return res.status(400).json({ error: 'Title and date are required' });
    }

    const stmt = db.prepare(`
        INSERT INTO tasks (title, date)
        VALUES (?,?)
        `);

    const result = stmt.run(title, date);

    res.status(201).json({ id: result.lastInsertRowid, title, date, completed: 0 });
});

router.get('/', (req, res) => {
    const { date } = req.query;

    if (!date) {
        return res.status(400).json({ error: 'Date is required' });
    }

    const tasks = db.prepare(`
    SELECT * FROM tasks
    WHERE date = ?
    ORDER BY completed ASC, created_at ASC
  `).all(date);

    res.json(tasks);
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const updatedTitle = title !== undefined ? title : task.title;
    const updatedCompleted = completed !== undefined ? completed : task.completed;

    db.prepare(`
    UPDATE tasks
    SET title = ?, completed = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(updatedTitle, updatedCompleted, id);

    res.json({ id, title: updatedTitle, completed: updatedCompleted });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    db.prepare('DELETE FROM tasks WHERE id = ?').run(id);

    res.json({ message: 'Task deleted', id });
});

router.get('/week', (req, res) => {
    const tasks = db.prepare(`
    SELECT * FROM tasks
    WHERE date >= date('now', '-7 days')
    ORDER BY date ASC, completed ASC, created_at ASC
  `).all();

    res.json(tasks);
});
module.exports = router;