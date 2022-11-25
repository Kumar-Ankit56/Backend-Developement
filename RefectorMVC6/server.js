const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");

//console.log(process.env);
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true
  })
  .then((con) => {
    //console.log(con.connections);
    console.log("Successull");
  });



//const port = 8000;
app.listen(process.env.PORT, () => {
  console.log(`App running on the port ${process.env.PORT}...`);
});
