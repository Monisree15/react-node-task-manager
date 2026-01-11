
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/tasks', async (req, res) => {
    const [rows] = await db.query("SELECT * FROM tasks");
    res.json(rows);
});

app.post('/api/tasks', async (req, res) => {
    const { title } = req.body;
    await db.query("INSERT INTO tasks (title) VALUES (?)", [title]);
    res.json({ message: "Task added" });
});

app.delete('/api/tasks/:id', async (req, res) => {
    await db.query("DELETE FROM tasks WHERE id=?", [req.params.id]);
    res.json({ message: "Task deleted" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
