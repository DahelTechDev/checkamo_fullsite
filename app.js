const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require("cors");
const cookieParser = require('cookie-parser');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

//audm auth 
const authMiddleware = require('./middlewares/admAuth');

// Routes
const waitlistRoutes = require('./routes/watlistRoutes');
app.use('/api/waitlist', waitlistRoutes);


// GET route to serve index.html
app.get(['/', '/home'], (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/index.html'));
});


app.get('/join', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/index-join.html'));
});

app.get('/coming-soon', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/coming_soon.html'));
});
app.get('/terms-of-service', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/TOS.html'));
});
app.get('/privacy-policy', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/PP.html'));
});

app.get('/11199830083%22/adm', authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/waitlist-admin.html'));
});
app.get(['/1111/auth', '/1111/adm'], (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/admAuth.html'));
});

// 404 handler
app.use(['/:custom', '/:custom/:custom'], (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error.message);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.NODE_ENV === 'development' ? `http://localhost:${PORT}` : 'https://wwww.checkamo.com'} `);
});
