import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";

const router = express.Router();

// LOGIN ROUTE
router.post("/login", loginController);

// REGISTER ROUTE
router.post("/register", registerController);

export default router;
