const express = require("express");
const app = express();
const path = require("path");

const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    content: "Cats are playful and curious companions.",
    username: "kittylover",
    followers: 25000,
    following: 5,
    upload: [
      {
        image:
          "https://plus.unsplash.com/premium_photo-1677545182067-26ac518ef64f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        likes: 200,
        comments: 17,
      },
    ],
  },
  {
    id: uuidv4(),
    content: "Whiskers twitch when cats are excited.",
    username: "whiskerqueen",
    followers: 18000,
    following: 8,
    upload: [
      {
        image:
          "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        likes: 312,
        comments: 19,
      },
    ],
  },
  {
    id: uuidv4(),
    content: "Dogs are loyal and protective friends.",
    username: "dogfanatic",
    followers: 75000,
    following: 150,
    upload: [
      {
        image:
          "https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        likes: 3000,
        comments: 41,
      },
    ],
  },
  {
    id: uuidv4(),
    content: "Puppies bring joy with their playful energy.",
    username: "puplover",
    followers: 68000,
    following: 120,
    upload: [
      {
        image:
          "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        likes: 2500,
        comments: 32,
      },
    ],
  },
  {
    id: uuidv4(),
    content: "Dogs love outdoor adventures with their humans.",
    username: "barkbuddy",
    followers: 54000,
    following: 90,
    upload: [
      {
        image:
          "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        likes: 500,
        comments: 6,
      },
    ],
  },
];

// show all posts
app.get("/posts", (req, res) => {
  //   console.log(posts);
  //   console.log(posts[0].upload[0].image);
  res.render("index.ejs", { posts });
});
// create posts
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});
app.post("/posts", (req, res) => {
  let { username, content, image } = req.body;
  let id = uuidv4();
  // default values
  let likes = 0;
  let comments = 0;
  let followers = 0;
  let following = 0;
  posts.push({
    id,
    username,
    content,
    followers,
    following,
    upload: [{ image, likes, comments }],
  });
  console.log(id, username, content, followers, following);
  res.redirect("/posts");
});
// detail posts
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  //   console.log(id);

  //   console.log(post);
  res.render("show.ejs", { post });
});
// update patch
app.put("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  let newContent = req.body.content;
  post.content = newContent;
  console.log(post.content);
  res.redirect("/posts");
});
// edit page
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  console.log(post);
  res.render("edit.ejs", { post });
});
// delete post
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);

  res.redirect("/posts");
});

app.listen(3000, (req, res) => {
  console.log("port listning on the 3000!");
});
