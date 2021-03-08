const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const SHA1 = require("crypto-js/sha1");

const userAuth = require("../middleware/userAuth.js");
const Blog = mongoose.model("blogs");

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("file");

module.exports = (app) => {
  app.post("/api/user/upload", userAuth, (req, res) => {
    let urlPath = path.join(__dirname, "../client/public")
    if (!req.files)
      return res.status(500).json({ success: false, err: "File not found" });
    const uploadFile = req.files.file;
    uploadFile.mv(`${urlPath}/${uploadFile.name}`, (err) => {
      if (err) return res.status(500).json({ success: false, err });
      return res
        .status(200)
        .json({ success: true, url: `${urlPath}/${uploadFile.name}` });
    });
  });
  
  app.post("/api/user/post", userAuth, (req, res) => {
    const post = new Blog({
      title: req.body.title,
      headline: req.body.headline,
      publish: req.body.publish,
      blog: req.body.blog,
      publishedDate: req.body.publishedDate,
    });
    post.save((err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });

  //display all post for admin
  app.get("/api/user/view", userAuth, (req, res) => {
    Blog.find({}, (err, post) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(post);
    });
  });

  //display only the published post
  app.get("/api/view", (req, res) => {
    Blog.find({ publish: true }, (err, post) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(post);
    });
  });

  //accept query params of title..3
  app.get("/api/post", (req, res) => {
    let id = req.query.id;
    const url = req.headers.referer;
    Blog.findOne({ _id: id }, (err, post) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({ success: true, post, url });
    });
  });

  app.post("/api/user/edit", userAuth, (req, res) => {
    let id = req.query.id;
    Blog.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true },
      (err, post) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({ success: true, post });
      }
    );
  });

  // app.post("/api/user/upload", userAuth, (req, res) => {
  //   upload(req, res, (err) => {
  //     if (!req.file) return res.json({ success: false, err });
  //     const dir = path.resolve(__dirname + "/../client/public/uploads/");
  //     fs.readdir(dir, (err, items) => {
  //       console.log(items);
  //       return res.status(200).send(items);
  //     });
  //   });
  // });

  app.get("/api/user/delete", userAuth, (req, res) => {
    let id = req.query.id;
    Blog.deleteOne({ _id: id }, (err, post) => {
      if (err) return res.json({ success: false, err });
      return res.status(200);
    });
  });

  app.post("/api/post_comment", (req, res) => {
    let id = req.query.id;
    const date = new Date();
    const commentId = `comment-${SHA1(req.body.commentDate)
      .toString()
      .substring(0, 5)}${date.getSeconds()}${date.getMilliseconds()}`;
    const comment = [];
    comment.push({
      comment: req.body.comment,
      commentName: req.body.commentName,
      commentDate: req.body.commentDate,
      commentId,
    });
    Blog.findOneAndUpdate(
      { _id: id },
      { $push: { comment }, $inc: { commentCount: 1 } },
      { new: true },
      (err, doc) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true, doc });
      }
    );
  });

  //the admin will delete post with /api/user/comment_delete/id/?commentDate
  app.get("/api/user/comment_delete", userAuth, (req, res) => {
    let _id = req.query.id;
    let id = req.query.id;
    Blog.update(
      {},
      { $pull: { comment: { commentId: id } }, $inc: { commentCount: -1 } },
      { multi: true }
    ).exec((err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({ success: true, doc });
    });
  });

  app.get("/api/like", (req, res) => {
    let title = req.query.title;
    Blog.findOneAndUpdate({ title }, { $inc: { like: 1 } }).exec(
      (err, likes) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true, likes });
      }
    );
  });

  app.get("/api/dislike", (req, res) => {
    let title = req.query.title;
    Blog.findOneAndUpdate({ title }, { $inc: { dislike: 1 } }).exec(
      (err, dislikes) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true, dislikes });
      }
    );
  });
};
