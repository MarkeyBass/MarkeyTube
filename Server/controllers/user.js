import { createError } from "../errorMiddlware.js";
import User from "../models/User.js";
import Video from "../models/Video.js"

export const update = async (req, res, next) => {
  // console.log("update is working");
  // console.log(req.params.id === req.user.id, req.params.id, req.user.id);
  //                    req.user.id - comes from prev jwt middlware
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {$set: req.body},
        { new: true }
      );
      if (!updatedUser) return next(createError(404, "User dosn't exists!"));

      res.status(200).json(updatedUser);
    } catch (err) {
      return next(err);
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
};

export const deleteUser = async (req, res, next) => {
  //                    req.user.id - comes from prev jwt middlware
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: "User has been deleted." });
    } catch (err) {
      return next(err);
    }
  } else {
    return next(createError(403, "You can delete only your account!"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...responseDetailes } = user._doc;
    if (!user) return next(createError(404, "User dosn't exists!"));

    res.status(200).json(responseDetailes);
  } catch (err) {
    return next(err);
  }
};

export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json({ msg: "Subscription successfull." })
  } catch (err) {
    next(err);
  }
};

export const unsubscribe = async (req, res, next) => {
  try {
    try {
      // Check if chenal exists
      const user = await User.findById(req.params.id)
      if (!user) return next(createError(404, "Chanel dosn't exists!"));
      // Adding subscription
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { subscribedUsers: req.params.id } // removing to array
      });
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: -1 } // incrementing
      });
      res.status(200).json({ msg: "Unubscription successfull!" })
    } catch (err) {
      next(err)
    }
  } catch (err) {
    next(err)
  }
};

export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId,{
      $addToSet:{likes:id}, // $addToSet id will be added to array only once
      $pull:{dislikes:id}
    })
    res.status(200).json("The video has been liked.")
  } catch (err) {
    next(err);
  }
};

export const dislike = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
      await Video.findByIdAndUpdate(videoId,{
        $addToSet:{dislikes:id},
        $pull:{likes:id}
      })
      res.status(200).json("The video has been disliked.")
  } catch (err) {
    next(err);
  }
};
