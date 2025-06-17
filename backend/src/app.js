import express from 'express';
import 'dotenv/config';
import userRouter from './routes/user.routes.js';
import routeRouter from './routes/route.routes.js';
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

app.use('/users', userRouter);
app.use('/routes', routeRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})