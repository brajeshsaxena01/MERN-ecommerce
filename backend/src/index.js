const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const productsController = require("./controllers/product.controllers");
const brandsController = require("./controllers/brand.controllers");
const categoriesController = require("./controllers/category.controllers");
const rootRouter = require("./controllers/root.controllers");
const usersController = require("./controllers/user.controllers");
const cartController = require("./controllers/cart.controllers");
const ordersController = require("./controllers/order.controllers");
const stripeController = require("./controllers/stripe.controllers");
const app = express();
const dotenv = require("dotenv");
const authenticate = require("./middlewares/authenticate");
const authorise = require("./middlewares/authorise");
dotenv.config();
// console.log(process.env.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.use(express.static("public"));

// This is your test secret API key.

app.use("/api/root", authenticate, authorise(["admin"]), rootRouter);
app.use("/products", productsController);
app.use("/brands", authenticate, brandsController);
app.use("/categories", authenticate, categoriesController);
app.use("/users", usersController);
app.use("/cart", authenticate, cartController);
app.use("/orders", authenticate, ordersController);

app.use("/create-payment-intent", stripeController);

module.exports = app;
