const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const travelLogs = require("./api/logs");
const middlewares = require("./middlewares/middlewares");

require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Successful");
  });

app.use(morgan("common"));
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.use("/api/travel-logs", travelLogs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
