import { Router } from "express";
import {
  register,
  verifyEmail,
  login
} from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";
import {
  registerSchema,
  loginSchema
} from "../schemas/commonSchema.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.get("/verify", verifyEmail);
router.post("/login", validate(loginSchema), login);

export default router;