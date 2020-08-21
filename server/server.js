const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

require("dotenv").config();
console.log(process.env.MONGO_URI);

const PORT = 4000;

const app = express();
app.use(helmet());
app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
