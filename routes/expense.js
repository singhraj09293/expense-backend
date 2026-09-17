const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
    const expense = await Expense.find();
    res.json({ expense });
});

router.delete("/:id", auth, async (req, res) => {
    const id = req.params.id;
    await Expense.findByIdAndDelete(id);
    res.json({ message: "schema deleted" });
});

router.put("/:id", auth, async (req, res) => {
    const id = req.params.id;
    const updated = await Expense.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);

});

router.post("/", auth, async (req, res) => {
    const expense = new Expense(req.body);
    await expense.save();
    res.json({ message: "Expense Saved" });
});


module.exports = router;