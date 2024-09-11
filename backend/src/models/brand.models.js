const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, unique: true },
    value: { type: String, required: true, unique: true },
    //   checked: { type: Boolean, required: true, default: false },
  },
  {
    versionKey: false,
    timeseries: true,
  }
);

// To return _id as id during getting all the products or during creating one
//start

// const virtual = brandSchema.virtual("id");
// virtual.get(function () {
//   return this._id;
// });

// brandSchema.set("toJSON", {
//   virtuals: true,
//   transform: function (doc, ret) {
//     delete ret._id;
//   },
// });

//end

const Brand = mongoose.model("brand", brandSchema);
module.exports = Brand;
