const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const SHA1 = require("crypto-js/sha1");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

const userAuth = require("../middleware/userAuth.js");
const Blog = mongoose.model("blogs");

const s3 = new aws.S3();

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: "us-east-1",
});

const S3_BUCKET = process.env.S3_BUCKET;

module.exports = (app) => {
  app.post("/api/user/upload", userAuth, (req, res) => {
    // setup Multer to process the image and send it to the S3 bucket
    const upload = multer({
      storage: multerS3({
        acl: "public-read",
        s3,
        bucket: S3_BUCKET,
        key: function (req, file, cb) {
          cb(
            null,
            file.originalname.split(".")[0] + "-" + Date.now().toString()
          );
        },
      }),
    });

    upload.single("file")(req, res, (err) => {
      if (err) {
        return res.json({
          success: false,
          errors: {
            title: "Image Upload Error",
            detail: err.message,
            error: err,
          },
        });
      }
      return res.status(200).json({ success: true, url: req.file.location });
    });
  });

  app.get("/api/upload/:img", (req, res) => {
    const img = req.params.img;
    res.sendFile(path.join(__dirname, `../upload/${img}`));
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
    let page = req.query.page || 1;
    Blog.find({})
      .sort({ _id: -1 })
      .skip((page - 1) * 10)
      .limit(10)
      .exec((err, post) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, post });
      });
  });

  //display only all the published post
  app.get("/api/view", (req, res) => {
    let page = req.query.page || 1;
    Blog.find({ publish: true })
      .sort({ _id: -1 })
      .skip((page - 1) * 10)
      .limit(10)
      .exec((err, post) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, post });
      });
  });

  //display article based on comment
  app.get("/api/recent", (req, res) => {
    Blog.find({ publish: true, like: { $gt: 5 } })
      .sort({ _id: -1 })
      .limit(5)
      .exec((err, post) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, post });
      });
  });

  //accept query params of id
  app.get("/api/post", (req, res) => {
    let id = req.query.id;
    const url = `${req.headers.referer}/${id}`;
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

  app.get("/api/user/delete", userAuth, (req, res) => {
    let id = req.query.id;
    Blog.deleteOne({ _id: id }, (err, post) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({ success: true });
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
      (err, post) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true, post });
      }
    );
  });

  //the admin will delete post with /api/user/comment_delete?id=commentDate
  app.get("/api/user/comment_delete", userAuth, (req, res) => {
    let id = req.query.id;
    Blog.update(
      {},
      { $pull: { comment: { commentId: id } }, $inc: { commentCount: -1 } },
      { multi: true }
    ).exec((err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });

  app.get("/api/like", (req, res) => {
    let title = req.query.title;
    Blog.findOneAndUpdate({ title }, { $inc: { like: 1 } }, { new: true }).exec(
      (err, post) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true, post });
      }
    );
  });

  app.get("/api/dislike", (req, res) => {
    let title = req.query.title;

    Blog.findOneAndUpdate(
      { title },
      { $inc: { dislike: 1 } },
      { new: true }
    ).exec((err, post) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({ success: true, post });
    });
  });
};
