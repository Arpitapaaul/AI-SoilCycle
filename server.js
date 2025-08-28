const express = require("express");
const cors = require("cors");
require("dotenv").config();
// const bodyParser = require("body-parser"); // bodyParser is deprecated, express.json() is preferred
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json()); // Use express's built-in body parser for JSON
app.use("/api/auth", require("./routes/authroutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
