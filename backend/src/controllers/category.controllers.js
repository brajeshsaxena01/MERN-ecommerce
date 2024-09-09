const express = require("express");
const crudControllers = require("./crud.controllers");
const Category = require("../models/category.models");

const router = express.Router();

router.get("/", crudControllers.getAll(Category));
router.post("", crudControllers.post(Category));

module.exports = router;
