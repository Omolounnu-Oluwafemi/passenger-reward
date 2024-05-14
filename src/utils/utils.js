import jwt from 'jsonwebtoken';
import { config } from "dotenv";

config();

const jwtsecret = process.env.JWT_SECRET;
export const generateToken = (userId) => {
   return jwt.sign({ id: userId }, jwtsecret, {
     expiresIn: '1h'
   });
};

export const checkInternetConnection = () => {
  return new Promise((resolve, reject) => {
    dns.resolve('www.google.com', (err) => {
      if (err) {
        reject(new Error('No internet connection'));
      } else {
        resolve();
      }
    });
  });
};