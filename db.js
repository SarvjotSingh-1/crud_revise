const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/hotels";

mongoose
  .connect(url)
  .then(() => {
    console.log("connection sucessfull");
  })
  .catch((err) => {
    console.log(`error in connection ${err}`);
  });

const db = mongoose.connection;

module.exports = db;
