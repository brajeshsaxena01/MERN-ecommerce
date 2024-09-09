const express = require("express");
const cors = require("cors");
const productsController = require("./controllers/product.controllers");
const brandsController = require("./controllers/brand.controllers");
const categoriesController = require("./controllers/category.controllers");
const rootRouter = require("./controllers/root.controllers");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/root", rootRouter);
app.use("/products", productsController);
app.use("/brands", brandsController);
app.use("/categories", categoriesController);

module.exports = app;
