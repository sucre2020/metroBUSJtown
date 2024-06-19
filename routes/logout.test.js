const request = require('supertest');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('dotenv/config');

// Import the logout route module
const logoutRouter = require('./logout');

// Create an instance of Express application
const app = express();

// Use express-session middleware
app.use(session({
    secret: process.env.cookieKey,
    resave: false,
    saveUninitialized: false
}));

// Use Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Use the logout route module
app.use('/logout', logoutRouter);

describe('Logout Route', () => {
    test('GET /logout should log out the user and redirect to homepage', async () => {
        // Make a GET request to /logout
        await request(app)
            .get('/logout')
            .set('Accept', 'application/json')
            .send()
            .expect(302) // Expecting redirect status code
            .expect('Location', '/'); // Check if redirected to homepage
    });
});
