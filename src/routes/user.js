import express from 'express';
import controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getUsers);
router.get('/:id', controllers.getUserById);
router.post('/create', controllers.createUser);

module.exports = router;
