const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const PORT = 4000;

const app = express();
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

const auth = require("./routes/auth");

app.use("/api/auth", auth); //prefix the auth routes with /api/auth

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

//Getting the port in use error
process.once("SIGUSR2", () => {
  server.close(() => {
    process.kill(process.pid, "SIGUSR2");
  });
});
