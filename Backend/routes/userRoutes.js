const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const USERS_FILE = path.join(__dirname, '../data/users.json');

// Endpoint to get a list of users
router.get('/', (req, res) => {
    fs.readFile(USERS_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading file' });
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint to get a single user by id
router.get('/:id', (req, res) => {
    fs.readFile(USERS_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading file' });
        }
        const users = JSON.parse(data);
        const user = users[`user${req.params.id}`];
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    });
});

// Endpoint to add a new user
router.post('/', (req, res) => {
    fs.readFile(USERS_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading file' });
        }
        const users = JSON.parse(data);
        const newUser = req.body;
        users[`user${newUser.id}`] = newUser;
        fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error writing file' });
            }
            res.status(201).json(newUser);
        });
    });
});

// Endpoint to update a user by id
router.put('/:id', (req, res) => {
    fs.readFile(USERS_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading file' });
        }
        const users = JSON.parse(data);
        const userId = `user${req.params.id}`;
        if (users[userId]) {
            users[userId] = req.body;
            fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error writing file' });
                }
                res.json(users[userId]);
            });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    });
});

// Endpoint to delete a user by id
router.delete('/:id', (req, res) => {
    fs.readFile(USERS_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading file' });
        }
        const users = JSON.parse(data);
        const userId = `user${req.params.id}`;
        if (users[userId]) {
            delete users[userId];
            fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error writing file' });
                }
                res.status(204).end();
            });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    });
});

module.exports = router;
