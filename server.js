const express = require("express");
const config = require("./lib/config");
const bodyParser = require("body-parser");
const path = require("path");
const indexRoutes = require("./routes/router");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

//* connect to db
connectDB();

// * body parser
app.use(bodyParser.urlencoded({ extended: true }));

//* view engine
app.set("view engine", "ejs");

//* asset
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));

//* routes

app.use(indexRoutes);

app.listen(config.port, () => {
  console.log(`server is ronning on port ${config.port} `);
});
