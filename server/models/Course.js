const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number, // 0 = Free
  image: String,
});

module.exports = mongoose.model("Course", courseSchema);
