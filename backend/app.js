const express = require("express");
const errorMiddleware = require("./middleware/error");
const { authMiddleware, authorizeMiddlware } = require("./middleware/auth");
var cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoutes");
const cart = require("./routes/cartRoute")
const stripe = require("./routes/stripeRoutes")
app.use(errorMiddleware);

app.use("/api/v4", product);
app.use("/api/v2", user);
app.use("/api/v3", order);
app.use("/api/v5" , cart)
app.use("/api/v6" , stripe)

module.exports = app;
