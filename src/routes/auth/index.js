import express from 'express';
import authentication, { loginUser } from '../../controllers/authentication';

import validate from '../../middleware/authValidation';

const router = express.Router();
router.post('/create', validate.signUpValidator, authentication.createUser);
router.post('/login', validate.loginValidator, loginUser);
router.get('/verify_email/:token', authentication.emailVerification);
router.post('/forgotPassword', authentication.forgotPassword);
router.put('/resetPassword/:token', validate.resetPassValidator, authentication.resetPassword);
router.post('/otp', authentication.checkotp);
export default router;
