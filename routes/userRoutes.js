import express from 'express';
import { addItem, addUser, deleteItem, getUserStock } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup',addUser);
router.post('/:id/additem',addItem);
router.delete('/:id/deleteitem', deleteItem);
router.get('/:id/stock', getUserStock);

export default router;