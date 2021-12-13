// Restful Services
// first express app
// nodemon
// environment variables
// route parameters and query parameters
// Handlng HTTP Get Requests
// Handling HTTP Post Requests
// Using Postman
// Validating Input - Joi
// Handling PUT requests - Lookup - 404, validate - 400, update. DRY
// Handling DELETE requests - lookup and delete
// vidly - genres api
// Structuring express application with router

// Imports
const express = require('express');
const Joi = require('Joi');
const passwords = require('./routes/passwords');
const home = require('./routes/home');

// Express applictaion
const app = express();

//middlewares
app.use(express.json());

// Express app has bunch of methods mapped with http methods to make CRUD operations.
// app.get(), app.post(), app.put(), app.delete()

// nodemon: it starts the server, when changes are made to application unlike with node.

// Environment variables: When appis deployed, port number will be set by Hosting provider.
// To get the details of app, we must see in environment varaibles of pocess => process.env
// To set the environment variables in terminal=> export PORT=5000
// console.log(process.env, process.env.PORT);

app.use('/', home);
app.use('/api/passwords', passwords);

// app listening on port
const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`app is listening on port ${PORT}`));
