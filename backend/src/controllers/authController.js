const User = require("../models/User");  // ✅ Import the User model
const crypto = require("crypto"); // ✅ Import crypto for password hashing


/**
 * @desc    Registers a new user with hashed password storage
 * @route   POST /api/auth/signup
 * @access  Public
 */
exports.signup = async (req, res) => {
    try {

        // ✅ Extract user details from request body
        const { name, email, contactNumber, password, confirmPassword } = req.body;
        
        // ✅ Validate required fields
        if (!name || !email || !contactNumber || !password || !confirmPassword) {
            return res.status(400).json({ error: "All fields are required" });
        }
        // ✅ Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // ✅ Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already registered" });
        }

        // ✅ Generate a secure random salt
        const salt = crypto.randomBytes(16).toString("hex");

        // ✅ Hash the password using PBKDF2 with the generated salt
        const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");

        // ✅ Create a new user record in the database with hashed password and salt
        const newUser = await User.create({
            name,
            email,
            contactNumber,
            password: hashedPassword,
            salt: salt
        });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Error registering user" });
    }
};

/**
 * @desc    Authenticates user by verifying email and password
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = async (req, res) => {
    try {
         // ✅ Extract login credentials from request body
        const { email, password } = req.body;

        // ✅ Find user by email
        const user = await User.findOne({ email });
        
        // ✅ If user is not found, return an error
        if (!user) {
            return res.status(400).json({ error: "Email not found!" });
        }

        // ✅ Hash the entered password using the stored salt
        const hashedEnteredPassword = crypto.pbkdf2Sync(password, user.salt, 1000, 64, "sha512").toString("hex");

        // ✅ Compare the hashed entered password with stored hashed password
        if (hashedEnteredPassword !== user.password) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful", name: user.name, email: user.email });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Error logging in" });
    }
};

