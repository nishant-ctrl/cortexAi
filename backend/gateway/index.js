import express from 'express';
import dotenv from 'dotenv';
import proxy from 'express-http-proxy';
dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello, Gateway!' });
});
app.use("/auth",proxy(process.env.AUTH_SERVICE))


app.listen(PORT, () => {
  console.log(`Gateway is running on port ${PORT}`);
});