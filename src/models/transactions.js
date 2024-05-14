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
  },
  tripAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  totalBalance: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    allowNull: false,
  },
},
);

export default Transaction;