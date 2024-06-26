import express from "express";
import { validateTransaction } from '../utils/middleware.js';
import { newTransaction, getTransactions, getOneTransaction } from '../controllers/transaction.js';

const router = express.Router();

router.post('/new/:userId', validateTransaction, newTransaction);
router.get('/:userId/all', getTransactions);
router.get('/one/:transactionId', getOneTransaction);

// Error handling middleware
router.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ error: err.message });
});

export default router;
