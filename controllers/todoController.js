const fs = require('fs');
const path = require('path');
const todosFile = path.join(__dirname, '../data/todos.json');

function getTodos(req, res) {
    fs.readFile(todosFile, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to read todos' });
        res.json(JSON.parse(data || '[]'));
    });
}

function addTodo(req, res) {
    const newTodo = req.body;
    fs.readFile(todosFile, 'utf8', (err, data) => {
        let todos = data ? JSON.parse(data) : [];
        todos.push(newTodo);
        fs.writeFile(todosFile, JSON.stringify(todos, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Failed to save todo' });
            res.status(201).json(newTodo);
        });
    });
}

module.exports = { getTodos, addTodo };