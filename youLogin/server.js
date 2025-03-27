const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from a 'public' directory if you have one
app.use(express.static(path.join(__dirname, 'public')));

// Basic route
app.get('/api/status', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Example route for user login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  // Here you would typically validate the credentials against a database
  // This is just a placeholder example
  if (username && password) {
    // Mock successful login
    res.json({ 
      success: true, 
      message: 'Login successful',
      user: { username }
    });
  } else {
    res.status(400).json({ 
      success: false, 
      message: 'Username and password required'
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

