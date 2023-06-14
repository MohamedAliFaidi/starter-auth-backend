const express = require("express");
const router = express.Router();
const { addPost,getAllPosts,updatePost } = require("../Controllers/Post.controller");


router.post("/new", addPost);
router.get("/all" ,getAllPosts);
router.put("/update/:id", updatePost);


module.exports = router;

