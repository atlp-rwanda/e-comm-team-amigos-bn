import express from 'express';
import authentication, { loginUser } from '../../controllers/authentication';
import validate from "../../middleware/authValidation";
import {verifyToken} from "../../middleware/verifyToken";


const router = express.Router();
router.post('/create', validate.signUpValidator, authentication.createUser);
router.post('/login', validate.loginValidator, loginUser);
router.get('/verify_email/:token', authentication.emailVerification);
router.post('/forgotPassword', authentication.forgotPassword);
router.put('/resetPassword/:token', validate.resetPassValidator, authentication.resetPassword);
router.post('/otp', authentication.checkotp);
router.patch("/updatePassword",verifyToken, authentication.updatePassword)
export default router;
