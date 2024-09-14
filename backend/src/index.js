const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

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

//the build file is the build of frontend by using npm run build command
app.use(express.static(path.join(__dirname, "../build")));
// console.log(path.resolve(__dirname, "../build"));

// This is your test secret API key.

app.use("/api/root", authenticate, authorise(["admin"]), rootRouter);
app.use("/api/products", productsController);
app.use("/api/brands", authenticate, brandsController);
app.use("/api/categories", authenticate, categoriesController);
app.use("/api/users", usersController);
app.use("/api/cart", authenticate, cartController);
app.use("/api/orders", authenticate, ordersController);

app.use("/api/create-payment-intent", stripeController);

// This line we add to make react router work in case o other routes doesn't work.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

module.exports = app;
