const mongoose = require("mongoose");
const Author = mongoose.model("authors");

module.exports = (req, res, next) => {
  let token = req.cookies.w_auth;
  Author.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true,
      });
    req.token = token;
    req.user = user;

    next();
  });
};
