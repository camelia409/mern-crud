const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Dummy in-memory data
let users = [];
let currentId = 1;

// Routes
app.get("/api/users", (req, res) => {
    res.json(users);
});

app.post("/api/users", (req, res) => {
    const newUser = { id: currentId++, ...req.body };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.put("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    users = users.map(u => u.id === id ? { ...u, ...req.body } : u);
    res.json({ message: "User updated" });
});

app.delete("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    users = users.filter(u => u.id !== id);
    res.json({ message: "User deleted" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
