// archivo para realizar la conexion a mongodb

// se requiere el modulo para poder conectarse
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false); /* forzamos a que los metodos antiguos se desactiven que solo funcionen los metodos actuales de la version de mongo */
mongoose.Promise = global.Promise;

// metodo conect que recibe un string con la direccion de donde esta la base
// de igual forma crea la BD
mongoose.connect('mongodb://localhost/api_rest_blog', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    // despues de conectarte muestra en consola Database is connected
    .then(db => console.log('Database is connected'))
    // si no muestra el error
    .catch(err => console.log(err));