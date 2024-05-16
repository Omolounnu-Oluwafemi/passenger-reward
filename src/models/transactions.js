import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';

const Transaction = sequelize.define('Transaction', {
  transactionId: {
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
  distanceTravelled: {
    type: DataTypes.FLOAT,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('distanceTravelled');
      return parseFloat(rawValue.toFixed(2));
    }
  },
  tripAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('tripAmount');
      return parseFloat(rawValue.toFixed(2));
    }
  },
  totalBalance: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('totalBalance');
      return parseFloat(rawValue.toFixed(2));
    }
  },
});

export default Transaction;