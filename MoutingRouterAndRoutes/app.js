const express = require("express");
const fs = require("fs");
const { get } = require("http");
const morgan = require("morgan");

const app = express();

//this is middleware in express
app.use(express.json());

app.use((req, res, next) => {
  console.log("|HEllo from the middleware");
  next();
});

app.use(morgan("dev"));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//Json file reading code in sync manner
const tour = JSON.parse(fs.readFileSync("./data/tour_sample.json"));

//Get All User Router
const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    result: tour.length,
    data: {
      tours: tour,
    },
  });
};

//Get singleTour Router
const getTour = (req, res) => {
  console.log(req.requestTime);
  console.log(req.params);
  //This is simple helps us to convert the string in the number by multiplying with 1.
  const id = req.params.id * 1;
  //console.log(id);

  const x = tour.find((el) => el.id === id);

  //if(id>tour.length)
  if (!x) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      x,
    },
  });
};

//Update tour router with patch
const updateTour = (req, res) => {
  console.log(req.params);
  //This is simple helps us to convert the string in the number by multiplying with 1.
  const id = req.params.id * 1;
  //console.log(id);

  const x = tour.find((el) => el.id === id);

  if (id > tour.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      tour: "<updating some data>",
    },
  });
};

//DeleteTour Router
const deleteTour = (req, res) => {
  console.log(req.params);
  //This is simple helps us to convert the string in the number by multiplying with 1.
  const id = req.params.id * 1;
  //console.log(id);

  const x = tour.find((el) => el.id === id);

  if (id > tour.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(204).json({
    status: "Success",
    data: null,
  });
};

//Create Tour router
const createTour = (req, res) => {
  // req.body;
  const newId = tour[tour.length - 1].id + 1;

  const newTour = Object.assign({ id: newId }, req.body);
  tour.push(newTour);
  fs.writeFile("./data/tour_sample.json", JSON.stringify(tour), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  });
};

//RouteHandler for the user routerin the same manner
const getAllUser = (req, res) => {
  res.status(500).json({
    status: "Error",
    message: "Route is not defined",
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: "Error",
    message: "Route is not defined",
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: "Error",
    message: "Route is not defined",
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: "Error",
    message: "Route is not defined",
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "Error",
    message: "Route is not defined",
  });
};
/*
//Reading Api data using get method
app.get("/api/v1/tours", getAllUser);
//Responding to parmeter url request
app.get("/api/v1/tours/:id", getTour);
//Handling patch requests
app.patch("/api/v1/tours/:id", updateTour);
//Delete Route in the express
app.delete("/api/v1/tours/:id", deleteTour);
//Post method in express
app.post("/api/v1/tours", createTour);
*/

//We can do something like this as well

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route("/").get(getAllTours).post(createTour);
tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

app.use("/api/v1/tours", tourRouter);

//Creating UserRoute something like the create User
userRouter.route("/").get(getAllUser).post(createUser);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

app.use("/api/v1/users", tourRouter);
//Sending Get request to the server
app.get("/", (req, res) => {
  res.send("Hello from the server side");
});

//creating a sever that is listen to the port 3000
const port = 8000;
app.listen(port, () => {
  console.log(`App running on the port ${port}...`);
});
