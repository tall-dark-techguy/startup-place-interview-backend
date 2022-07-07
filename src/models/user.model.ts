import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },

  created_at: {
    type: Date,
    default: Date,
  },

  updated_at: Date,
});

export default model("User", UserSchema);
