import express from 'express';
import auth from './auth';
import role from './roles';
import cart from './cart';

const router = express.Router();

router.use('/user', auth);
router.use('/', role);
router.use('/',cart);

export default router;
