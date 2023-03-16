import express from 'express';
import auth from './auth';
import user from './user';
import product from './products/product';
import role from './roles';

const router = express.Router();

router.use('/user', auth);
router.use('/', role);
router.use('/user', user);
router.use('/product', product);

export default router;
