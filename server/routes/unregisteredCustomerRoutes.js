import express from "express";
const router = express.Router();
import unrCus from "../models/UnregisteredCustomer.js";

router.route("/add").post((req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const additionalDetails = req.body.additionalDetails;

  const newUnregC = new unrCus({
    firstName,
    lastName,
    email,
    message,
    additionalDetails,
  });

  newUnregC
    .save()
    .then(() => {
      res.json("Unregistered customer added.");
    })
    .catch(() => {
      console.log(err);
    });
});

router.route("/").get((req, res) => {
  unrCus
    .find()
    .then((unRegCus) => {
      res.json(unRegCus);
    })
    .catch((err) => {
      console.log(err);
    });
});

//--------------------------------------------------------------------------------------------------------------------------------------

router.route("/update/:id").put(async (req, res) => {
  let unCusId = req.params.id;

  const { firstName, lastName, email, message, additionalDetails } = req.body;

  const updateUnCus = {
    firstName,
    lastName,
    email,
    message,
    additionalDetails,
  };

  const update = await unrCus
    .findByIdAndUpdate(unCusId, updateUnCus)
    .then(() => {
      res.status(200).send({ status: "Unregistered customer updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error with updating data." });
    });
});

//--------------------------------------------------------------------------------------------------------------------------------------

router.route("/delete/:id").delete(async (req, res) => {
  let unCusId = req.params.id;

  await unrCus
    .findByIdAndDelete(unCusId)
    .then(() => {
      res.status(200).send({ status: "Unregistered customer deleted." });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with deleting data", error: err.message });
    });
});

export default router;
