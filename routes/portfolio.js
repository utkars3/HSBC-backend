import express from 'express';
import {  getStockData } from '../controllers/portfolioController.js';

const router = express.Router();

// router.get('/allitems',allItems);
router.get('/getstock',getStockData);

export default router;  