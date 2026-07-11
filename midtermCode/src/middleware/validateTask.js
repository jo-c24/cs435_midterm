
export function validateFullTask(req, res, next) {
  const body = req.body;

  if (typeof body !== "object" || body === null) {
    return res.status(400).json({ error: "Request body must be a JSON object" });
  }
  if (typeof body.title !== "string" || body.title.trim() === "") {
    return res.status(400).json({ error: "title must be a non-empty string" });
  }
  if (typeof body.course !== "string" || body.course.trim() === "") {
    return res.status(400).json({ error: "course must be a non-empty string" });
  }
  if (body.completed !== undefined && typeof body.completed !== "boolean") {
    return res.status(400).json({ error: "completed must be a boolean" });
  }

  next();
}


export function validatePartialTask(req, res, next) {
  const body = req.body;

  if (typeof body !== "object" || body === null) {
    return res.status(400).json({ error: "Request body must be a JSON object" });
  }

  const hasTitle = body.title !== undefined;
  const hasCourse = body.course !== undefined;
  const hasCompleted = body.completed !== undefined;

  if (!hasTitle && !hasCourse && !hasCompleted) {
    return res.status(400).json({ error: "Provide at least one of title, course, or completed" });
  }
  if (hasTitle && (typeof body.title !== "string" || body.title.trim() === "")) {
    return res.status(400).json({ error: "title must be a non-empty string" });
  }
  if (hasCourse && (typeof body.course !== "string" || body.course.trim() === "")) {
    return res.status(400).json({ error: "course must be a non-empty string" });
  }
  if (hasCompleted && typeof body.completed !== "boolean") {
    return res.status(400).json({ error: "completed must be a boolean" });
  }

  next();
}
