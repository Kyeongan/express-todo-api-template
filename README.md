# Express Todo API Template

A simple and reusable REST API template for managing todos.  
Built with Node.js, Express, and JSON file-based storage.  
Perfect for learning, prototyping, or bootstrapping backend systems.

---

## 💡 Features

- ⚡ CRUD API for Todos
- 📂 JSON file persistence
- 🧪 Jest + Supertest test suite
- 🧑‍💻 Modular folder structure
- 📦 Docker-ready (optional)

---

## 🚀 Getting Started

```markdown
git clone https://github.com/your-username/express-todo-api-template.git
cd express-todo-api-template
npm install
npm start
```

---

## 📚 API Endpoints

| Method | Endpoint           | Description               |
|--------|---------------------|----------------------------|
| GET    | `/api/todos`        | Get all todos              |
| POST   | `/api/todos`        | Create a new todo          |
| PUT    | `/api/todos/:id`    | Update an existing todo    |
| DELETE | `/api/todos/:id`    | Delete a todo              |

---

## 🧪 Run Tests

```bash
npm test
```

Tests use a mock JSON file `todos_test.json`  
to prevent polluting production data.

---

## 🔧 Folder Structure

```
controllers/
data/
routes/
tests/
server.js
package.json
```

---

## 📢 License

MIT License — feel free to fork & extend!
```
