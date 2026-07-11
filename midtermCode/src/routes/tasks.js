import express from "express";

import { validateFullTask, validatePartialTask } from "../middleware/validateTask.js";


export function createTasksRouter() {
  const router = express.Router();


  let nextId = 3;
  const tasks = [
    { id: "1", title: "Watch Week 3 lecture", course: "CS453", completed: false },
    { id: "2", title: "Submit Lab 3", course: "CS453", completed: false },
    { id: "3", title: "Watch Week 3 Lab Video", course: "CS453", completed: true},
    { id: "4", title: "Read Week 3 Lecture Slides", course: "CS453", completed: false}
  ];

  // Return all tasks.
  router.get("/", (req, res) => {
    res.json(tasks);
  });

  // Return one task by id, or 404 if there is no task with that id.
  router.get("/:id", (req, res) => {
    const task = tasks.find((t) => t.id === req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  });

  // Create a new task. validateFullTask has already checked the body.
  router.post("/", validateFullTask, (req, res) => {
    const task = {
      id: String(nextId++),
      title: req.body.title,
      course: req.body.course,
      completed: req.body.completed ?? false
    };
    tasks.push(task);
    res.status(201).json(task);
  });

  // Replace an existing task
  router.put("/:id", validateFullTask, (req, res) => {
    const task = tasks.find((t) => t.id === req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    task.title = req.body.title;
    task.course = req.body.course;
    task.completed = req.body.completed ?? false;
    res.json(task);
  });

  // Partially update a task
  router.patch("/:id", validatePartialTask, (req, res) => {
    const task = tasks.find((t) => t.id === req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    if (req.body.title !== undefined) task.title = req.body.title;
    if (req.body.course !== undefined) task.course = req.body.course;
    if (req.body.completed !== undefined) task.completed = req.body.completed;
    res.json(task);
  });

  // Delete a task. Returns 204 No Content on success.
  router.delete("/:id", (req, res) => {
    const index = tasks.findIndex((t) => t.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: "Task not found" });
    }
    tasks.splice(index, 1);
    res.status(204).end();
  });

  return router;
}
