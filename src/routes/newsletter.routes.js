import express from "express";
import { validateSuscriberExistence, validateAddSubscriber } from "../validations/newsletter.validator";
import { deleteSubcriberByAdmin, getSubscriberByAdminByEmail, getSubscribersByAdmin, subscribe, unsubscribe, unsubscribeByAdmin, verifySubscriber } from "../controllers/newsletter.controller";
import { authorize, verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.delete("/admin", validateSuscriberExistence, verifyToken, authorize(["admin"]), deleteSubcriberByAdmin);
router.post("/admin", validateSuscriberExistence, verifyToken, authorize(["admin"]), unsubscribeByAdmin);
router.get("/admin", verifyToken, authorize(["admin"]), getSubscribersByAdmin);
router.get("/admin/:email", verifyToken, authorize(["admin"]), getSubscriberByAdminByEmail);

router.get("/unsubscribe", validateSuscriberExistence, unsubscribe);
router.post("/", validateAddSubscriber, subscribe);
router.get("/verify", validateSuscriberExistence, verifySubscriber);



export default router;