import express from 'express';
import authentication, { loginUser } from '../../controllers/authentication';
import validate from '../../middleware/authValidation';
import { checkExpiredPassword } from '../../middleware/checkExpiredPassword';
import { authorize, verifyToken } from '../../middleware/verifyToken';

const router = express.Router();
router.post('/create', validate.signUpValidator, authentication.createUser);
router.post('/login', validate.loginValidator, checkExpiredPassword, loginUser);
router.get('/logout', verifyToken, authentication.logout);
router.get('/verify_email/:token', authentication.emailVerification);
router.post('/forgotPassword', authentication.forgotPassword);
router.put(
    '/resetPassword/:token',
    validate.resetPassValidator,
    authentication.resetPassword
);
router.post('/otp', authentication.checkotp);

router.put('/updatePassword', verifyToken, authentication.updatePassword);
router.put('/createPassword', authentication.createPassword);
router.put(
    '/disable',
    verifyToken,
    authorize(['Admin']),
    authentication.disableUser,
    authentication.logout
);

router.put(
    '/enable',
    verifyToken,
    authorize(['Admin']),
    authentication.enableUser
);

export default router;
