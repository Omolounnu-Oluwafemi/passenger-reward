import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';

const Reward = sequelize.define('Reward', {
  rewardId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    primaryKey: true,
    references: {
      model: 'Users', 
      key: 'userId'
    }
  },
  transactionId: {
    type: DataTypes.UUID,
    primaryKey: true,
    references: {
      model: 'Transactions', 
      key: 'transactionId'
    }
  },
  cashBack: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  milesPoints: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
}
);

export default Reward;