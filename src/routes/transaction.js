import express from "express";
import { authenticate, validateTransaction } from '../utils/middleware.js';
import { newTransaction, getTransactions, getOneTransaction } from '../controllers/transaction.js';

const router = express.Router();

router.use(authenticate);
router.post('/new/:userId', validateTransaction, newTransaction);
router.get('/all', getTransactions);
router.get('/one/:transactionId', getOneTransaction);

// Error handling middleware
router.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ error: err.message });
});

export default router;
