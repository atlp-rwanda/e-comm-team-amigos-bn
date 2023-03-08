import express from 'express';
import controllers from '../controllers';
import { verifyToken } from '../middleware/verifyToken';

const router = express.Router();

router.get('/all', controllers.getUsers);
router.get('/:id', controllers.getUserById);
router.post('/create', verifyToken, controllers.createUser);

export default router;
