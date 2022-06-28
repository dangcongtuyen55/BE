require("dotenv").config();
const { connectDB } = require("./src/config/db");
connectDB();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// const cookieParser = require("cookie-parser");

const authRoute = require("./src/routes/authRoute");
const productRoute = require("./src/routes/productRoute");
const catagoryRoute = require("./src/routes/catagoryRoute");
const bannerRoute = require("./src/routes/bannerRoute");
const orderRoute = require("./src/routes/orderRoute");
const { errorHandler } = require("./src/app/middlewares/errorHandler");

const app = express();
app.use(morgan("combined"));
app.use(cors());

app.use(express.json());

// app.use(cookieParser());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/", productRoute);
app.use("/api/v1/", bannerRoute);
app.use("/api/v1/catagory", catagoryRoute);
app.use("/api/v1/", orderRoute);

app.all("*", (req, res, next) => {
  const err = new Error("The route can not be found !!!");
  err.statusCode = 404;
  next(err);
});
app.use(errorHandler);

const port = process.env.APP_PORT;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
