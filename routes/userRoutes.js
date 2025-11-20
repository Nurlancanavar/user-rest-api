import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.join(__dirname, '../data/users.json');

const router = express.Router();

router.get('/', (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFilePath));
  res.json(users);
});

router.get('/:id', (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFilePath));
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});


router.post('/', (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFilePath));
  const newUser = {
    id: uuidv4(),
    name: req.body.name,
    email: req.body.email,
    age: req.body.age
  };
  users.push(newUser);
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  res.status(201).json(newUser);
});


router.put('/:id', (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFilePath));
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "User not found" });
  users[index] = { ...users[index], ...req.body };
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  res.json(users[index]);
});


router.delete('/:id', (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFilePath));
  const filtered = users.filter(u => u.id !== req.params.id);
  if (filtered.length === users.length) 
    return res.status(404).json({ message: "User not found" });
  fs.writeFileSync(usersFilePath, JSON.stringify(filtered, null, 2));
  res.json({ message: "User deleted" });
});

export default router;