import { Schema, model } from "mongoose";
import { randomUUID } from "crypto";

const chatSchema = new Schema({
  id: {
    type: String,
    default: randomUUID(),
  },
  role: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
});

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  chats: [chatSchema],
});

const userModel = model("User", userSchema);
export default userModel;
