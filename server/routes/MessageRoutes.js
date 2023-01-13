import express from "express";
import { addMessage, getMessages } from "../controller/MessageController.js";
const router = express.Router();

router.post("/message", addMessage);
router.get("/:chatId", getMessages);

export default router;
