const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

const authRoute = require("./routes/auth.js");
const projectRoute = require("./routes/project.js")

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connect succes mongoDB");
  } catch (error) {
    console.log(error);
  }
};

app.use(express.json());
app.use(cors());

app.use("/api", authRoute);
app.use("/project", projectRoute)


app.listen(port, () => {
  connect();
  console.log("listening port");
});
