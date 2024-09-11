const express = require("express");
const Order = require("../models/order.models");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // let query = await Product.find({}).lean().exec();
    let query = Order.find({ deleted: { $ne: true } });
    let totalOrderQuery = Order.find({ deleted: { $ne: true } });
    // if (req.query.category) {
    //   query = query.find({ category: req.query.category });
    //   totalOrderQuery = totalOrderQuery.find({
    //     category: req.query.category,
    //   });
    // }
    // if (req.query.brand) {
    //   query = query.find({ brand: req.query.brand });
    //   totalOrderQuery = totalOrderQuery.find({ brand: req.query.brand });
    // }
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
      totalOrderQuery = totalOrderQuery.sort({
        [req.query._sort]: req.query._order,
      });
    }

    const totalOrders = await totalOrderQuery.countDocuments();

    if (req.query._page && req.query._limit) {
      const pageSize = req.query._limit || 10;
      const page = req.query._page || 1;

      query = query.skip((page - 1) * pageSize).limit(pageSize);
    }
    // const products = query;
    // const products = await query.lean().exec();// the lean is used convert the mongoose docs into json, but in model we already conveted to json during modification of _id as id, so only use exec to fulfill the promise and don't use lean it will conflict and return as _id

    const orders = await query.exec();

    // Setting this headers to the response beacuse we use this totalProducts as totalCount in frontend
    // In product=> action.js
    res.set("X-Total-Count", totalOrders);

    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const order = await Order.find({ user: userId })
      //   .populate("user") //the "user" is that you mention in the schema as a key not as ref
      //   .lean() // the lean is used convert the mongoose docs into json, but in model we already conveted to json during modification of _id as id, so only use exec to fulfill the promise and don't use lean it will conflict and return as _id
      .exec();

    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.post("", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    return res.status(201).send(order);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    // console.log(order);
    const populatedOrder = await order.populate("user");
    // console.log(populatedItem);
    return res.status(200).send(populatedOrder);
  } catch (error) {
    //   console.log(error);
    return res.status(500).send({ message: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id).exec();
    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
