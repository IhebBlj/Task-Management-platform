const mongoose =require("mongoose") ;
const { Schema } = mongoose;

const assetSchema = new Schema({
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  data: { type: Buffer, required: true },
});

const taskSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, default: new Date() },
  priority: {
    type: String,
    default: "normal",
    enum: ["high", "medium", "normal", "low"],
  },
  stage: {
    type: String,
    default: "todo",
    enum: ["todo", "in progress", "completed"],
  },
  owner:{type: Schema.Types.ObjectId,ref:"user"},

  subTasks: [
    {
type:Schema.Types.ObjectId,ref:"Subtask"
    },
  ],
  assets: [assetSchema],
  team: [{ type: Schema.Types.ObjectId, ref: "User" }],
  isTrashed: { type: Boolean, default: false },
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

module.exports=Task;