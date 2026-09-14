require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Expense = require("./models/Expense");
const app = express();
const port = 3000;

mongoose.connect(process.env.MONGO_URL).then(() => console.log("MongoDB connected")).catch((err) => console.log(err));
app.use(express.json());
// app.get("/", (req, res) => {
//     // res.send("Hello from Expense server")
// res.json({
//     user: 'raj',
//     age: 20,
//     role: "Full stack flutter dev"
//     });
// });
app.get("/expense", async (req, res) => {
    const expense = await Expense.find();
    res.json({ expense });
});

app.delete("/expense/:id", async (req, res) => {
    const id = req.params.id;
    await Expense.findByIdAndDelete(id);
    res.json({ message: "schema deleted" });
});

app.put("/expense/:id", async (req, res) => {
    const id = req.params.id;
    const updated = await Expense.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);

});

app.post("/expense", async (req, res) => {
    const expense = new Expense(req.body);
    await expense.save();
    res.json({ message: "Expense Saved" });
})

app.listen(port, () => {
    console.log(`Successfully running on port ${port}`);
})