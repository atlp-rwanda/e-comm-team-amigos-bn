import express from 'express';
import authentication, { loginUser } from '../../controllers/authentication';
import validate from '../../middleware/authValidation';
import { authorize, verifyToken } from '../../middleware/verifyToken';

const router = express.Router();
router.post('/create', validate.signUpValidator, authentication.createUser);
router.post('/login', validate.loginValidator, loginUser);
router.get('/verify_email/:token', authentication.emailVerification);
router.post('/forgotPassword', authentication.forgotPassword);
router.put(
  '/resetPassword/:token',
  validate.resetPassValidator,
  authentication.resetPassword
);
router.post('/otp', authentication.checkotp);

router.put('/updatePassword', verifyToken, authorize(['admin', 'vendor', 'normal']), authentication.updatePassword);

router.put('/disable', verifyToken, authorize(['admin']), authentication.disableUser, authentication.logout);

router.put('/enable', verifyToken, authorize(['admin']), authentication.enableUser);


export default router;
