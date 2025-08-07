import express from 'express';
import { addItem, deleteItem, getStockHistory, getUserStock } from '../controllers/userController.js';

const router = express.Router();

router.post('/:id/additem',addItem);
router.delete('/:id/deleteitem', deleteItem);
router.get('/:id/stock', getUserStock);
router.get('/stock/history', getStockHistory);

export default router;