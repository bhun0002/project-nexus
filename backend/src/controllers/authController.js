const User = require("../models/User");
const crypto = require("crypto");

// const bcrypt = require("bcryptjs");

// exports.signup = async (req, res) => {
//   try {
//     const { name, email, contactNumber, password, confirmPassword } = req.body;

//     // ✅ Validate required fields
//     if (!name || !email || !contactNumber || !password || !confirmPassword) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     // ✅ Check if passwords match
//     if (password !== confirmPassword) {
//       return res.status(400).json({ error: "Passwords do not match" });
//     }

//     // ✅ Check if email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: "Email already registered" });
//     }

//     // ✅ Hash password & save user

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await User.create({ name, email, contactNumber, password: hashedPassword });

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error("Signup Error:", error);
//     res.status(500).json({ error: "Error registering user" });
//   }
// };





exports.signup = async (req, res) => {
    try {
        const { name, email, contactNumber, password, confirmPassword } = req.body;

        if (!name || !email || !contactNumber || !password || !confirmPassword) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // ✅ Generate a Random Salt
        const salt = crypto.randomBytes(16).toString("hex");

        // ✅ Hash Password using PBKDF2
        const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");

        // ✅ Store Hash + Salt in the Database
        const newUser = await User.create({
            name,
            email,
            contactNumber,
            password: hashedPassword,
            salt: salt // Store salt separately
        });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Error registering user" });
    }
};



exports.login = async (req, res) => {
  try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ error: "Email not found!" });
      }

      // ✅ Hash Entered Password with Stored Salt
      const hashedEnteredPassword = crypto.pbkdf2Sync(password, user.salt, 1000, 64, "sha512").toString("hex");

      // ✅ Compare Hashed Passwords
      if (hashedEnteredPassword !== user.password) {
          return res.status(400).json({ error: "Invalid credentials" });
      }

      res.status(200).json({ message: "Login successful", name: user.name, email: user.email });

  } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ error: "Error logging in" });
  }
};

