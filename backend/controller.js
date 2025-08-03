const userschema = require('./schema.js');
const bcrypt = require('bcryptjs');
const generateToken = require('./generateToken.js');

const userregister = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userexist = await userschema.findOne({ email: email });
        if (userexist) {
            return res.status(400).json({ message: 'user already exist' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);
        
        // Create the new user
        const newUser = await userschema.create({
            username: username,
            email: email,
            password: hashedpassword
        });

        if (newUser) {
            // Send back the user info AND a fresh token
            res.status(201).json({ // 201 is the correct status for "Created"
                _id: newUser._id,
                username: newUser.username, // FIX: Use 'username' to match your schema
                email: newUser.email,
                token: generateToken(newUser._id) // FIX: Generate token for the NEW user
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const userlogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find the specific user in the database
        const user = await userschema.findOne({ email: email });

        // FIX: Compare password against the found user's password (user.password)
        if (user && (await bcrypt.compare(password, user.password))) {
            // If login is successful, send back user info and a fresh token
            res.status(200).json({
                _id: user._id,
                username: user.username, 
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: `Invalid email or password` });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    userregister,
    userlogin
};
