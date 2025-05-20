import express from 'express';
import 'dotenv/config';
import UserRoutes from './domains/user/routes.js';

const app = express();
const { port } = process.env

app.use(express.json());
app.use('/users', UserRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})