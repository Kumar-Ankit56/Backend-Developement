require("dotenv").config();
const mongoose=require('mongoose');


const app = require("./app");

//console.log(process.env);
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(con=>{
    console.log(con.connections);
    console.log("Successull");
})

//creating a sever that is listen to the port 3000
//const port = 8000;
app.listen(process.env.PORT, () => {
  console.log(`App running on the port ${process.env.PORT}...`);
});
