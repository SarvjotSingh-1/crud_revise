const express = require("express");

const router = express.Router();
const user = require("../models/user");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newUser = new user(data);

    //   //   // niche wale tarike se krne me bht bada aur time lg rha h isis liye uppr  const newUser = new user(data); ke ander data pass kr diya
    //   //   // newUser.name = data.name;
    //   //   // newUser.age = data.age;
    //   //   // newUser.work = data.work;
    //   //   // newUser.mobile = data.mobile;
    //   //   // newUser.email = data.email;
    //   //   // newUser.address = data.address;
    //   //   // newUser.salary = data.salary;

    const saveUser = await newUser.save();
    console.log("data saved");
    res.status(200).json(saveUser);
  } catch (error) {
    console.log(`${error} Internal server err`);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await user.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(`${error} Internal server err`);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:work", async (req, res) => {
  try {
    const worktype = req.params.work;
    if (worktype == "shef" || worktype == "waiter" || worktype == "manager") {
      const respose = await user.find({ work: worktype });
      res.status(200).json(respose);
    }
  } catch (error) {
    console.log(`${error} Internal server err`);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userid = req.params.id;
    const updatedUserData = req.body;

    const respose = await user.findByIdAndUpdate(userid, updatedUserData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUserData) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("Data Updated");
    res.status(200).json(respose);
  } catch (error) {
    console.log(`${error} Internal server err`);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userid = req.params.id;
    const respose = await user.findByIdAndDelete(userid);
    console.log("Data Deleted");
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(`${error} Internal server err`);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
