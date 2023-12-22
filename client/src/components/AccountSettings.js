
// import React, { useState } from 'react';
// import axios from 'axios';

// function AccountSettings({ user }) {
//   const [newUsername, setNewUsername] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleUpdateUsername = async () => {
//     try {
//       if (!user || !user._id) {
//         setError('User data not available.');
//         return;
//       }

//       const response = await axios.put('/api/update-username', {
//         userId: user._id,
//         newUsername,
//       });

//       if (response.status === 200) {
//         setSuccessMessage('Username successfully changed.');
//         setError('');
//         user.username = newUsername;
//         setNewUsername('');
//       } else {
//         setError('Failed to update username. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error updating username:', error);
//       setError('Error updating username. Please try again.');
//     }
//   };

//   const handleUpdatePassword = async () => {
//     try {
//       // Make an API request to update the password using email as the identifier
//       await axios.put('/api/update-password', { email: user.email, newPassword });
//       setNewPassword('');
//       setError('');
//     } catch (error) {
//       console.error('Error updating password:', error);
//       setError('Error updating password. Please try again.');
//     }
//   };

//   const handleDeleteAccount = async () => {
//     try {
//       // Make an API request to delete the user's account using email as the identifier
//       await axios.delete('/api/delete-account', { data: { email: user.email } });
//       // Redirect to the homepage or perform any necessary actions
//     } catch (error) {
//       console.error('Error deleting account:', error);
//       setError('Error deleting account. Please try again.');
//     }
//   };

//   return (
//     <div className="account-settings">
//       <h2>Account Settings</h2>
//       <div className="username-section">
//         <h3>Change Username</h3>
//         {successMessage && <p className="success">{successMessage}</p>}
//         {error && <p className="error">{error}</p>}
//         <input
//           type="text"
//           placeholder="New Username"
//           value={newUsername}
//           onChange={(e) => setNewUsername(e.target.value)}
//         />
//         <button onClick={handleUpdateUsername}>Update Username</button>
//       </div>
//       <div className="password-section">
//         <h3>Change Password</h3>
//         <input
//           type="password"
//           placeholder="New Password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//         />
//         <button onClick={handleUpdatePassword}>Update Password</button>
//       </div>
//       <div className="delete-account-section">
//         <h3>Delete Account</h3>
//         <button onClick={handleDeleteAccount}>Delete My Account</button>
//       </div>
//     </div>
//   );
// }

// export default AccountSettings;
