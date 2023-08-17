import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

const salt = await bcrypt.genSalt(10);

const getUserById = async (req, res) => {
  //   const user = await User.findById(req.params.id, { password: 0, _id: 0 });
  //   const user = await User.findById(req.params.id).select(
  //     "-password -_id -firstName"
  //   );
  const user = await User.findById(req.params.id).select("-password");

  //   console.log("user", user);
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).send("User Not found");
  }
};

const getAllUsers = async (req, res) => {
  const allUsers = await User.find({}).select("-password");
  console.log("allUsers", allUsers);
  if (allUsers) {
    res.status(200).send(allUsers);
  } else {
    res.status(404).send("No Users found");
  }
};

const updateUserByID = async (req, res) => {
  console.log("req.user", req.user);
  const user = await User.findById(req.user.userId);
  console.log("req.user", req.user);
  console.log("user", user);
  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      console.log("user.password", user.password);
      //   user.password = req.body.password;
      //   await bcrypt.hash(req.body.password, salt);
      (user.password = await bcrypt.hash(req.body.password, salt)),
        console.log("req.body.password", req.body.password);
    }
    // console.log("user", user);
    const updatedUser = await user.save();
    console.log("updatedUser", updatedUser);
    res.status(200).send({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
    });
  } else {
    res.status(404).send("No User found");
  }
};

const deleteUser = async (req, res) => {
  const user = await User.findOneAndDelete(req.user.userId);
  if (user) {
    res.status(200).send("User Deleted");
  } else {
    res.status(400).send("User not Found");
  }
};

export { getUserById, getAllUsers, updateUserByID, deleteUser };
