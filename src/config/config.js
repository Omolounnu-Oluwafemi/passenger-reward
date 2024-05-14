import { config } from 'dotenv';
import Sequelize from 'sequelize';

config();

const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const dialect = process.env.DB_DIALECT 

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
});

export default sequelize;