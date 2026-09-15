const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    const harhsedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        username: req.body.username,
        password: harhsedPassword,
    });
    await user.save();
    res.json({ message: "register successfull" });
});
router.post("/login", async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    const isMatched = await bcrypt.compare(req.body.password, user.password);
    if (!isMatched) {
        return res.json({ message: "Invalid credentials" });
    }
    const token=jwt.sign({id:user._id},"secretkey");
    res.json({ message: "Login successfull",token});
})
module.exports = router;