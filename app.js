const db = require("./database");
const express = require("express");
const bodyParser = require("body-parser");
const pricingRoutes = require("./src/routes/pricingRoutes");
const errorHandler = require("./src/middlewares/errorHandling");

const app = express();

app.use(bodyParser.json());

app.use("/", pricingRoutes);
app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
