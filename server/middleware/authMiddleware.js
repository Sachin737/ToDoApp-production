import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protection middlewares
const requireAuth = async (req, res, next) => {
  try {
    const { _id } = jwt.verify(
      req?.headers?.authorization,
      process.env.JWT_SECRET
    );

    req.user = await userModel.findOne({ _id }).select("_id");

    next();
  } catch (err) {
    res.status(401).send({
      status: false,
      message: "error in Token verification!",
    });
  }
};

export default requireAuth;
