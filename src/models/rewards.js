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
      model: 'Transactions', 
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
    get() {
      const rawValue = this.getDataValue('cashBack');
      return parseFloat(rawValue.toFixed(2));
    }
  },
  milesPoints: {
    type: DataTypes.FLOAT,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('milesPoints');
      return parseFloat(rawValue.toFixed(2));
    }
  }
});

export default Reward;