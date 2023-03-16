import express from 'express'
import {
    getProfile,
    updateProfile,
    getUserProfile,
    getUsers,
} from '../../controllers/user'
import { authorize, verifyToken } from '../../middleware/verifyToken'
import { validateUserProfile } from '../../middleware/user'

const router = express.Router()
router.get('/all-users', getUsers)
router.get('/profile', verifyToken, getProfile)
router.patch('/updateMe', verifyToken, validateUserProfile, updateProfile)
router.get('/:userId', verifyToken, getUserProfile)

export default router
