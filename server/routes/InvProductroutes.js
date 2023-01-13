import express from "express";
import bodyParser from "body-parser";

const router = express.Router();

router.get("/invproduct", (req, res, next) => {
  res.json({ message: "This is product" });
});
router.get("/invproduct2", (req, res, next) => {
  res.json({ message: "This is product2" });
});

export default router;
