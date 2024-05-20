import { Router } from "express";
import { createqr, getqr } from "../controllers/qrController.js";

const router = Router();
router.post("/gen", createqr);
router.get("/:id", getqr);

export default router;
