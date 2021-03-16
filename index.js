const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

require("dotenv").config();

const app = express();

require("./model/userSchema.js");
require("./model/blogSchema.js");

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//check mongoose connection
console.log(mongoose.connection.readyState);

app.use(cookieParser());

//enable post request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("client/build"));

express.static("uploads");

//to serve img files
app.use(express.static("client"));

//enable post request
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

require("./route/user.js")(app);
require("./route/blog.js")(app);

// DEFAULT
if (process.env.NODE_ENV === "production") {
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
