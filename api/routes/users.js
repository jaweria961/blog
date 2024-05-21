import express from "express";
import { adduser } from "../controller/usersController.js";

const router = express.Router();

router.get("/user", adduser);

export default router;
