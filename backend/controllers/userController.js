import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const creatToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// route for user login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: " User dos not  exists " });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = creatToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: " Invalid credentials " });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// route for user registration

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // cheking user already existe or not

    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({ success: false, message: " user already exists " });
    }

    // validation email format and strong password

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: " pleas enter a valide email  ",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: " pleas enter a strong password  ",
      });
    }

    // hashing user password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = creatToken(user._id);

    res.json({ succesee: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// route for admine login

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin };
