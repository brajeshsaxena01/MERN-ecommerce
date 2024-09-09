const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://mern-ecommerce:braj123saxena@cluster0.nsqm3.mongodb.net/mern-ecommerce?retryWrites=true&w=majority&appName=Cluster0"
  );
};

module.exports = connect;
