const User = require("../models/User.js");
const router = require("express").Router();
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const { username, password, name, image } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      username: username.replace(/\s/g, "").toLowerCase(),
      password: hashedPassword,
      image,
    });

    await newUser.save();
    res.status(200).json("A new user created successfully.");
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).send({ error: "User not found!" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      res.status(403).json("Invalid password!");
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/get-all-user", async (req, res) => {
  try {
    const users = await User.find(req.query);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
