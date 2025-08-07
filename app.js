import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import portfolioRoutes from './routes/portfolio.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(express.json());

connectDB();


app.use(cors());
app.use('/api/portfolio',portfolioRoutes);
app.use('/api/users',userRoutes);

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

export default app;