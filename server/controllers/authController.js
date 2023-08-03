import { hashPassword, comparePassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";

import validator from "validator";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

//  LOGIN CONTROLLER
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validating user
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Please fill all the fields",
      });
    }

    // Check if user exist
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered!",
      });
    }

    // Match password with hashedPass in database
    const hashedPassword = user.password;
    const match = await comparePassword(password, hashedPassword);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password!",
      });
    }

    const name = user.name;

    // create token
    const token = await createToken(user._id);

    res.status(200).send({
      success: true,
      message: "Login successfully!",
      user: { name, email, token },
    });
  } catch (err) {
    // //console.log(err);
    res.status(500).send({
      success: false,
      message: "Login failed!",
      err,
    });
  }
};

// REGISTER CONTROLLER
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // VALIDATION
    if (!email || !password || !name) {
      return res.status(400).send({
        status: false,
        message: "Please fill all fileds.",
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).send({
        status: false,
        message: "Please provide valid email address",
      });
    }

    // if (!validator.isStrongPassword(password)) {
    //   return res.status(400).send({
    //     status: false,
    //     message: "Weak password",
    //   });
    // }

    //  Check if any user already exists with this email
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).send({
        status: false,
        message: "Email already registered!",
      });
    }

    // hash of password using bcrypt
    const hash = await hashPassword(password);

    // creating new user
    const user = await userModel.create({
      name,
      email,
      password: hash,
    });

    // create jwt token
    const token = createToken(user._id);

    // sending response
    res.status(201).send({
      success: true,
      message: "Successfully registered",
      user: { name, email, token },
    });
  } catch (err) {
    res.status(400).send({
      status: false,
      message: "Error in registration!",
    });
  }
};

export { loginController, registerController };
