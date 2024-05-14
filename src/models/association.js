import Transaction from './transactions.js';
import Reward from './rewards.js';

Transaction.hasMany(Reward, {
  foreignKey: 'transactionId',
  as: 'rewards'
});

Reward.belongsTo(Transaction, {
  foreignKey: 'transactionId',
});