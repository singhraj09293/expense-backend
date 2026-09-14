const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
    title: String,
    amount: Number,
    date: Date,
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;