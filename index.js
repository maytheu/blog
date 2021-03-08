const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;
const upload = require("express-fileupload");
const path = require("path");

require("dotenv").config();

const app = express();

require("./model/userSchema.js");
require("./model/blogSchema.js");

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//to access the files in the public directory
express.static('public')

//fileupload middleware
app.use(
  upload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//check mongoose connection
console.log(mongoose.connection.readyState);

app.use(cookieParser());

//enable post request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//enable post request
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

require("./route/user.js")(app);
require("./route/blog.js")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
