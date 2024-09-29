const express = require('express');
const cors = require('cors');
const dal = require('./dal.js');
const app = express();
const port = 3000; // Define port correctly

// Use static files from the public directory
app.use(express.static('public'));
app.use(cors());

// Test connection to MongoDB when the server starts
dal.connectToDb().then(() => {
    console.log('Successfully connected to MongoDB on startup');
}).catch((err) => {
    console.error('Error connecting to MongoDB on startup:', err);
});

// Create user account
app.get('/account/create/:name/:email/:password', function (req, res) {
    const { name, email, password } = req.params;
    dal.create(name, email, password)
        .then((user) => {
            console.log('User created:', user);
            res.json(user);  // Return the newly created user
        })
        .catch((err) => {
            console.error('Error creating user:', err);
            res.status(500).json({ error: 'Failed to create user' });
        });
});


// Create or update user account balance
app.get('/account/update/:email/:amount', function (req, res) {
    const amount = Number(req.params.amount);
    console.log(`Updating balance for ${req.params.email} by ${amount}`);

    dal.update(req.params.email, amount)
        .then((response) => {
            console.log('Updated balance:', response.balance);
            res.json(response);  // Return the updated response as JSON
        })
        .catch((err) => {
            console.error('Error updating balance:', err);
            res.status(500).json({ error: 'Failed to update balance' });
        });
});

// Login user
app.get('/account/login/:email/:password', function (req, res) {
    dal.find(req.params.email)
        .then((user) => {
            if (user.length > 0 && user[0].password === req.params.password) {
                res.json(user[0]);  // Return the user as JSON
            } else {
                res.status(400).json({ error: 'Login failed' });
            }
        })
        .catch((err) => {
            res.status(500).json({ error: 'Internal server error' });
        });
});

// Find user account by email
app.get('/account/find/:email', function (req, res) {
    dal.find(req.params.email)
        .then((user) => {
            console.log(user);
            res.send(user);
        });
});

// Find one user account by email
app.get('/account/findOne/:email', function (req, res) {
    dal.findOne(req.params.email)
        .then((user) => {
            console.log(user);
            res.send(user);
        });
});

// Transfer amount between two users
app.get('/account/transfer/:fromEmail/:toEmail/:amount', function (req, res) {
    const fromEmail = req.params.fromEmail;
    const toEmail = req.params.toEmail;
    const amount = Number(req.params.amount);

    dal.findOne(fromEmail).then((user) => {
        if (user.balance >= amount) {
            dal.update(fromEmail, -amount).then(() => {
                dal.update(toEmail, amount).then(() => {
                    res.send('Transfer successful');
                });
            });
        } else {
            res.send('Insufficient balance');
        }
    }).catch(err => res.send('Error in transfer'));
});

// Get all accounts
app.get('/account/all', function (req, res) {
    dal.all().then((docs) => {
        console.log(docs);
        res.send(docs);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Running on port: ${port}`);
});
