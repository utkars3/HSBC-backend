import express from 'express';
import { allItems } from '../controllers/portfolioController.js';

const router = express.Router();

router.get('/allitems',allItems);

export default router;  