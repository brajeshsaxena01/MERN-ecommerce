const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "user" },
    addresses: { type: [mongoose.Schema.Types.Mixed] },
    name: { type: String },
    orders: { type: [mongoose.Schema.Types.Mixed] },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// To return _id as id during getting all the products or during creating one
//start
const virtual = userSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

userSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
//end

const User = mongoose.model("user", userSchema);
module.exports = User;
