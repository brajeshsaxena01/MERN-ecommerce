const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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

userSchema.pre("save", function (next) {
  const hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  return next();
});

// we will use this checkPassword method during login time to compare the plaintext user password and hash password of the user in the database
userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

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
