import express from "express";
const router = express.Router();
import {
  FAQs_index,
  FAQs_details,
  FAQs_create,
  FAQs_update,
  FAQs_delete,
} from "../../controller/customerService.controllers/FAQs.js";

//http://localhost:8082/api/FAQs
router.get("/", FAQs_index);

//http://localhost:8082/api/FAQs
router.post("/", FAQs_create);

//http://localhost:8082/api/FAQs:id
router.get("/:id", FAQs_details);

//http://localhost:8082/api/FAQs:id
router.patch("/:id", FAQs_update);

//http://localhost:8082/api/FAQs:id
router.delete("/:id", FAQs_delete);

export default router;
