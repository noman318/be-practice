import jwt from "jsonwebtoken";

const secret = process.env.secret || "noman1234";

export const auth = async (req, res, next) => {
  const token = req.header("token");
  //   console.log("token", token);
  if (!token) {
    return res.status(401).send("Unauthorized Access");
  }
  try {
    const decodedToken = jwt.verify(token, secret);
    req.user = decodedToken;
    // console.log("decodedToken in Auth middleware", decodedToken);
    next();
  } catch (error) {
    console.log("error in Auth middleware", error);
    res.send("Unauthorized user", error);
  }
};
