// require("dotenv").config({ path: "./config.env" });
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require('./middleware/error')

// Db Connect
connectDB();
const app = express();

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));

// Error Handler
app.use(errorHandler)


const PORT = process.env.PORT;

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);

// process.on("unhandleRejection", (err, promise) => {
//   console.log(`Logged Error:${err}`);
//   Server.close(() => process.exit(1));
// });
