import { Router } from "express";
import {
  createUser,
  getUser,
  loginUser,
} from "../controllers/userController.js";

const router = Router();
router.get("/user/:id", getUser);
router.post("/register", createUser);
router.post("/login", loginUser);

export default router;
