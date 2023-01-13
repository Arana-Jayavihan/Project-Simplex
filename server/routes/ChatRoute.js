import express from "express";
import {
  createChat,
  findChat,
  userChats,
} from "../controller/ChatController.js";

const router = express.Router();

router.post("/chat", createChat);
router.get("/:userId", userChats);
router.get("/find/:firstId/:secondId", findChat);
export default router;
