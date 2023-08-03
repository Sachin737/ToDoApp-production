import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    deadline: {
      type: Object,
      default: new Date("2100-01-01T12:00"),
    },
    user_id: {
      type: mongoose.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const taskModel = mongoose.model("task", taskSchema);
export default taskModel;
