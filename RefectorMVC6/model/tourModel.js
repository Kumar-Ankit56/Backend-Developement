const mongoose = require("mongoose");

//creating a tour schema to derived model and document from it
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "A Tour must have a name"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: Number,
});

//Creating model code from the above Schema

const Tour = mongoose.model("Tour", tourSchema);

// //Here creating document from the tour model and testtour is the instance of the Tour
// const testTour = new Tour({
//   name: "The new Walker 9",
//   rating: 4.7,
//   price: 478,
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log("Error :", err);
//   });


module.exports=Tour;