require("dotenv").config();

const { resolve } = require("path");

const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");

const parcelMiddleware = require("./middleware/parcel");

const apiRouter = require("./api");

const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));

// api router
app.use("/api", apiRouter);

if (process.env.NODE_ENV === "development") {
  parcelMiddleware(app);
} else if (process.env.NODE_ENV === "production") {
  app.use(express.static("dist"));
}

app.get("*", (req, res) => {
  res.sendFile(resolve(__dirname, "..", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(400).json(err);
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
