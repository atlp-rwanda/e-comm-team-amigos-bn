import express from 'express';
import {
    createUser,
    getUser,
    updateProfile,
    deleteUser,
} from '../../controllers/admin.user.controller';
import { verifyToken, authorize } from '../../middleware/verifyToken';
import validate from '../../middleware/authValidation';

const router = express.Router();

router.post(
    '/create',
    validate.signUpValidator,
    verifyToken,
    authorize(['Admin']),
    createUser
);
router.get('/user/:id', verifyToken, authorize(['Admin']), getUser);
router.put('/:id', verifyToken, authorize(['Admin']), updateProfile);
router.delete('/delete/:id', verifyToken, authorize(['Admin']), deleteUser);

export default router;
