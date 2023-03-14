import express from 'express';
import auth from './auth';
import role from './roles';

const router = express.Router();

router.use('/user', auth);
router.use('/', role);

export default router;
