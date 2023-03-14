import express from "express";
import userRoles from "../../controllers/userRoles";

const router = express.Router();
router.get("/users", userRoles.allUsers);
router.post("/:id", userRoles.setRole);

export default router;
