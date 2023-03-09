import express from "express";
import authentication from "../../controllers/authentication";
import validate from "../../middleware/authValidation";
const router = express.Router();
router.post("/create", validate.signUpValidator, authentication.createUser);

export default router;
