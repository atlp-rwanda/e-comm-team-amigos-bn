import express from 'express'
import {
    createUser,
    getUser,
    updateProfile,
    deleteUser,
} from '../../controllers/admin.user.controller'
import { verifyToken, authorize } from '../../middleware/verifyToken'
import validate from '../../middleware/authValidation'

const router = express.Router()

router.post(
    '/create',
    validate.signUpValidator,
    verifyToken,
    authorize(['admin']),
    createUser
)
router.get('/user/:id', verifyToken, authorize(['admin']), getUser)
router.put('/:id', verifyToken, authorize(['admin']), updateProfile)
router.delete('/delete/:id', verifyToken, authorize(['admin']), deleteUser)

export default router
