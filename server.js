const express = require('express');
const app = express();
app.use(express.json());

// 👉 Serve static files from public folder
app.use(express.static('public'));

// Your existing routes
let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

app.get('/users', (req, res) => res.json(users));
app.post('/users', (req, res) => {
  const { name } = req.body;
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
});
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ msg: "User not found" });
  user.name = req.body.name || user.name;
  res.json(user);
});
app.delete('/users/:id', (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.json({ msg: "User deleted" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
