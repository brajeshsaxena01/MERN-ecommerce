const express = require("express");

const crudControllers = require("./crud.controllers");
const Brand = require("../models/brand.models");

const router = express.Router();

router.get("/", crudControllers.getAll(Brand));

router.post("", crudControllers.post(Brand));
module.exports = router;
