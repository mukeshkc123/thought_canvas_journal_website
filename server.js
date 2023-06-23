const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

let blogPosts = [];

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home",{"blogPosts":blogPosts});
});

app.get("/posts/:postName",(req,res)=>{
    for(let i=0; i<blogPosts.length; i++){
        if(_.lowerCase(req.params.postName)===_.lowerCase(blogPosts[i].title)){
            res.render("post",{"_title":blogPosts[i].title,"_blogContent":blogPosts[i].newBlogContent});
            return;
        }
    }
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
    
  var blogObject = {
    "title": req.body.blogTitle,
    "newBlogContent": req.body.blogContent,
  };

  blogPosts.push(blogObject);

  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000!!");
});
