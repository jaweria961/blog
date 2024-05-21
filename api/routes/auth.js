import express from "express";
import { register, login, logout } from "../controller/authController.js";

const router = express.Router();

// POST request for registration
router.post("/register", register); // Change this line

// POST request for login
router.post("/login", login);

// GET request for logout
router.post("/logout", logout);

export default router;
