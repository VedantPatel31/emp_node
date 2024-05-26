const express = require("express");
const mongoose = require("mongoose");
const EmpSchema = require("./model/EmpSchema");

const app = express();

const PORT = 3000;

app.use(express.json());

const empRoutes = require("./routes/EmpRoutes");
// app.use('/employees',empRoutes);
app.use('/file',empRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/cw1",{
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log("error : ",err);
})

app.listen(PORT , ()=>{
    console.log("Server started on port 3000");
})