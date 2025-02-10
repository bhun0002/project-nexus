const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const { name, email, contactNumber, password, confirmPassword } = req.body;

    // ✅ Validate required fields
    if (!name || !email || !contactNumber || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // ✅ Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // ✅ Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // ✅ Hash password & save user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, contactNumber, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Error registering user" });
  }
};
