import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello, Gateway!' });
});

app.listen(PORT, () => {
  console.log(`Gateway is running on port ${PORT}`);
});