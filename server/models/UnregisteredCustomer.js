import mongoose from "mongoose";

const Schema = mongoose.Schema;

const unregCusSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  additionalDetails: {
    type: String,
    required: true,
  },
});

const unregCustomer = mongoose.model("Unregistered Customers", unregCusSchema);

export default unregCustomer;
