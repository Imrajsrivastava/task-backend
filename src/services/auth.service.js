import { User } from "../models/user.model.js";
import { generateToken } from "../utils/jwt.js";

export const registerUser = async (email, password) => {
  let user = await User.findOne({ email });
  if (user) throw new Error("User already exists");

  user = new User({ email, password });
  await user.save();

  const token = generateToken(user._id);
  return { user, token };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken(user._id);
  return { user, token };
};
