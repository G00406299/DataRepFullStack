// authAndAccountRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register a new user
router.post('/register', async (req, res) => {
    try {
        console.log('Received request for registration:', req.body);
        const { username, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({ username, email, password });
        await user.save();

       // After a successful registration
       console.log('Registration completed successfully');

       // Send a response in HTML format
       res.status(201).send('<p>User registered successfully</p>');
   } catch (err) {
       console.error('Error:', err);
       // If there's an error, log it and send a 500 server error response
       res.status(500).send(`<p>Error: ${err.message}</p>`);
   }
});

// Authenticate user
router.post('/login', async (req, res) => {
    try {
        console.log('Received request for login:', req.body);
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }

        if (user.password !== password) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }

        console.log('Login completed successfully');
        res.json({ message: 'User logged in successfully' });
    } catch (err) {
        console.error('Error:', err);
        // If there's an error, log it and send a 500 server error response
        res.status(500).json({ error: 'Server error', message: err.message });
    }
});

// // Route to update username
// router.put('/update-username', async (req, res) => {
//   try {
//     const { userId, newUsername } = req.body;

//     // Find the user by their ID
//     const user = await User.findById(userId);

//     // Update the username
//     user.username = newUsername;

//     // Save the updated user
//     await user.save();

//     res.status(200).json({ message: 'Username updated successfully' });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Route to update password
// router.put('/update-password', async (req, res) => {
//   try {
//     const { userId, newPassword } = req.body;

//     // Find the user by their ID
//     const user = await User.findById(userId);

//     // Update the password
//     user.password = newPassword;

//     // Save the updated user
//     await user.save();

//     res.status(200).json({ message: 'Password updated successfully' });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Route to delete the account
// router.delete('/delete-account', async (req, res) => {
//   try {
//     const { userId } = req.body;

//     // Find the user by their ID and delete the account
//     await User.findByIdAndDelete(userId);

//     res.status(200).json({ message: 'Account deleted successfully' });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

module.exports = router;
