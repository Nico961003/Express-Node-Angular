const express = require('express');
const cors = require('cors');
const app = express();

// ARTICULOS 
var appA = require('./app');
///

require('./database');

// settings
app.set('port', process.env.PORT || 3900)
appA.set('port2', process.env.PORT || 3900)

// middlewares
app.use(express.json());
app.use(cors());
appA.use(express.json());
appA.use(cors());

// routes
app.use('/api', require('./routes/index'));
appA.use('/api', require('./routes/index'));

app.listen(app.get('port'));
appA.listen(app.get('port2'));
console.log('Server on port', app.get('port'));