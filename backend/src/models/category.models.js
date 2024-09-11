const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    label: { type: String, required: true, unique: true },
    value: { type: String, required: true, unique: true },
    // checked: { type: Boolean, required: true, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// To return _id as id during getting all the products or during creating one
//start

// const virtual = categorySchema.virtual("id");
// virtual.get(function () {
//   return this._id;
// });

// categorySchema.set("toJSON", {
//   virtuals: true,
//   transform: function (doc, ret) {
//     delete ret._id;
//   },
// });

//end

const Category = mongoose.model("category", categorySchema);
module.exports = Category;
