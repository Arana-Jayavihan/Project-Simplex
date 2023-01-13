import { Schema, model } from "mongoose";

const FAQSchema = new Schema({
  Qid: {
    type: String,
    required: [true, "Question ID is required"],
    min: [8, "Too Few. Not valid Question ID "],
    max: [8, "Too long. Not valid Question ID"],
  },

  Question: {
    type: String,
    required: [true, "required"],
  },

  Answer: {
    type: String,
    required: [true, "required"],
  },
});

export default model("FAQs", FAQSchema, "FAQs");
