import User from '../models/users.js';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { generateToken } from '../utils/utils.js';
import { config } from "dotenv";

config();

export const signUp = async (req, res) => {  
  const { firstName, lastName, email, password } = req.body;
  
  try {
    // Check if a user with the provided username or email already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { email: email }
        ]
      }
    });

      if (existingUser) {
        return res.status(400).json({ 
          message: 'A user with this email already exists',
          });
      }
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

      return res.status(200).json({
        message: 'User created successfully',
         user: newUser
      })

  } catch (error) {
    console.log(error);
      return res.status(500).json({
        message: 'An error occurred while creating the user',
        error: error.message
      });
  }
}
export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user with the provided username
    const user = await User.findOne({
      where: {
        email: email
      }
    });

    if (!user) {
      return res.status(400).json({
        message: 'User not found'
      });
    }

    // Compare the provided password with the stored password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid password'
      });
    }
    const token = generateToken(user.userId);

    return res.cookie('jwt', token,{
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7
      })
      .status(200).json({
      message: 'Logged in successfully',
      user: user
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'An error occurred while logging in'
    });
  }
};