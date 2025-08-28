const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser"); // bodyParser is deprecated, express.json() is preferred
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // Use express's built-in body parser for JSON
app.use("/api/auth", require("../routes/authRoutes"));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
