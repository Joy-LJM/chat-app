const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/auth");
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

//  You can then use a router for a particular root URL in this way separating your routes into files or even mini-apps.
// only requests to /api/auth/* will be sent to our "router"
app.use("/api/auth", userRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running at port http://localhost:8000");
});
