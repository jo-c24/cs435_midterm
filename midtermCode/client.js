
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";


async function call(label, path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, options);

  let body = null;
  const text = await res.text();
  if (text) {
    body = JSON.parse(text);
  }

  console.log(`\n${label}`);
  console.log(`  ${options.method || "GET"} ${path} -> ${res.status}`);
  console.log("  ", body);

  return body;
}

const jsonHeaders = { "Content-Type": "application/json" };

async function main() {
  // 1. Health check.
  await call("1. Health check", "/health");

  // 2. Create a task.
  const created = await call("2. Create a task", "/api/tasks", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({
      title: "Study for the midterm",
      course: "CS453",
      completed: false
    })
  });

  const id = created.id;

  // 3. List all tasks.
  await call("3. List all tasks", "/api/tasks");

  // 4. Get the one task we just created by its id.
  await call(`4. Get task ${id}`, `/api/tasks/${id}`);

  // 5. Update that task (mark it completed) with PATCH.
  await call(`5. Update task ${id}`, `/api/tasks/${id}`, {
    method: "PATCH",
    headers: jsonHeaders,
    body: JSON.stringify({ completed: true })
  });

  // 6. Delete the task.
  await call(`6. Delete task ${id}`, `/api/tasks/${id}`, {
    method: "DELETE"
  });

  console.log("\nDone.");
}

main().catch((err) => {
  console.error("\nClient error:", err.message);
  console.error("Is the server running? Try `npm run server` in another terminal.");
  process.exit(1);
});
