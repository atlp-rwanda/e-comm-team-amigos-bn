import express from 'express';

import {
    createOrder,
    deleteOrder,
    getOrders,
    updateOrder,
    getOrderStatus,
    updateOrderStatus,
} from '../controllers/order.controller';
import { verifyToken, authorize } from '../middleware/verifyToken';

const router = express.Router();

router.post('/', verifyToken, authorize(['Customer']), createOrder);
router.get('/', verifyToken, getOrders);
router.delete('/:id', verifyToken, authorize(['Customer']), deleteOrder);
router.put('/:id', verifyToken, authorize(['Customer']), updateOrder);

// Import the order controller

// Retrieve order status information
router.get(
    '/orderStatus/:orderId',
    verifyToken,
    authorize(['Customer']),
    getOrderStatus
);

// Update order status
router.put(
    '/orderStatus/:orderId',
    verifyToken,
    authorize(['Admin']),
    updateOrderStatus
);

module.exports = router;
