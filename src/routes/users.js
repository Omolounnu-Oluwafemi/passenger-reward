import { Router } from 'express';
import { validateSignUp, validateLogin } from '../utils/middleware.js';
import { signUp, signIn } from '../controllers/users.js';

const router = Router();

router.post('/signup', validateSignUp, signUp)
router.post('/signin', validateLogin, signIn)

export default router;
