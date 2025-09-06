import { registerUser, loginUser } from "../services/auth.service.js";

const setTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user } = await registerUser(email, password);
    console.log("user registered:", user);
    res.json({ msg: "User registered successfully" ,success: true});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    setTokenCookie(res, token);
    console.log("user logged in:", user);
    res.json({ id: user._id, email: user.email });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};

export const checkAuth = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.json({ id: req.user._id, email: req.user.email });
};