const express = require(`express`);
const mongoose = require(`mongoose`);
const Item = require(`../model/ItemModel`);
const multer = require(`multer`);
const path = require(`path`);
const fs = require(`fs`);

// making new route
const router = express.Router();

// configuring multer
const storage = multer.diskStorage({
  destination: function (err, file, cb) {
    cb(null, "./uploads/images");
  },
  filename: function (err, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "." +
      path.extname(file.originalname).split(".")[1];
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage });

// making new routes here
// test route
router.get("/", (req, res) => {
  res.send("Hey there");
});

// posting data route
router.post("/post", upload.single("image"), async (req, res) => {
  try {
    console.log(req.body);
    req.body = JSON.parse(req.body.data);
    const { name, units, sellUnit } = req.body;

    // validating things
    if (!name || !units || !sellUnit || !req.file)
      return res
        .status(400)
        .json({ msg: "Fill All The Fields", errFlag: true });

    console.log(req.body);
    const item = await new Item({
      name,
      units,
      sellUnit,
      image: fs.readFileSync(req.file.path),
    });

    item.save((err, item) => {
      if (err)
        return res.json({ msg: "Item cannot be able to save", errFlag: true });
      console.log(item);
      res.json({ msg: "Item Saved", errFlag: false, item });
    });
  } catch (error) {
    console.log(error);
    res.json({ error, errFlag: true, msg: "Internal Server Error" });
  }
});

// getting data route
router.get("/data", async (req, res) => {
  try {
    const items = await Item.find();
    if (!items)
      return res
        .status(400)
        .json({ msg: "Some Error In Fetching Data Occured", errFlag: true });
    res.json({ items, errFlag: false });
  } catch (error) {
    console.log(error);
    res.json({ error, errFlag: true, msg: "Internal Server Error" });
  }
});

// for deleting the items
router.delete("/delete", async (req, res) => {
  try {
    console.log(req.body);
    const delItem = await Item.findByIdAndDelete(req.body._id);
    res.json({
      msg: "Item Deleted",
      errFlag: false,
    });
  } catch (error) {
    res.json({ error, errFlag: true, msg: "Internal Server Error" });
  }
});

// exporting router
module.exports = router;
