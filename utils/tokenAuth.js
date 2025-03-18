import jwt from "jsonwebtoken";
import { SESSION_REFRESH_TOKEN, TOKEN_KEY } from "../config.js";
import User from "../models/userModel.js";


export async function verifyToken(req, res, next) {
  try {
   
    const userId =
      req.body.userId ||
      req.query.userId ||
      req.headers['userId'] ||  req.headers['userid'] ||
      req.params.userId;


    const userData = await User.findOne({ _id: userId });

    if (!userData) {
      return res.status(403).send("User not found");
    }

    const token = userData.token;

    if (!token) {
      return res.status(403).send("Token is required for authentication");
    }
    
    const decoded = jwt.verify(token, TOKEN_KEY);

    const refreshedToken = jwt.sign(
      { email: decoded.email, password: decoded.password },
      TOKEN_KEY,
      {
        expiresIn: "8h",
      }
    );
    const editData = {
      token: refreshedToken,
    };

    const refreshToken = await User.findByIdAndUpdate(userId, editData, {
      new: true,
      runValidators: true,
    });

    return next();
  } catch (err) {
    console.log("Error.....", err);
    return res.status(401).send("Token Expired");
  }
}
