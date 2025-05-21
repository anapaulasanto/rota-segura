import express from 'express';
import 'dotenv/config';
import UserRoutes from './domains/user/routes.js';
import cors from 'cors';

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
const { port } = process.env

app.use(express.json());
app.use('/users', UserRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})