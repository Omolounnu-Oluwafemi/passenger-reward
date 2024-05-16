import express from 'express';
import { join } from 'path';
import { config } from "dotenv";
import createError from 'http-errors';
import sequelize from './src/config/config.js';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { static as expressStatic } from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import './src/models/transactions.js';
import './src/models/rewards.js';
import './src/models/association.js';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import transactionRouter from './src/routes/transaction.js';
import usersRouter from './src/routes/users.js';

const app = express();

sequelize
.sync()
.then(()=>{
  console.log("database synced sucessfully");
})
.catch((err)=>{
  console.log(err)
})

config();
// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({
  origin: ['https://passenger-reward-clientside.vercel.app', 'http://localhost:5000'],
}));
app.use(cookieParser());
app.use(express.json());
app.use(logger('dev'));
app.use(expressStatic(join(__dirname, 'public')));

app.use('/api/users', usersRouter);
app.use('/api/transactions', transactionRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
