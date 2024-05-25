const mongoose =require("mongoose") ;
const { Schema } = mongoose;
const subTaskSchema=new Schema(    {
    title: String,
    description: String,
    date: Date,
    stage: {
      type: String,
      enum: ["TODO", "IN PROGRESS", "COMPLETED"],
    },
    priority: {
      type: String,
      enum: ["HIGH", "MEDIUM", "LOW"],
    },
    assigned:[ { type: Schema.Types.ObjectId, ref: "User" }], // Subset of team for this subtask
  }, { timestamps: true }
)
const Subtask = mongoose.model("Subtask", subTaskSchema);

module.exports= Subtask;