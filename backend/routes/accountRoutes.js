// const express = require('express');
// const router = express.Router();
// const User = require('../models/User'); // Import the User model

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



// module.exports = router;
