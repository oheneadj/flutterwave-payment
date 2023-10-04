const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
app.use("/transfer", require("./routes"));

app.use(cors());

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
