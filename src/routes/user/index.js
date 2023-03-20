import express from 'express';
import {
  getProfile,
  updateProfile,
  getUserProfile,
} from '../../controllers/user';
import { verifyToken }from '../../middleware/verifyToken';
import { validateUserProfile } from '../../middleware/user';

const router = express.Router();
router.get('/profile', verifyToken, getProfile);
router.patch('/updateMe', verifyToken, validateUserProfile, updateProfile);
router.get('/:userId', verifyToken, getUserProfile);

export default router;
