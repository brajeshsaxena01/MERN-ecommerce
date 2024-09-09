const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: {
      type: Number,
      required: true,
      min: [0, "wrong min price"],
      max: [100000, "wrong max price"],
    },
    discountPercentage: {
      type: Number,
      required: true,
      min: [0, "wrong min discount"],
      max: [99, "wrong max discount"],
    },
    rating: {
      type: Number,
      required: true,
      min: [0, "wrong min rating"],
      max: [5, "wrong max rating"],
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: [0, "wrong min stock"],
      default: 0,
    },
    brand: { type: String },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: { type: [String], required: true },
    deleted: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// To return _id as id during getting all the products or during creating one
//start
const virtual = productSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

productSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
//end

const Product = mongoose.model("product", productSchema); //product => products

module.exports = Product;
