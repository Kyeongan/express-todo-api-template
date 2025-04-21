const fs = require("fs");
const path = require("path");
const todosFile = path.join(__dirname, "../data/todos.json");

function getTodos(req, res) {
  fs.readFile(todosFile, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read todos" });
    res.json(JSON.parse(data || "[]"));
  });
}

function addTodo(req, res) {
  const newTodo = { id: Date.now().toString(), ...req.body };
  fs.readFile(todosFile, "utf8", (err, data) => {
    let todos = data ? JSON.parse(data) : [];
    todos.push(newTodo);
    fs.writeFile(todosFile, JSON.stringify(todos, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Failed to save todo" });
      res.status(201).json(newTodo);
    });
  });
}

function updateTodo(req, res) {
  const todoId = req.params.id;
  const updatedData = req.body;

  fs.readFile(todosFile, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read todos" });

    let todos = JSON.parse(data || "[]");
    const index = todos.findIndex((todo) => todo.id === todoId);

    if (index === -1) return res.status(404).json({ error: "Todo not found" });

    todos[index] = { ...todos[index], ...updatedData };

    fs.writeFile(todosFile, JSON.stringify(todos, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Failed to update todo" });
      res.json(todos[index]);
    });
  });
}

function deleteTodo(req, res) {
  const todoId = req.params.id;

  fs.readFile(todosFile, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read todos" });

    let todos = JSON.parse(data || "[]");
    const newTodos = todos.filter((todo) => todo.id !== todoId);

    if (todos.length === newTodos.length) {
      return res.status(404).json({ error: "Todo not found" });
    }

    fs.writeFile(todosFile, JSON.stringify(newTodos, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Failed to delete todo" });
      res.status(204).send();
    });
  });
}

module.exports = { getTodos, addTodo, updateTodo, deleteTodo };
