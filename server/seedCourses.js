const mongoose = require("mongoose");
require("dotenv").config();
const Course = require("./models/Course");

const courses = [
  {
    title: "React Basics",
    description: "Learn fundamentals of React.",
    price: 0,
  },
  {
    title: "Advanced React",
    description: "Hooks, Context, and performance optimization.",
    price: 499,
  },
  {
    title: "Node.js Essentials",
    description: "Backend development with Node and Express.",
    price: 299,
  },
  {
    title: "MongoDB Mastery",
    description: "Learn MongoDB from scratch.",
    price: 0,
  },
  {
    title: "Full Stack Bootcamp",
    description: "Frontend + Backend + Deployment.",
    price: 999,
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await Course.deleteMany();
    await Course.insertMany(courses);
    console.log("Courses seeded successfully");
    process.exit();
  })
  .catch((err) => console.log(err));
