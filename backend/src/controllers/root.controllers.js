const express = require("express");

const data = require("../data");
const Brand = require("../models/brand.models");
const Category = require("../models/category.models");
const Product = require("../models/product.models");

const router = express.Router();
router.get("", async (req, res) => {
  try {
    await Product.deleteMany({});
    const createdProducts = await Product.insertMany(data.products);
    await Brand.deleteMany({});
    const createdBrands = await Brand.insertMany(data.brands);
    await Category.deleteMany({});
    const createdCategories = await Category.insertMany(data.categories);
    return res
      .status(201)
      .send({ createdBrands, createdCategories, createdProducts });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
