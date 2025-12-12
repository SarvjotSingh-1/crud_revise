const express = require("express");

const router = express.Router();

const menu = require("../models/menu.js");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new menu(data);
    const saveMenuItem = await newMenu.save();
    console.log("menu item saved");
    res.status(200).json(saveMenuItem);
  } catch (error) {
    console.log(`${error} Internal server err`);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await menu.find();
    console.log("Menu data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(`${error} Internal server err`);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/taste/:taste", async (req, res) => {
  try {
    const tasteType = req.params.taste;
    if (
      tasteType == "sweet" ||
      tasteType == "spicy" ||
      tasteType == "bitter" ||
      tasteType == "sour" ||
      tasteType == "salty"
    ) {
      const response = await menu.find({ taste: tasteType });
      res.status(200).json(response);
    }
  } catch (error) {
    console.log(`${error} Internal server err`);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const menuid = req.params.id;
    const menuDataUpdate = req.body;
    const response = await menu.findByIdAndUpdate(menuid, menuDataUpdate, {
      new: true,
      runValidators: true,
    });
    if (!menuDataUpdate) {
      return res.status(404).json({ error: "Menu not found" });
    }
    console.log("Data Updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(`${error} Internal server err`);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const menuid = req.params.id;
    const response = await menu.findByIdAndDelete(menuid);
    console.log("Data Deleted");
    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {}
});
module.exports = router;
