const express = require("express");

const app = express();

const port = 7000

app.get('/', (req, res) => {
    res.send('Helloooooooooooooooooooo!')
})

app.get('/login', (req, res) => {
    res.send('Loginnnnnnn it iss!')
})

app.get('/signin', (req, res) => {
    res.send('sign in it iss!')
});
const admin =  (req, res) => {
    res.send('Adminn!');
};
const isAdmin =  (req, res, next) => {
    console.log('iss admin!');
    next();
};
const isloggedin =  (req, res, next) => {
    console.log('iss logged bro!');
    next();
};
app.get('/admin',isloggedin, isAdmin, admin);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))