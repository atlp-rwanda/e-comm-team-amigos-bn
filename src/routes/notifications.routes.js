import express from 'express';
import { saveFCMToken } from '../controllers/notifications.controller';
import { verifyToken } from '../middleware/verifyToken';

const router = express.Router();

router.post('/fcmtoken', verifyToken, saveFCMToken);

export default router;
