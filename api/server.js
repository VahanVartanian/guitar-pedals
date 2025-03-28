// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import your routers
const pedalsRouter = require('./routes/pedals');
const categoriesRouter = require('./routes/categories'); // Import the categories router

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (uploads)
app.use('/uploads', express.static('uploads'));

// Set up routes
app.use('/api/pedals', pedalsRouter);
app.use('/api/categories', categoriesRouter); // Mount the categories endpoint

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

