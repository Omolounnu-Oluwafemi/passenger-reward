import express from 'express';
import Transaction from '../models/transactions.js';
import User from '../models/users.js';
import Reward from '../models/rewards.js';

const router = express.Router();
export const newTransaction = async (req, res) => {
  const { userId } = req.params;
  const { distanceTravelled, tripAmount } = req.body;

  const cashBackRate = 0.005;
  const milesPointsRate = 0.005;

  try {
    const user = await User.findOne({
      where: { userId: userId }
    });

    if (!user) {
      return res.status(404).json({
        status: 400,
        message: 'User not found'
      });
    }
    // Fetch all transactions for the user
    const userTransactions = await Transaction.findAll({
      where: { userId: userId }
    });

  // Calculate the total balance up to the current transaction
  const totalBalance = userTransactions.reduce((sum, transaction) => sum + transaction.tripAmount, 0) + Number(tripAmount); 

    // Create a new transaction
    const newTransaction = await Transaction.create({
      userId,
      distanceTravelled,
      tripAmount,
      totalBalance 
    });

    // Calculate cash back and miles points
    const cashBack = tripAmount * cashBackRate;
    const milesPoints = distanceTravelled * milesPointsRate;
    // Create a new reward
    const newReward = await Reward.create({
      userId,
      transactionId: newTransaction.transactionId,
      cashBack,
      milesPoints
    });
    return res.status(201).json({
      status: 201,
      message: 'Transaction and reward created successfully',
      transaction: newTransaction,
      reward: newReward
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 500,
      message: 'An error occurred while creating the transaction and reward'
    });
  }
};
export const getTransactions = async (req, res) => {
  try {
    const userId = req.params.userId; 

    const transactions = await Transaction.findAll({
      where: { userId: userId }, 
      include: [{
        model: Reward,
        as: 'rewards'
      }]
    });

    if (transactions.length === 0) {
      return res.status(200).json({
        status: 200,
        message: 'No transactions found for this user yet. You should navigate to the new Trip page to get claiming your rewards',
      });
    }

    // Calculate total cashback and miles points across all transactions
    let totalCashBack = 0;
    let totalMilesPoints = 0;
    let totalDistanceTravelled = 0;

    transactions.forEach(transaction => {

      totalDistanceTravelled += transaction.distanceTravelled;

      transaction.rewards.forEach(reward => {
        totalCashBack += reward.cashBack;
        totalMilesPoints += reward.milesPoints;
      });
    });

    return res.status(200).json({
      status: 200,
      message: 'Transactions retrieved successfully',
      transactions: transactions,
      totalCashBack,
      totalMilesPoints,
      totalDistanceTravelled
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 500,
      message: 'An error occurred while retrieving the transactions'
    });
  }
}; 
export const getOneTransaction = async (req, res) => { 
    const { transactionId } = req.params;
    
    try {
        const transaction = await Transaction.findOne({
        where: { transactionId },
        include: [{
            model: Reward,
            as: 'rewards'
        }]
        });
    
        if (!transaction) {
          return res.status(404).json({
          status: 404,
          message: 'Transaction not found'
        });
        }
    
        return res.status(200).json({
          status: 200,
          message: 'Transaction retrieved successfully',
          transaction
        });
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        status: 500,
        message: 'An error occurred while retrieving the transaction'
        });
    }
}

export default router;