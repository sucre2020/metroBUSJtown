const express = require('express');
const router = express.Router();

// Handle GET request to /logout
router.get('/', (req, res) => {
    // Logout the user
    req.logout((err) => {
        if (err) {
            // Handle error if logout fails
            console.error(err);
            return res.status(500).json({ message: 'Error logging out' });
        }
        // Redirect the user to the homepage after successful logout
        res.redirect('/');
    });
});

module.exports = router;
