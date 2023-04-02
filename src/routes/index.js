import express from 'express';
import auth from './auth';
import role from './roles';
import user from './user';
import product from './products/product';
import chatRouter from './chat.route';
import wishlist from './wishlist';
import orderRoutes from './order.routes';
import review from './Review/review';
import users from './admin';
import newsletterRoutes from "./newsletter.routes";

const router = express.Router();

router.use('/user', auth);
router.use('/chat', chatRouter);
router.use('/user', user);
router.use('/product', product);
router.use('/wishlist', wishlist);
router.use('/', role);
router.use('/orders', orderRoutes);
router.use('/reviews', review);
router.use('/users', users);
router.use("/newsletter", newsletterRoutes);

export default router;
