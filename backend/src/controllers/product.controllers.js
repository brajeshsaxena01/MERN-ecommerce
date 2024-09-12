const express = require("express");
const Product = require("../models/product.models");
const crudControllers = require("./crud.controllers");
const authenticate = require("../middlewares/authenticate");
const authorise = require("../middlewares/authorise");

const router = express.Router();

router.get("/", async (req, res) => {
  // Imp line otherwise if somoeone get the token they can create a product using postman
  // req.body.user_id=req.user.id // it should be in post req
  try {
    // let query = await Product.find({}).lean().exec();
    let query = null;
    let totalProductsQuery = null;
    if (req.query.admin) {
      query = Product.find({});
      totalProductsQuery = Product.find({});
    } else {
      query = Product.find({ deleted: { $ne: true } });
      totalProductsQuery = Product.find({ deleted: { $ne: true } });
    }
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
    // const products = await query.lean().exec();// the lean is used convert the mongoose docs into json, but in model we already conveted to json during modification of _id as id, so only use exec to fulfill the promise and don't use lean it will conflict and return as _id

    const products = await query.exec();

    // Setting this headers to the response beacuse we use this totalProducts as totalCount in frontend
    // In product=> action.js
    res.set("X-Total-Count", totalProducts);

    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.post(
  "/",
  authenticate,
  authorise(["admin", "seller"]),
  crudControllers.post(Product)
);

router.get(
  "/:id",
  crudControllers.fetchById(Product)
  //   async (req, res) => {
  //   try {
  //     const product = await Product.findById(req.params.id);
  //     return res.status(200).send(product);
  //   } catch (error) {
  //     return res.status(500).send({ message: error.message });
  //   }
  // }
);
router.patch(
  "/:id",
  authenticate,
  authorise(["admin", "seller"]),
  async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        // .lean() // the lean is used convert the mongoose docs into json, but in model we already conveted to json during modification of _id as id, so only use exec to fulfill the promise and don't use lean it will conflict and return as _id

        .exec();

      return res.status(200).send(product);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
);

module.exports = router;
