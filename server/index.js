const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const documentRoutes = require("./routes/documentRoutes");

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173"
    })
);

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/documents", documentRoutes);

app.get("/", (req, res) => {
    res.send("ECM Lite Backend Running");
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});