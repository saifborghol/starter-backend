const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const appError = require("./middlewares/appError");
const filesError = require("./middlewares/filesError");
const routes = require("./routes");

const app = express();

app.use(morgan("dev"));
app.use(helmet());

app.use(
  cors({
    origin: [`${process.env.APP_URL}`, "http://localhost:4000"],
  })
);

app.use(fileUpload());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.get("/", (req, res) => {
  res.json({
    message: "fetsh.co API",
  });
});

const seeders = require("./helpers/seeders");

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    /* eslint-disable no-console */
    console.log("MongoDB is connected");
    seeders.initialDB();
  })
  .catch((err) => {
    /* eslint-disable no-console */
    console.log(err);
  });

app.use("/api/v1", filesError.fileValidation, routes);

app.use(appError.notFound);
app.use(appError.errorHandler);

module.exports = app;
