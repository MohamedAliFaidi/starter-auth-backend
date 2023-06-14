const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({


  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
  },


  password: {
    type: String,
   required:true,
  },
});

const Post = mongoose.model("User", UserSchema);
module.exports = Post;
