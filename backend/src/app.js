import express from 'express';
import 'dotenv/config';
import UserRoutes from './domains/user/routes.js';
import Routes from './domains/route/routes.js';
import cors from 'cors';
import cookieParser from "cookie-parser"

const app = express();
const { port } = process.env

app.use(cors({
  origin: 'http://localhost:5173', //especifica o domínio do frontend
  credentials: true
}));
app.use(cookieParser())
app.use(express.json());

app.use('/users', UserRoutes);
app.use('/routes', Routes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})