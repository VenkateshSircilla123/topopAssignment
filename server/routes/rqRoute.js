import { Router } from "express";
import { createqr, getqr } from "../controllers/qrController.js";

const router = Router();
router.post("/gen", createqr);
router.get("/user/:id", getqr);

export default router;
