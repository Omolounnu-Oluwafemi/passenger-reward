import { signUp } from "./validator";

export function validateSignUp(req, res,) {
  const { error } = signUp.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }
  next();
}
export function validateLogin(req, res,) {
  const { error } = login.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }
  next();
}