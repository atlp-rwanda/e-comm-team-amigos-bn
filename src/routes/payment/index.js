import express from 'express';
import { payment } from '../../controllers/payment.controller';
import { verifyToken } from '../../middleware/verifyToken';

const router = express.Router();

router.post('/payment', verifyToken, payment);

export default router;