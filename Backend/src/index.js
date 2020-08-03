// archivo para iniciar el servidor
// se va trabajar con express y es por eso que es requerida
const express = require('express');
//para poder usar las funciones de express se almacenan en una variable
// como el inicio del servidor linea #16
const app = express();
const cors = require('cors');


// ARTICULOS 
var appA = require('./app');

// requiere el archivo database para realizar la conexion a mongo
require('./database');

// settings
app.set('port', process.env.PORT || 3900)

// middlewares
// se usa el metodo json que trae integrado express para poder
// convertir los datos que recibe el servidor a un objeto
// javascript que se va poder manipular
app.use(express.json());
app.use(cors());

// routes
// usamos lo que se esta requiriendo desde la carpeta routes/index
app.use('/api', require('./routes/index'));

app.listen(app.get('port'));
console.log('Server on port', app.get('port'));