const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 8080;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Use user routes
app.use('/users', userRoutes);

// Create a server to listen at port 8080
app.listen(PORT, () => {
    console.log(`REST API demo app listening at http://localhost:${PORT}`);
});
