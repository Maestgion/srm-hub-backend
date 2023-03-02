const express = require("express");
const app = express();
require("../db/conn");
const PORT = process.env.PORT || 5000;

const authRoute = require("../router/auth");

app.use(express.json());

app.use("/api/v1/users", authRoute);

app.listen(PORT, () => {
  console.log("server up");
});
