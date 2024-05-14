import { signUp, transaction, Login } from "./validator.js";
import jwt from 'jsonwebtoken';
import { config } from "dotenv";

config();

export const authenticate = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: 'Authentication failed'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(decoded)
    next();

  } catch (err) {
    console.log(err);
    return res.status(401).json({
      status: 401,
      message: 'Your session has expired. Please signin again to continu'
    });
  }
};
export function validateSignUp(req, res, next) {
  const { error } = signUp.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }
  next();
}
export function validateLogin(req, res, next) {
  const { error } = Login.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }
  next();
}
export function validateTransaction(req, res, next) {
  const { error } = transaction.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }
  next();
}