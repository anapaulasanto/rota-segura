import express from 'express';
import 'dotenv/config';

const app = express();
const { port } = process.env

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
})