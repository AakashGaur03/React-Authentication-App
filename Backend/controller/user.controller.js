const fs = require('fs');
const path = require('path');
const { generateToken } = require('../utils/jwtUtils');

const dbPath = path.join(__dirname, '../db.json');

// Helper function to read data from db.json
const readDb = () => {
    return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
};

// Helper function to write data to db.json
const writeDb = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// Signup controller
const signup = (req, res) => {
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

    const token = generateToken(id);

    res.status(201).json({ message: 'User created successfully.', token });
};

// Login controller
const login = (req, res) => {
    const { email, password } = req.body;
    const db = readDb();

    // Check if user exists
    for (const userId in db) {
        if (db[userId].email === email && db[userId].password === password) {
            const token = generateToken(db[userId].id);
            return res.status(200).json({ message: 'Login successful.', token });
        }
    }

    res.status(401).json({ message: 'Invalid credentials.' });
};

// Get all users controller
const getAllUsers = (req, res) => {
    const db = readDb();
    res.status(200).json(db);
};

module.exports = { signup, login, getAllUsers };
