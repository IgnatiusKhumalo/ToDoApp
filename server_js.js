const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const path = require('path');
const db = require('./utils_db/db_js');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index_html.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'public', 'register_html.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'public', 'dashboard_html.html')));

// Register
app.post('/register', async (req, res) => {
    const { username, email, name, surname, password } = req.body;
    if(!username || !email || !name || !surname || !password) return res.send('All fields required');

    const hashed = await bcrypt.hash(password, 10);
    db.run(`INSERT INTO users(username,email,name,surname,password) VALUES (?,?,?,?,?)`,
        [username.toLowerCase(), email.toLowerCase(), name, surname, hashed],
        function(err){
            if(err) return res.send('Username or email already exists');
            res.redirect('/');
        });
});

// Login
app.post('/login', (req, res) => {
    const { username, email, password } = req.body;
    db.get(`SELECT * FROM users WHERE username=? AND email=?`,
        [username.toLowerCase(), email.toLowerCase()],
        async (err, user) => {
            if(!user) return res.send('User not found');
            const match = await bcrypt.compare(password, user.password);
            if(match){
                res.cookie('user_id', user.id, { httpOnly:true });
                res.redirect('/dashboard');
            } else {
                res.send('Wrong password');
            }
        });
});

// API: get tasks
app.get('/api/tasks', (req, res) => {
    const user_id = req.cookies.user_id;
    if(!user_id) return res.status(401).send('Unauthorized');
    db.all(`SELECT * FROM tasks WHERE user_id=?`, [user_id], (err, rows) => {
        res.json(rows);
    });
});

// API: add task
app.post('/api/tasks', (req, res) => {
    const user_id = req.cookies.user_id;
    if(!user_id) return res.status(401).send('Unauthorized');

    const { title, description, due_date, priority, tags, dependencies, recurring } = req.body;
    db.run(`INSERT INTO tasks(user_id,title,description,due_date,priority,tags,dependencies,recurring,status) VALUES (?,?,?,?,?,?,?,?,?)`,
        [user_id,title,description,due_date,priority,tags,dependencies,recurring,'pending'],
        function(err){
            if(err) return res.status(500).send(err.message);
            res.json({ id:this.lastID });
        });
});

// API: delete task
app.delete('/api/tasks/:id', (req,res)=>{
    const user_id = req.cookies.user_id;
    if(!user_id) return res.status(401).send('Unauthorized');

    const id = req.params.id;
    db.run(`DELETE FROM tasks WHERE id=? AND user_id=?`, [id,user_id], function(err){
        if(err) return res.status(500).send(err.message);
        res.json({ deleted:this.changes });
    });
});

app.listen(PORT, ()=> console.log(`Server running at http://localhost:${PORT}`));
