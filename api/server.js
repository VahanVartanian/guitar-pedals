
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// import the routers
const pedalsRouter = require('./routes/pedals');
const categoriesRouter = require('./routes/categories'); // import the categories router

const app = express();
const PORT = process.env.PORT || 3001;

// middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files
app.use('/uploads', express.static('uploads'));

// set up routes
app.use('/api/pedals', pedalsRouter);
app.use('/api/categories', categoriesRouter); // mount the categories endpoint

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

