const User = require("../Models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function signup(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      res.status(400).send({ message: "user already exist " });
    } else {
      const newUser = {
        email,
        password: bcrypt.hashSync(password, 10),
      };

      const exp = Date.now() + 1000 * 60 * 60 * 7;

      const payload = {
        email,
        exp,
      };

      const Token = jwt.sign(payload, "ukdagfukyegfyGWEWTQ4784238472987432");
      const data = await User.create(newUser);
      res.cookie("Authorization", Token, {
        expires: new Date(exp),
        httpOnly: true,
      });

      res.status(201).send({ data, Token });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
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
