const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/thought_canvas", {
  useNewUrlParser: true,
});

const blogSchema = new mongoose.Schema({
  // _id:String,
  blog_title: String,
  blog_content: String,
});

const new_blog = mongoose.model("blog", blogSchema);

app.get("/", (req, res) => {
  if (!req.body) {
    console.log(req.body);
  } else {
    new_blog
      .find()
      .exec()
      .then((doc) => {
        res.render("home", { blogPosts: doc });
      });
  }
});

app.get("/posts/:postName", (req, res) => {
  console.log(req.params.postName);
  new_blog
    .findOne({ blog_title: req.params.postName })
    .exec()
    .then((doc) => {
      if (!doc) {
        console.log(doc);
        console.log("document is not found!");
      } else {
        res.render("post", {
          _title: doc.blog_title,
          _blogContent: doc.blog_content,
        });
        console.log("Sucess!")
        return;
      }
    });
});

app.get("/about", (req, res) => {
  if (!req.body) {
    console.log(req.body);
  } else {
    res.render("about");
  }
});

app.get("/contact", (req, res) => {
  if (!req.body) {
    console.log(req.body);
  } else {
    res.render("contact");
  }
});

app.get("/compose", (req, res) => {
  if (!req.body) {
    console.log(req.body);
  } else {
    res.render("compose");
  }
});

app.post("/compose", (req, res) => {
  const blog1 = new new_blog({
    blog_title: req.body.blogTitle,
    blog_content: req.body.blogContent,
  });

  blog1.save();
  console.log("blog saved to database successfully!");
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  new_blog
    .deleteOne({ blog_title: req.body.delete })
    .exec()
    .then((doc) => {
      if (!req.body.delete) {
        console.log(req.body.delete);
      } else {
        console.log("blog deletion successfull!");
        res.redirect("/");
      }
    });
});

app.listen(3000, (err) => {
  if (err) throw err;
  else console.log("Server is running on port 3000!!");
});
