import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getAllPosts = (req, res) => {
  // get all posts
  // const q = "SELECT * FROM posts";

  // But we want to get the all posts related to specific catorgory

  const q = req.query.category
    ? "SELECT * FROM posts WHERE category =? "
    : "SELECT * FROM posts";
  db.query(q, [req.query.category], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};
export const getSinglePost = (req, res) => {
  const postId = req.params.id; // Use req.params.id to get the post ID

  const q =
    "SELECT p.id, username, title, `desc`, p.img, userimage, category, date FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?";

  db.query(q, [postId], (err, data) => {
    debugger;
    if (err) {
      console.error("Error fetching single post:", err);
      return res.status(500).json({ error: "Error fetching single post" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  // Add post
  // Add post
  const token = req.cookies.access_token;
  console.log("🚀 ~ addPost ~ token:", token);

  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts(`title`, `desc`,`img`,`uid`,`category`) VALUES (?)";
    console.log("🚀 ~ jwt.verify ~ q:", q);
    const values = [
      req.body.title,
      req.body.desc,
      // req.body.date,
      req.body.img,
      userInfo.id,
      req.body.category,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  console.log("🚀 ~ deletePost ~ token:", token);
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    console.log("🚀 ~ jwt.verify ~ postId:", postId);
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`category`=? WHERE `id` = ? AND `uid` = ?";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.category,
    ];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  });
};
