import express from "express";

import { logger } from "./middleware/logger.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import { createTasksRouter } from "./routes/tasks.js";


export function createApp() {
  const app = express();

  // Built-in middleware that parses JSON request bodies.
  app.use(express.json());

  // Application-level middleware: log every request.
  app.use(logger);

  // Simple health check.
  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // All of the task routes live under /api/tasks.
  app.use("/api/tasks", createTasksRouter());

  // Anything that did not match a route above is a 404.
  app.use(notFound);

  // The error handler catches anything that threw.
  app.use(errorHandler);

  return app;
}

const isMainModule = process.argv[1] === new URL(import.meta.url).pathname;

if (isMainModule) {
  const PORT = process.env.PORT || 3000;
  const app = createApp();

  app.listen(PORT, () => {
    console.log(`Course Task Tracker API listening on port ${PORT}`);
  });
}
