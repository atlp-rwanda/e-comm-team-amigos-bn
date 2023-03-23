import express from 'express';
import auth from './auth';
import user from './user';
import product from './products/product';
import role from './roles';

import chatRouter from "./chat.route";
const router = express.Router();

router.use('/user', auth);
router.use("/chat", chatRouter)
router.use('/', role);
router.use('/user', user);
router.use('/product', product);

export default router;
