import 'dotenv/config';
import express from 'express';
import productsRouter from './routes/products.routes.js';
import authRoter from './routes/auth.routes.js';
import cors from 'cors';
import { initDB } from './db/schema.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/auth', authRoter);

initDB();

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
