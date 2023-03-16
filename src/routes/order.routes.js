import express from 'express';

import {
    createOrder,
    deleteOrder,
    getOrders,
    updateOrder,
} from '../controllers/order.controller';
import { verifyToken, authorize } from '../middleware/verifyToken';

const router = express.Router();

router.post('/', verifyToken, authorize(['Customer']), createOrder);
router.get('/', verifyToken, getOrders);
router.delete('/:id', verifyToken, authorize(['Customer']), deleteOrder);
router.put('/:id', verifyToken, authorize(['Customer']), updateOrder);

module.exports = router;
