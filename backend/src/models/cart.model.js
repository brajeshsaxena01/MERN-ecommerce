const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    quantity: { type: Number, required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product", //This is the "product" that you mention in the product model during mongoose.model(name,schema) in product model
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", //This is the "user" that you mention in the user model during mongoose.model(name,schema) in user model
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// To return _id as id during getting all the products or during creating one
//start
const virtual = cartSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

cartSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
//end

const Cart = mongoose.model("cart", cartSchema); //product => products

module.exports = Cart;
