// const fs = require("fs");
// const os = require("os");

// const user = os.userInfo();
// console.log(user);
// fs.appendFile("tempFile.txt", "this is file\n", () => {
//   console.log("file created");
// });

// // console.log(os);

const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoutes.js");
const menuRoutes = require("./routes/menuRoutes.js");

app.use(bodyParser.json()); //req.body

// routes
app.use("/user", userRoutes);
app.use("/menu", menuRoutes);

app.listen(3000, () => {
  console.log("server is listning on 3000");
});
