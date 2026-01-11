require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");

const app = express();

const PORT = process.env.PORT || 5006;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/courses", courseRoutes);
app.use("/", subscriptionRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // console.log("JWT_SECRET:", process.env.JWT_SECRET);
});
