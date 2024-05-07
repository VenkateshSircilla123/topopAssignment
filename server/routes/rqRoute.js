import { Router } from "express";
import { createqr } from "../controllers/qrController.js";

const router = Router();
router.post("/gen", createqr);

export default router;
