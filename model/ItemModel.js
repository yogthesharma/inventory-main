const mongoose = require(`mongoose`);

const itemSchema = new mongoose.Schema({
  name: String,
  units: Number,
  sellUnit: Number,
  image: Buffer,
});

const Item = mongoose.model(`Item`, itemSchema);

module.exports = Item;
