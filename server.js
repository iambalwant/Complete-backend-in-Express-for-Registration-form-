const express = require("express");
const errorHandler = require("./middleWare/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require('dotenv').config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;
app.use(express.json()) //use to parse the data with middleware
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`server connected to ${port} ..ohh shit fuck`);
})