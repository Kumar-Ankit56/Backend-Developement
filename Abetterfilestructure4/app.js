const express = require("express");
const morgan = require("morgan");
const app = express();
const tourRouter=require('./Routes/tourRouter');
const userRouter=require('./Routes/userRouter');

//this is middleware in express
app.use(express.json());

app.use((req, res, next) => {
  console.log("|HEllo from the middleware");
  next();
});
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV==='development'){
  app.use(morgan("dev"));
}


app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//We can do something like this as well
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);


//Sending Get request to the server
app.get("/", (req, res) => {
  res.send("Hello from the server side");
});



module.exports=app;