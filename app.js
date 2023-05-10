const express = require("express");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require('./routes/userRoute');
const productRouter = require('./routes/productRoute');


const app = express();

app.use(express.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', productRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
