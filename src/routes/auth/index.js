import express from 'express';
import authentication, { loginUser } from '../../controllers/authentication';
import validate from '../../middleware/authValidation';

const router = express.Router();
router.post('/create', validate.signUpValidator, authentication.createUser);
router.post('/login', validate.loginValidator, loginUser);
router.get('/verify_email/:token', authentication.emailVerification);
router.get('/check', validate.authorize(['admin', 'vendor', 'normal']), (req, res) => {
  res.status(200).json({
    message: 'You are authorized',
  });
});

export default router;
// , validate.authorize(['admin', 'vendor', 'normal'])
