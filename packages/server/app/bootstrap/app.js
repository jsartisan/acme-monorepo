const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

const config = require('@config');
const graphql = require('./graphql');

const app = express();

/*
|--------------------------------------------------------------------------
| Setting the static folder
|--------------------------------------------------------------------------
|
| tell express to use the folder as static.
*/
app.use('/public', express.static(path.join(__dirname, '../public')));

/*
|--------------------------------------------------------------------------
| Setting views folder
|--------------------------------------------------------------------------
|
| tell express which folder to use as views
*/
app.set('views', path.join(__dirname, '../views'));

/*
|--------------------------------------------------------------------------
| Boot Graphl server
|--------------------------------------------------------------------------
|
| /graphl
*/
graphql.boot(app);

/*
|--------------------------------------------------------------------------
| Turn On The Lights
|--------------------------------------------------------------------------
|
| start the express server to listen on the port
*/
app.listen(config.app.port, () => console.log(`🔥 App listening on port ${config.app.port}! 🚀`));

module.exports = app;
