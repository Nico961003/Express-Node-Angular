'use strict'
// se carga el modulo mongoose
var mongoose = require('mongoose');
// se crea el objeto
var Schema = mongoose.Schema;
/* 
se define la estructura de los objetos que se van a estar utilizando
con Date.now, se guarda por defecho la fecha del dia de registro
segun el sistema
*/
var articleSchema = Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now },
    image: String
});

// se exporta el modelo para poder usarlo en otros ficheros  o modelos
module.exports = mongoose.model('Article', articleSchema);
/* dentro de mongoose model primero es el nombre del modelo y en
  segunda instancia es el esqueema que se va a utilizar
  Cada documento que se guarde en la BD va a ser un articulo y dentro de esa coleccion
  de datos se va a utilizar el esquema
*/