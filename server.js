const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//Heroku server provides an ENV port when running on it.
//When running locally on node server we are saying to use 3000
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (request, response) => {
    // response.send('<h1>Hello Express!<h1>');
    // response.send({
    //     name: 'Viji',
    //     likes: [
    //         'villages',
    //         'peace',
    //         'yoga'
    //     ]
    // });
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/projects', (request, response) => {
    response.render('projects.hbs', {
        pageTitle: 'Projects Page',
        projectsMessage: 'Projects are under construction. Please visit soon!!'
    });
});

app.get('/bad', (request, response) => {
    response.send({
        error: 'Unable to fullfill this request'
    });
});

app.listen(port, () => {
    console.log('Server is up on port 3000');
});