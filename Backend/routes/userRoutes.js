const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dbPath = path.join(__dirname, '../db.json');

// Helper function to read data from db.json
const readDb = () => {
    return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
};

// Helper function to write data to db.json
const writeDb = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// Signup route
router.post('/signup', (req, res) => {
    const { id, name, password, email } = req.body;
    const db = readDb();

    // Check if user already exists
    for (const userId in db) {
        if (db[userId].email === email) {
            return res.status(400).json({ message: 'User already exists.' });
        }
    }

    // Add new user to the database
    db[`user${id}`] = { id, name, password, email };
    writeDb(db);

    res.status(201).json({ message: 'User created successfully.' });
});

// Login route
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const db = readDb();

    // Check if user exists
    for (const userId in db) {
        if (db[userId].email === email && db[userId].password === password) {
            return res.status(200).json({ message: 'Login successful.' });
        }
    }

    res.status(401).json({ message: 'Invalid credentials.' });
});

// Get all users route
router.get('/', (req, res) => {
    const db = readDb();
    res.status(200).json(db);
});

module.exports = router;
