const request = require("supertest");
const express = require("express");
const todoRoutes = require("../routes/todoRoutes");

const app = express();
app.use(express.json());
app.use("/api/todos", todoRoutes);

describe("Todo API", () => {
  it("GET /api/todos → should return an array", async () => {
    const res = await request(app).get("/api/todos");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("POST /api/todos → should create a new todo", async () => {
    const newTodo = { title: "Test Todo", completed: false };
    const res = await request(app).post("/api/todos").send(newTodo);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe(newTodo.title);
  });

  it("PUT /api/todos/:id → should update a todo", async () => {
    const createRes = await request(app)
      .post("/api/todos")
      .send({ title: "Update Test", completed: false });
    const todoId = createRes.body.id;

    const updateRes = await request(app)
      .put(`/api/todos/${todoId}`)
      .send({ completed: true });
    expect(updateRes.statusCode).toEqual(200);
    expect(updateRes.body.completed).toBe(true);
  });

  it("DELETE /api/todos/:id → should delete a todo", async () => {
    const createRes = await request(app)
      .post("/api/todos")
      .send({ title: "Delete Test", completed: false });
    const todoId = createRes.body.id;

    const deleteRes = await request(app).delete(`/api/todos/${todoId}`);
    expect(deleteRes.statusCode).toEqual(204);
  });
});
