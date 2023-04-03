import { Router } from 'express';
import checkoutController from '../controllers/checkout.controller';
import { verifyToken, authorize } from '../middleware/verifyToken';

const checkoutRouter = Router();
checkoutRouter.post('/', verifyToken, authorize(['Customer']), checkoutController.checkout);

export default checkoutRouter;