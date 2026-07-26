const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api", authRoutes);

app.get("/", (req, res) => {
    res.send("ECM Lite Backend Running");
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});