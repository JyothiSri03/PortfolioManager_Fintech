const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Controllers
const goldRoutes = require('./controllers/gold');
const stockRoutes = require('./controllers/stocks');
const mutualFundsRoutes = require('./controllers/mutualfunds');
const propertyRoutes = require('./controllers/property');

// Routes
app.use('/api/investments', goldRoutes);
app.use('/api/investments', stockRoutes);
app.use('/api/investments', mutualFundsRoutes);
app.use('/api/investments', propertyRoutes);

module.exports = app;


