
import express from 'express'
import auth from './auth'
import role from './roles'
import user from './user'
import product from './products/product'
import chatRouter from './chat.route'
import wishlist  from './wishlist';
import orderRoutes from './order.routes';

const router = express.Router()

router.use('/user', auth)
router.use('/chat', chatRouter)
router.use('/user', user)
router.use('/product', product)
router.use('/wishlist', wishlist)
router.use('/', role)
router.use('/orders', orderRoutes);
export default router
