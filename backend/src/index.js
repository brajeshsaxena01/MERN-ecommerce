const express = require("express");
const cors = require("cors");
const productsController = require("./controllers/product.controllers");
const brandsController = require("./controllers/brand.controllers");
const categoriesController = require("./controllers/category.controllers");
const rootRouter = require("./controllers/root.controllers");
const usersController = require("./controllers/user.controllers");
const cartController = require("./controllers/cart.controllers");
const ordersController = require("./controllers/order.controllers");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/root", rootRouter);
app.use("/products", productsController);
app.use("/brands", brandsController);
app.use("/categories", categoriesController);
app.use("/users", usersController);
app.use("/cart", cartController);
app.use("/orders", ordersController);

module.exports = app;
