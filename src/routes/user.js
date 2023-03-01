import express  from "express";
import controllers from "../controllers";
const router = express.Router();

router.get('/users/all', controllers.getUsers);
router.get('/users/:id', controllers.getUserById);
router.post('/create/user', controllers.createUser);

module.exports = router;