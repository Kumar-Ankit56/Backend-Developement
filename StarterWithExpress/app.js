const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json()); //this is middleware in express
const tour = JSON.parse(fs.readFileSync("./data/tour_sample.json"));

//Reading Api data using get method
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    result: tour.length,
    data: {
      tours: tour,
    },
  });
});

//Responding to parmeter url request
app.get("/api/v1/tours/:id", (req, res) => {
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
});

//Handling patch requests
app.patch("/api/v1/tours/:id", (req, res) => {
  console.log(req.params);
  //This is simple helps us to convert the string in the number by multiplying with 1.
  const id = req.params.id * 1;
  //console.log(id);

  const x = tour.find((el) => el.id === id);

  if(id>tour.length){
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      tour:'<updating some data>'
    },
  });
});


//Delete Route in the express
app.delete("/api/v1/tours/:id", (req, res) => {
  console.log(req.params);
  //This is simple helps us to convert the string in the number by multiplying with 1.
  const id = req.params.id * 1;
  //console.log(id);

  const x = tour.find((el) => el.id === id);

  if(id>tour.length){
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(204).json({
    status:'Success',
    data: null
  });
});


//Post method in express
app.post("/api/v1/tours", (req, res) => {
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
});

//Sending Get request to the server
app.get("/", (req, res) => {
  res.send("Hello from the server side");
});

//creating a sever that is listen to the port 3000
const port = 8000;
app.listen(port, () => {
  console.log(`App running on the port ${port}...`);
});
