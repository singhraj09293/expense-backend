require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const expressRoute = require("./routes/expense");
const userRoute = require("./routes/auth");
const app = express();
const port = 3000;

mongoose.connect(process.env.MONGO_URL).then(() => console.log("MongoDB connected")).catch((err) => console.log(err));
app.use(express.json());
app.use("/expense", expressRoute);
app.use("/auth", userRoute);
// app.get("/", (req, res) => {
//     // res.send("Hello from Expense server")
// res.json({
//     user: 'raj',
//     age: 20,
//     role: "Full stack flutter dev"
//     });
// });

app.listen(port, () => {
    console.log(`Successfully running on port ${port}`);
})