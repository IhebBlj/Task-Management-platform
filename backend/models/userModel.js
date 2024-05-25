const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const {Schema} = mongoose;
const userSchema = mongoose.Schema(
  {
    first_name:{ type: "String", required: true },
    last_name:{ type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    title: { type: String, required: true },

    pic: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    team:[{type: Schema.Types.ObjectId,ref:"User"}]
,tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
requests:[{type : Schema.Types.ObjectId, ref: "Request"}],
notifications:[{type : Schema.Types.ObjectId, ref: "Notice"}],
events:[{type : Schema.Types.ObjectId,ref: "Event"}]

  },


 
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
