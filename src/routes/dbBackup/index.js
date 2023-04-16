import express from "express";
import authentication from '../../controllers/authentication';
import { authorize, verifyToken } from "../../middleware/verifyToken";

const router = express.Router();

router.post("/backup", verifyToken, authorize(['Admin']), authentication.backupDatabase);

export default router;