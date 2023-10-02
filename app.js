//Require is some what like importing.
require("dotenv").config();

const express = require("express");
const app = express();
require("./db/connection");
const cors = require("cors");
const router = require("./routes/router");
const PORT = 5004;
//Maintain the above herirarchy

//The above cors we define we need to enable it.
//Backend and Frontend have different port so to
//communicate between them we need to enable cors
app.use(cors());

//Whatever data we are getting from the front end
//will be in the json format else we won't get any data.
app.use(express.json());

//Using routes as we create routes in different file.
app.use(router);

//Get reponse
// app.get("/", (req, res) => {
//   res.status(200).json("Server Started");
// });

//Start the server
app.listen(PORT, () => {
  console.log(`Server started at port number ${PORT}`);
});
