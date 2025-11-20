import express from 'express';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: "User REST API işləyir!", task: "Task 4" });
});

app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`API işləyir → http://localhost:${PORT}`);
  console.log(`Userlər → http://localhost:${PORT}/users`);
});