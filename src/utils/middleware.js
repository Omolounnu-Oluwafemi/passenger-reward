import { signUp, transaction, Login } from "./validator.js";

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