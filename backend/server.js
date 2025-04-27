const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');  // Import DB connection file
const studentRoutes = require('./routes/studentRoutes');  // Import routes
require('dotenv').config();  // Load environment variables

const app = express();
const PORT = process.env.PORT || 5002;

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL,  // Using the FRONTEND_URL from .env
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));  // Apply CORS middleware with specified options
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/students', studentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
