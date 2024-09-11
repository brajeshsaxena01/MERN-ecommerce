const express = require("express");
const Cart = require("../models/cart.model");
const crudControllers = require("./crud.controllers");

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const { user } = req.query;
    const userId = user;
    const cartItems = await Cart.find({ user: userId })
      .populate("user") //the "user" is that you mention in the schema as a key not as ref
      .populate("product") //the "product" is that you mention in the schema as a key not as ref
      //   .lean() // the lean is used convert the mongoose docs into json, but in model we already conveted to json during modification of _id as id, so only use exec to fulfill the promise and don't use lean it will conflict and return as _id
      .exec();

    return res.status(200).send(cartItems);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.post("", async (req, res) => {
  //   console.log(req.body);
  try {
    const cartItem = await Cart.create(req.body);
    const populatedCartItem = await cartItem.populate("product");
    return res.status(201).send(populatedCartItem);
  } catch (error) {
    console.log("message", error.message);
    return res.status(500).send({ message: error.message });
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const item = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    // console.log(item);
    const populatedItem = await item.populate("product");
    // console.log(populatedItem);
    return res.status(200).send(populatedItem);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const item = await Cart.findByIdAndDelete(req.params.id).exec();
    return res.status(200).send(item);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
