import { Schema, model } from "mongoose";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "required"],
    },

    email: {
      type: String,
      required: [true, "required"],
    },

    phoneNumber: {
      type: String,
      required: [true, "Question ID is required"],
      min: [10, "Too Few. Invalid"],
      max: [10, "Too long. Invalid"],
    },

    Message: {
      type: String,
      required: [true, "required"],
    },

    Reply: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model("ContactUs", contactSchema, "ContactUs");
