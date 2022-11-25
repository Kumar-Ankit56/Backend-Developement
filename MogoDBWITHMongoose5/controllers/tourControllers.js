const fs = require("fs");

//Json file reading code in sync manner
const tour = JSON.parse(fs.readFileSync("./data/tour_sample.json"));

exports.checkId = (req, res, next, val) => {
  console.log(`Tour is id is ${val}`);
  if (req.params.id * 1 > tour.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "missing name and price",
    });
  }
  next();
};

//Get All User Router
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    result: tour.length,
    data: {
      tours: tour,
    },
  });
};

//Get singleTour Router
exports.getTour = (req, res) => {
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
exports.updateTour = (req, res) => {
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
exports.deleteTour = (req, res) => {
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
exports.createTour = (req, res) => {
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
