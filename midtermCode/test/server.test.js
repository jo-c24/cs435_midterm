import { beforeEach, describe, expect, test } from "vitest";
import request from "supertest";
import { createApp } from "../src/server.js";

// Each test gets a fresh app so the in-memory data resets between tests.
let app;

beforeEach(() => {
  app = createApp();
});

describe("GET /health", () => {
  test("returns status ok", async () => {
    const response = await request(app).get("/health").expect(200);
    expect(response.body).toEqual({ status: "ok" });
  });
});

describe("GET /api/tasks", () => {
  test("returns the list of tasks", async () => {
    const response = await request(app).get("/api/tasks").expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toEqual({
      id: "1",
      title: "Watch Week 3 lecture",
      course: "CS453",
      completed: false
    });
  });
});

describe("GET /api/tasks/:id", () => {
  test("returns a single task when it exists", async () => {
    const response = await request(app).get("/api/tasks/1").expect(200);
    expect(response.body).toEqual({
      id: "1",
      title: "Watch Week 3 lecture",
      course: "CS453",
      completed: false
    });
  });

  test("returns 404 when the task does not exist", async () => {
    const response = await request(app).get("/api/tasks/999").expect(404);
    expect(response.body).toHaveProperty("error");
  });
});

describe("POST /api/tasks", () => {
  test("creates a new task and returns 201", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({ title: "Read chapter 4", course: "CS453", completed: false })
      .expect(201);
    expect(response.body).toEqual({
      id: "3",
      title: "Read chapter 4",
      course: "CS453",
      completed: false
    });
  });

  test("defaults completed to false when it is omitted", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({ title: "No completed field", course: "CS453" })
      .expect(201);
    expect(response.body.completed).toBe(false);
  });

  test("newly created task is retrievable", async () => {
    await request(app)
      .post("/api/tasks")
      .send({ title: "Fetch me", course: "CS453" })
      .expect(201);
    const response = await request(app).get("/api/tasks/3").expect(200);
    expect(response.body.title).toBe("Fetch me");
  });

  test("returns 400 when required fields are missing", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({ title: "No course here" })
      .expect(400);
    expect(response.body).toHaveProperty("error");
  });

  test("returns 400 when data is invalid", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({ title: "", course: "CS453" })
      .expect(400);
    expect(response.body).toHaveProperty("error");
  });
});

describe("PUT /api/tasks/:id", () => {
  test("replaces an existing task", async () => {
    const response = await request(app)
      .put("/api/tasks/1")
      .send({ title: "Watch it again", course: "CS453", completed: true })
      .expect(200);
    expect(response.body).toEqual({
      id: "1",
      title: "Watch it again",
      course: "CS453",
      completed: true
    });
  });

  test("returns 404 when replacing a missing task", async () => {
    const response = await request(app)
      .put("/api/tasks/999")
      .send({ title: "ghost", course: "CS453" })
      .expect(404);
    expect(response.body).toHaveProperty("error");
  });

  test("returns 400 when body is invalid", async () => {
    const response = await request(app)
      .put("/api/tasks/1")
      .send({ title: "ok", course: "CS453", completed: "not a boolean" })
      .expect(400);
    expect(response.body).toHaveProperty("error");
  });
});

describe("PATCH /api/tasks/:id", () => {
  test("updates only the provided fields", async () => {
    const response = await request(app)
      .patch("/api/tasks/1")
      .send({ completed: true })
      .expect(200);
    expect(response.body).toEqual({
      id: "1",
      title: "Watch Week 3 lecture",
      course: "CS453",
      completed: true
    });
  });

  test("returns 404 when patching a missing task", async () => {
    const response = await request(app)
      .patch("/api/tasks/999")
      .send({ completed: true })
      .expect(404);
    expect(response.body).toHaveProperty("error");
  });

  test("returns 400 when no fields are provided", async () => {
    const response = await request(app)
      .patch("/api/tasks/1")
      .send({})
      .expect(400);
    expect(response.body).toHaveProperty("error");
  });
});

describe("DELETE /api/tasks/:id", () => {
  test("deletes an existing task and returns 204", async () => {
    await request(app).delete("/api/tasks/1").expect(204);
    await request(app).get("/api/tasks/1").expect(404);
  });

  test("returns 404 when deleting a missing task", async () => {
    const response = await request(app).delete("/api/tasks/999").expect(404);
    expect(response.body).toHaveProperty("error");
  });
});
