// instance of express and server created
const express = require("express");
const app = express();

// app.listen(3000,()=>{
//     console.log("App running successfully");
// })

// app.get("/",(req,res)=>{
//     res.send(`<h1>This is Home</h1>`)
// })

// env files configs loaded in process object and trying to find PORT from there
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// middleware - parse json from body
app.use(express.json());

const blog = require("./routes/blog");
// mount - addition /api/v1 and routes
app.use("/api/v1", blog);

const connectWithDb = require("./config/database");
connectWithDb();

// activate the server
app.listen(PORT, () => {
  console.log(`App started at ${PORT}`);
});

app.get("/",(req,res)=>{
    res.send(`<h1>This is Home</h1>`)
})