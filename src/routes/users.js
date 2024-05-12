import { Router } from 'express';
import { validateSignUp } from '../utils/middleware';
import { signUp, signIn } from '../controllers/users';


const router = Router();

router.post('/signup', validateSignUp, signUp)

router.post('/signin', validateLogin, signIn)

export default router;
