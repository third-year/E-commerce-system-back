const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
//const reviewRouter = require('./routes/reviewRoute');
const favoriteRouter = require("./routes/favoriteRoute");
const orderRouter = require("./routes/orderRoute");
const deliveryRouter = require("./routes/deliveryRoute");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
//app.use('/api/v1/review', reviewRouter);
app.use("/api/v1/favorite", favoriteRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/delivery", deliveryRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
