const { get } = require("http");
const express = require("express");
const tourController = require("../controllers/tourControllers");

const tourRouter = express.Router();


tourRouter
  .route("/")
  .get(tourController.getAllTours)
  //multiple chaining of middleware it amazing
  .post(tourController.createTour);
tourRouter
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = tourRouter;
