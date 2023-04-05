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
import notificationRoutes from './notifications.routes';

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
router.use('/notifications', notificationRoutes);
router.get('/notifications', (req, res) => {
    res.render('index');
});
router.get('/firebase-messaging-sw.js', (req, res) =>
    res.sendFile(process.cwd() + '/public/firebase-messaging-sw.js')
);

export default router;
