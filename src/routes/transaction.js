import { Router } from 'express';
import { validateTransaction } from '../utils/middleware.js';
import { newTransaction, getTransactions, getOneTransaction } from '../controllers/transaction.js';

const router = Router();

router.post('/new/:userId', validateTransaction, newTransaction);
router.get('/all', getTransactions);
router.get('/one/:transactionId', getOneTransaction);

export default router;
