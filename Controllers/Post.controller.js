const Post = require("../Models/Post");
const mongoose = require("mongoose");

addPost = async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const getAllPosts = async (req, res)=> {
  try {
    const posts = await Post.find();
     res.status(200).send(posts);
  } catch (error) {
     console.log(error)
     
  }
};

updatePost = async (req, res) => {
    
  try {
    const updated = await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
    });

    res.status(200).json(updated);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  addPost,
  getAllPosts,
    updatePost,
};
