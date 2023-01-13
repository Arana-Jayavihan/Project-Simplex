import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        message: "User already registerd!",
      });

    const { firstName, lastName, email, password } = req.body;
    const hash_pass = await bcrypt.hash(password, 10);

    const _user = new User({
      firstName,
      lastName,
      email,
      hashPass: hash_pass,
      username: Math.random().toString(),
    });
    _user.save((error, userData) => {
      if (error) {
        return res.status(400).json({
          message: "Something Went Wrong!!!",
        });
      }
      if (userData) {
        return res.status(201).json({
          message: "User Registration Success",
        });
      }
    });
    if (error)
      return res.status(400).json({ message: "Something Went Wrong!!!" });
  });
};

const signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) {
      return res.status(400).json({ Error: "User Not Found!!!" });
    }
    if (user) {
      if (user.authenticate(req.body.password) && user.role === "user") {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );
        const { _id, firstName, lastName, email, role, fullName } = user;

        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
    } else {
      return res.status(400).json({ messege: "Something Went Wrong!!!" });
    }
  });
};

export { signin, signup };
