const express = require("express");
const Product = require("../models/product.models");
const crudControllers = require("./crud.controllers");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // let query = await Product.find({}).lean().exec();
    let query = Product.find({});
    let totalProductsQuery = Product.find({});
    if (req.query.category) {
      query = query.find({ category: req.query.category });
      totalProductsQuery = totalProductsQuery.find({
        category: req.query.category,
      });
    }
    if (req.query.brand) {
      query = query.find({ brand: req.query.brand });
      totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
    }
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
      totalProductsQuery = totalProductsQuery.sort({
        [req.query._sort]: req.query._order,
      });
    }

    const totalProducts = await totalProductsQuery.countDocuments();

    if (req.query._page && req.query._limit) {
      const pageSize = req.query._limit || 10;
      const page = req.query._page || 1;

      query = query.skip((page - 1) * pageSize).limit(pageSize);
    }
    // const products = query;
    const products = await query.lean().exec();

    // Setting this headers to the response beacuse we use this totalProducts as totalCount in frontend
    // In product=> action.js
    res.set("X-Total-Count", totalProducts);

    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.post("/", crudControllers.post(Product));

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).send(product);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(200).send(product);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
