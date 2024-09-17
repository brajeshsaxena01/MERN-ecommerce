const express = require("express");
const crudControllers = require("./crud.controllers");
const User = require("../models/user.models");
const { register, login, logout } = require("./auth.controllers");
const authenticate = require("../middlewares/authenticate");
const authorise = require("../middlewares/authorise");

const router = express.Router();

router.post("/signup", register);
router.post("/signin", login);
router.get("/logout", logout);

// router.post("/signup", crudControllers.post(User));
// router.post("/signin", async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) {
//       return res.status(401).send({ message: "Invalid credential" });
//     } else if (user.password == req.body.password) {
//       return res.status(200).send({
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         addresses: user.addresses,
//         role: user.role,
//         // isAdmin: user.isAdmin,
//         // token: generateToken(user),
//       });
//     } else {
//       return res.status(401).send({ message: "Invalid credential" });
//     }
//   } catch (error) {
//     return res.status(500).send({ message: error.message });
//   }
// });
router.get(
  "",
  authenticate,
  authorise(["admin"]),
  crudControllers.getAll(User)
);
// router.get("/:id", crudControllers.fetchById(User));
router.get("/check", authenticate, async (req, res) => {
  //   console.log(req.user);
  const { email, role, addresses, orders, id } = req.user;
  if (req.user) {
    return res.status(200).send({ email, role, addresses, orders, id });
  } else {
    return res.status(401).send({ message: "User credential not available!" });
  }
});
router.get("/:id", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "name email address id")
      //   .lean()// the lean is used convert the mongoose docs into json, but in model we already conveted to json during modification of _id as id, so only use exec to fulfill the promise and don't use lean it will conflict and return as _id

      .exec();
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.patch("/:id", authenticate, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      //   .lean()// the lean is used convert the mongoose docs into json, but in model we already conveted to json during modification of _id as id, so only use exec to fulfill the promise and don't use lean it will conflict and return as _id

      .exec();
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
