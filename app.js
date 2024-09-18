const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = 3000;

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'findyouritem'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
    secret: 'your-unique-secret', // Replace with a strong, unique secret key
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, 
        maxAge: 1000 * 60 * 60 * 24 
    }
}));

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Middleware to check authentication
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login.html');
    }
}

// Handle signup
app.post('/signup', (req, res) => {
    const { email, password } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) throw err;
        const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
        db.query(sql, [email, hashedPassword], (err, result) => {
            if (err) throw err;
            res.redirect('/login.html'); 
        });
    });
});

// Handle login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            bcrypt.compare(password, results[0].password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    req.session.user = { id: results[0].id, email: results[0].email };
                    res.redirect('/index.html'); 
                } else {
                    res.send('Invalid credentials');
                }
            });
        } else {
            res.send('No user found with this email');
        }
    });
});

// Handle logout
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/index.html'); 
    });
});

// Handle lost item report
app.post('/submit-lost-report', isAuthenticated, upload.single('item-image'), (req, res) => {
    const { item_name, item_description, date_lost, location_lost, contact_info } = req.body;
    const item_image = req.file ? req.file.path : null;
    const sql = 'INSERT INTO lost_items (item_name, item_description, date_lost, location_lost, contact_info, item_image) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [item_name, item_description, date_lost, location_lost, contact_info, item_image], (err, result) => {
        if (err) throw err;
        res.redirect('/index.html'); 
    });
});

// Handle found item report
app.post('/submit-found-item', isAuthenticated, upload.single('item-image'), (req, res) => {
    const { item_name, item_description, date_found, location_found, contact_info } = req.body;
    const item_image = req.file ? req.file.path : null;
    const sql = 'INSERT INTO found_items (item_name, item_description, date_found, location_found, contact_info, item_image) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [item_name, item_description, date_found, location_found, contact_info, item_image], (err, result) => {
        if (err) throw err;
        res.redirect('/index.html'); 
    });
});

// Fetch all lost items
app.get('/api/lost-items', (req, res) => {
    const query = 'SELECT * FROM lost_items ORDER BY date_lost DESC';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Fetch all found items
app.get('/api/found-items', (req, res) => {
    const query = 'SELECT * FROM found_items ORDER BY date_found DESC';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Check authentication status
app.get('/check-auth', (req, res) => {
    if (req.session.user) {
        res.json({ isAuthenticated: true });
    } else {
        res.json({ isAuthenticated: false });
    }
});

// Serve pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/signup.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});
app.get('/lost-report.html', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'lost-report.html'));
});
app.get('/found-item.html', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'found-item.html'));
});

// Search Route
app.get('/search', isAuthenticated, (req, res) => {
    const searchQuery = req.query.query;
    const sqlSearch = 'SELECT * FROM items WHERE item_name LIKE ?';
    db.query(sqlSearch, [`%${searchQuery}%`], (err, results) => {
        if (err) {
            console.error('Error while searching:', err);
            return res.status(500).json({ message: 'An error occurred while searching.' });
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
