const jwt = require("jsonwebtoken");
const User = require("./Models/User")


function authenticated (req, res, next) {
    // Check if the user is authenticated
    
  
    // The user is authenticated, continue to the next middleware or route handler
    next();
  };


  module.exports = {
    authenticated

  }