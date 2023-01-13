import express from "express";
const router = express.Router();
import {
  Contact_index,
  Contact_details,
  Contact_create,
  Contact_delete,
} from "../../controller/contactUs.controller/contactUs.js";

router.get("/", Contact_index);

router.post("/", Contact_create);

router.get("/:id", Contact_details);

router.get("/:id", Contact_delete);

export default router;
