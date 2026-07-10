
import express from "express";

export function createApp() {
  const app = express();

  app.use(express.json());

  // Starter data. This data is stored in memory and will reset when the
  // server restarts.
  let nextId = 3;
  const items = [
    { id: 1, name: "keyboard", quantity: 10 },
    { id: 2, name: "mouse", quantity: 5 }
  ];

  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Validate an item payload. Returns an error message string if invalid,
  // or null if the body has a valid name and quantity.

  // CHANGE THESE TO BE TITLE, COURSE, AND COMPLETED !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  function validateItemBody(body) {
    if (typeof body !== "object" || body === null) {
      return "Request body must be a JSON object";
    }
    if (typeof body.name !== "string" || body.name.trim() === "") {
      return "name must be a non-empty string";
    }
    if (typeof body.quantity !== "number" || Number.isNaN(body.quantity) || body.quantity < 0) {
      return "quantity must be a number greater than or equal to zero";
    }
    return null;
  }

  // Return all items.
  app.get("/items", (req, res) => {
    res.json(items);
  });

  // Return one item by ID.
  app.get("/items/:id", (req, res) => {
    const id = Number(req.params.id);
    const item = items.find((it) => it.id === id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
  });

  // Create a new item.

  // CHANGE STRUCTURE TO BE TITLE, COURSE, COMPLETED !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  app.post("/items", (req, res) => {
    const error = validateItemBody(req.body);
    if (error) {
      return res.status(400).json({ error });
    }
    const item = {
      id: nextId++,
      name: req.body.name,
      quantity: req.body.quantity
    };
    items.push(item);
    res.status(201).json(item);
  });

  // Update an existing item (replaces name and quantity).

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  app.put("/items/:id", (req, res) => {
    const id = Number(req.params.id);
    const item = items.find((it) => it.id === id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    const error = validateItemBody(req.body);
    if (error) {
      return res.status(400).json({ error });
    }
    item.name = req.body.name;
    item.quantity = req.body.quantity;
    res.json(item);
  });

  // Delete an existing item.

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  app.delete("/items/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = items.findIndex((it) => it.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Item not found" });
    }
    items.splice(index, 1);
    res.status(204).end();
  });

  app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  return app;
}

const isMainModule = process.argv[1] === new URL(import.meta.url).pathname;

if (isMainModule) {
  const PORT = process.env.PORT || 3000;
  const app = createApp();

  app.listen(PORT, () => {
    console.log(`MIDTERM listening on port ${PORT}`);
  });
}