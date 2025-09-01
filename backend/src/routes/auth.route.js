import { Router } from 'express'
import { isAuthenticated, login, logOut, register, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail } from '../controller/auth.controller.js';
import { userAuth } from '../middleware/user.auth.js';

const authRouter = Router();

authRouter.post('/signup', register)
authRouter.post('/signin', login)
authRouter.post('/signout', logOut)
router.post('/send-verify-otp', userAuth, sendVerifyOtp);
router.post('/verify-account', userAuth, verifyEmail);
router.post('/is-auth', userAuth, isAuthenticated);
router.post('/send-reset-otp', sendResetOtp);
router.post('/reset-password', resetPassword);

export default authRouter;