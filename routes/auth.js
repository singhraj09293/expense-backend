const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    const harhsedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: harhsedPassword,
    });
    await user.save();
    res.json({ message: "register successfull" });
});
router.post("/login", async (req, res) => {
    console.log(req.body);
    const user = await User.findOne({
        $or: [{ username: req.body.username }, { email: req.body.email }]
    });
    console.log('user:', user);
    if (!user) {
        return res.json({ message: "User not found" });
    }
    const isMatched = await bcrypt.compare(req.body.password, user.password);
    if (!isMatched) {
        return res.json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, "secretkey");

    res.json({ message: "Login successful", token, username: user.username, email: user.email, name: user.name });
});

module.exports = router;