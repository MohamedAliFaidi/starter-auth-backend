const jwt = require("jsonwebtoken");
const User = require("./Models/User");

//authorization="Eqweqweqweqweqweqweqwe"

async function authenticated(req, res, next) {
  try {
    const Token = req.headers.cookie?.split("=")[1];
    const verified= jwt.verify(Token, "ukdagfukyegfyGWEWTQ4784238472987432")
    const user = await User.findOne({ email: verified.email });
    if (!Token)
    {
      res.status(401).send({ message: "unauthorized" });
      
    } 
    else {
     
    console.log(verified," right here")
     if (!verified){
      res.status(401).send({ message: "unauthorized" });
     }

    else if (Date.now() > verified.exp) {
      res.status(401).send({ message: "token expired" });
    } else if (!user) {
      res.status(401).send({ message: "unknown user" });
    }
  }
  } catch (error) {
res.status(401).send({message:"unauthorized"})  }
  next();
}

module.exports = {
  authenticated,
};
