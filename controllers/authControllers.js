import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const secret = process.env.secret || "noman1234";

const salt = await bcrypt.genSalt(10);
export const register = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const user = new User({
      ...req.body,
      password: await bcrypt.hash(req.body.password, salt),
    });
    const response = await user.save();
    console.log("user", user);
    const token = jwt.sign(
      {
        _id: response._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: response.email,
      },
      secret
    );
    res.send({
      err: 0,
      status: 200,
      message: "Registered",
      token: token,
      id: response._id,
      email: response.email,
    });
  } catch (error) {
    console.log("error in Controller", error);
    res.status(400).send(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email password", { email, password });
    console.log("req.body", req.body);
    let user = await User.findOne({ email });
    if (!user) {
      return res.send({ err: 1, message: "Email Id not Registered" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.send({ err: 1, message: "Email or Password Incorrect" });
    }
    const token = jwt.sign(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userId: user._id,
      },
      secret,
      { expiresIn: "30s" }
    );
    res.send({
      err: 0,
      status: 200,
      name: `${user.firstName} ${user.lastName}`,
      message: "Logged In successfully",
      token: token,
      email: user.email,
    });
  } catch (error) {
    console.log("error in Login Controller", error);
    res.send({ err: 1, status: 401, message: `Unauthorized ${error}` });
  }
};

export const authRoute = async (req, res) => {
  res.send({ err: 0, message: "Protected route access given" });
};

const bcryptPass = async () => {
  // console.log("req.body.password", req.body.password);
  const newPass = await bcrypt.hash("noman1234", salt);
  console.log("newPass", newPass);
};
// console.log(bcryptPass());
