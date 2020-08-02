'use strict'
/* Servidor */
//Cargar modulos de node para crear el servidor
var express = require('express');
var bodyParser = require('body-parser'); // recibe valor y lo convierte en un objeto nativo para JavaScript
// Ejecutar express para trabajar con HTTP
var app = express();
// Cargar fichero rutas 
var articleRoutes = require('./routes/article');
/* Cargar middlewares Procesa un dato antes de ejecutar una ruta */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // convierte cualquier peticion en javaScript
//Corse para permitir peticiones desde el front end
// CORSE - acceso cruzado entre dominio, permite el acceso
// o las llamadas http o asincronas al api desde el frontEnd que este 
// en otro ip diferente, si no, las entradas de las peticiones seran bloqueadas
// peticiones que esten desde react, angular, vue
// Configurar cabeceras y cors
// es un middleware que se ejecuta antes de cada ruta que ejecutemos
app.use((req, res, next) => {
    // el next permite pasar a lo siguiente quye haya que hacer
    // se configura el control de acceso para que cualquier cliente pueda
    // hacer peticiones ajax
    res.header('Access-Control-Allow-Origin', '*');
    // y luego permiten todas estas cabeceras e incluso se pueden añadir mas
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    // y se permiten todos estos metodos
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// añadir prefijos a las rutas (Cargar rutas)
app.use('/api', articleRoutes);
/* 
//Rutas o app para metodos de prueba
app.get('/probando', (req, res) => {
            console.log('Hola mundo');
            return res.status(200).send(`
     <ul>
         <li>Aguacate</li>
         <li>Berenjena</li>
         <li>Cebolla</li>
     </ul>
     `)
    return res.status(200).send({
        curso: 'Master en FrameworksJS',
        autor: 'Victor Robles',
        url: 'udemy'
    })
});*/

//Esportar el modulo (fichero actual)
// permite usar el objeto que se acaba de crear fuera de este fichero
module.exports = app;