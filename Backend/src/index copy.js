/* con el modo estricto permite hacer mejores practicas de 
programacion
*/
'use strict'
/* cargando el modulo de mongoose*/
var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;
/* Conexion a mongodb
   se le mandan varios parametros, es una funcion de promesa 
   y dentro de ella se mete una funcion de callback
   Recordando que una promesa  es un objeto que representa la 
   terminación o el fracaso de una operación asíncrona
   Operacion asincrona: que funciona por tiempos
   Call back que regresa a una funcion en una variable
   */
mongoose.set('useFindAndModify', false); /* forzamos a que los metodos antiguos se desactiven que solo funcionen los metodos actuales de la version de mongo */
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_blog', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('La conexion a la BD se ha realizado exitosamente');
        // creacion del servidor
        app.listen(port, () => {
            console.log('Servidor corriendo en http://localhost:' + port);
        });
    });
/* Nota: Para correr el comando y probar la conexion se debe de estar 
  en el directorio correspondiente al archivo index.js o el que genera la
  instancia  a la BD (LINUX)
  */