import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../errorMiddlware.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "../config/config.env" });

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    const user = await newUser.save();
    res.status(200).json({ success: true, msg: "user has been created!", user });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    // console.log(user);
    if (!user) return next(createError(401, "Wrong credentials!"));

    const isAuthenticated = await bcrypt.compare(req.body.password, user.password);

    if (!isAuthenticated) return next(createError(401, "Wrong credentials!"));

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const { password, ...responseDetailes } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(responseDetailes);
  } catch (err) {
    next(err);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      // const { password, ...responseDetailes } = user._doc;

      console.log({user, _doc: user._doc})
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
      // .json(responseDetailes);
    } else {
      req.body.username = req.body.name;
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      console.log({body: req.body});
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
      // console.log({savedUser, _doc: savedUser._doc})
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    console.log(err)
    next(err);
  }
};
