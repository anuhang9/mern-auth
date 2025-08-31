import { Router } from 'express'
import { login, logOut, register } from '../controller/auth.controller.js';

const authRouter = Router();

authRouter.get('/signup', register)
authRouter.get('/signin', login)
authRouter.get('/signout', logOut)
// router.get('/', register)

export default authRouter;