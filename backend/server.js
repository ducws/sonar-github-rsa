// imports
const express = require('express');
const fs = require('fs');

// initializations
const app = express()
const FLAG = fs.readFileSync('flag.txt', { encoding: 'utf8', flag: 'r' }).trim()
const PORT = 3000

// Logging middleware: log full HTTP request
app.use((req, res, next) => {
    console.log('--- New Request ---');
    console.log(`Method: ${req.method}`);
    console.log(`Path: ${req.path}`);
    console.log('Headers:', req.headers);
    console.log('Query:', req.query);
    next();
});

// endpoints
app.get('/', async (req, res) => {
    if (req.header('a') && req.header('a') === 'admin') {
        return res.send(FLAG);
    }
    return res.send('Hello '+req.query.name.replace("<","").replace(">","")+'!');
});

// start server
app.listen(PORT, async () => {
    console.log(`Listening on ${PORT}`)
});