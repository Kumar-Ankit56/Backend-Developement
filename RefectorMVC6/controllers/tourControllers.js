const Tour = require("../model/tourModel");

//Get All AllTour Router
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: "success",
      result: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

//Get singleTour Router
exports.getTour = async (req, res) => {
  try{
   const tour=await Tour.findById(req.params.id);
   res.status(200).json({
    status: "success",
    result: tour.length,
    data: {
      tours: tour,
    },
  });
  }catch(err){
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

//Update tour router with patch
exports.updateTour = async (req, res) => {
  try{
    const tour=await Tour.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators:true
    })
    res.status(200).json({
      status: "success",
      data: {
        tour
      },
    });

  }catch(err){
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }

  // console.log(req.params);
  // //This is simple helps us to convert the string in the number by multiplying with 1.
  // const id = req.params.id * 1;
  // //console.log(id);

  // const x = tour.find((el) => el.id === id);

  // if (id > tour.length) {
  //   return res.status(404).json({
  //     status: "fail",
  //     message: "Invalid ID",
  //   });
  // }
  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     tour: "<updating some data>",
  //   },
  // });
};

//DeleteTour Router
exports.deleteTour = async (req, res) => {
  try{
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "Success",
      data: null,
    });
  }catch(err){
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }

  // console.log(req.params);
  // //This is simple helps us to convert the string in the number by multiplying with 1.
  // const id = req.params.id * 1;
  // //console.log(id);

  // const x = tour.find((el) => el.id === id);

  // if (id > tour.length) {
  //   return res.status(404).json({
  //     status: "fail",
  //     message: "Invalid ID",
  //   });
  // }
  
};

//Create Tour router
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch {
    res.status(400).json({
      status: "failed",
      error: "ERror",
    });
  }
};
