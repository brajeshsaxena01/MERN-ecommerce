require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        return reject(err);
      }
      return resolve(decoded);
    });
  });
};

const authenticate = async (req, res, next) => {
  //   if (!req.headers.authorization) {
  //     return res
  //       .status(400)
  //       .send({ message: "Authorization token not found or incorrect!" });
  //   }
  //   if (!req.headers.authorization.startsWith("Bearer ")) {
  //     return res
  //       .status(400)
  //       .send({ message: "Authorization token not found or incorrect!" });
  //   }
  //   const token = req.headers.authorization.trim().split(" ")[1];

  // the above code is for if you sen toke in headers and below is taken from cookie
  const token = req.cookies.jwt;
  let decoded;
  try {
    decoded = await verifyToken(token);
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .send({ message: "Authorization token not found or incorrect!" });
  }
  //   console.log("decoded", decoded);
  //   req.useId= decoded.user._id
  // as we converte _id to id
  req.user = decoded.user;
  return next();
};

module.exports = authenticate;
