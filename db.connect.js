const mongoose = require("mongoose");
const URI =
  "mongodb+srv://mouhammedalifaidi:3259@cluster0.9tj6t4o.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
