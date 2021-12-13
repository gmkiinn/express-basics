// imports
const express = require('express');
const morgan = require('morgan');
const config = require('config');
const devDebugger = require('debug')('app:dev');
const prodDebugger = require('debug')('app:prod');
const parsing = require('./middlewares/parsing');
const logging = require('./middlewares/logging');

// express application
const app = express();

// Setup View Engine
app.set('view engine', 'ejs');
app.set('views', './views'); //optional

// environments
console.log(process.env.NODE_ENV);
console.log(app.get('env'));

// midllewares
// next function respresents to send request control to another middleware.
// Request will be hanged in the middleware, if next function does not called.
// Middlewares will be called in sequence.
// Structing the middleware.
// tip: module.exports isan empty object.

// app.use((req, res, next) => {
//   console.log('Request Processing');
//   next();
// });

app.use(parsing);
app.use(logging);

// built-in middlewares
// parse the req body and put it in body property of req
app.use(express.json());
// parse the url encoded body and put it in body property of req
app.use(express.urlencoded({ extended: true }));
//serving static files
app.use(express.static('public'));

// third-party Middlewares
// Code based on environments
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan Enabled');
}

if (app.get('env') === 'production') {
  console.log('Multer Enabled');
}

// Configuration settings
// Application configuration would be different based on environment
// export NODE_ENV=production
// Passwords and Secret Keys should not store anywhere. It should be in environment variables.
// custom-environment-variables.json -> map configuration name to environment variables
// export DB_PASSWORD=gmksandy
console.log(config.get('db.url'));
console.log(config.get('name'));
console.log(config.get('dbPassword'));

// Console statements based on environment variable of DEBUG
// Don't user multiple debuggers if not needed.
devDebugger('development Debugger');
prodDebugger('production Debugger');

// Template Engines -> Produces dynamic html
app.get('/view', (req, res) => {
  res.render('index', {
    title: 'Dynamic Template',
    listName: 'Products',
    list: ['Shoes', 'watch', 'ipad'],
  });
});

// Database integrations
// Express has lot of DB drivers, to communicate with databases from application

// routes
app.get('/', (req, res) => {
  res.send('Hello from Express World');
});

app.get('/api/passwords', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

// Port listening
app.listen(4000, () => console.log('app is listening on port 4000'));
