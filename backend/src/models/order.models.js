const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    items: { type: [mongoose.Schema.Types.Mixed], required: true }, //The items will be of type array having mixed data
    totalAmount: { type: Number },
    totalItems: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, //This is the "user" that you mention in the user model during mongoose.model(name,schema) in user model

    paymentMethod: { type: String, required: true },
    status: { type: String, default: "pending" },
    selectedAddress: { type: mongoose.Schema.Types.Mixed, required: true }, // The selectedAddress will be of type object having mixed data
  },
  { versionKey: false, timestamps: true }
);

// To return _id as id during getting all the products or during creating one
//start
const virtual = orderSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

orderSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
//end

const Order = mongoose.model("order", orderSchema);
module.exports = Order;
