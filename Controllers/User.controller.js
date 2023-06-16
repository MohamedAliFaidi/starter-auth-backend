const User = require("../Models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

signup = async(req,res)=>{
  const {email,password}=req.body
  try {
      const found=await User.findOne({email})
      if (found){
          res.status(400).send({
              errors:[{msg:'user already exists'}]
          })
      } else{
          const utilisateur= new User(req.body)
          const salt = 10
          const hash = bcrypt.hashSync(password, salt)
          utilisateur.password = hash
          const payload = { id: utilisateur._id };
          const token = jwt.sign(payload, "hello");
          await utilisateur.save()

           res.status(200).cookie("Authorization",token,{
               path: '/',
               expires: new Date(new Date().getTime() + 86400 * 1000),
               httpOnly: false,
           }).send({msg:'new user is added',utilisateur,token})

          res.send("Cookie Set");
      }

  } catch (error) {
      res.status(500).send(error)
  }
} 

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send({ message: "user not found" });
    } else {
      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        res.status(401).send({ message: "please verify your credentials" });
      } else {
        const exp = Date.now() + 1000 * 60 * 60 * 7;

        const payload = {
          email,
          exp,
        };

        const Token = jwt.sign(payload, "ukdagfukyegfyGWEWTQ4784238472987432");
        res.cookie("Authorization", Token, {
          expires: new Date(exp),
          httpOnly: true,
        });
        res.status(200).send({
          user,
          Token,
        });
      }
    }
  } catch (error) {
    res.send({ error });
  }
}

function logout(req, res) {
  try {
    res.clearCookie("Authorization");
    res.status(200).send({ message: "Logged out" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error while logging out" });
  }
}

module.exports = {
  signup,
  login,
  logout,
};
