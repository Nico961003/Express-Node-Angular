'use strict'

var express = require('express');
// los dos puntos antes de la diagonal significa 1 carpetas atras
// una significa en el directorio actual
var articleController = require('../controllers/article');

var router = express.Router();

// creando middleware para subida de imagenes
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './upload/articles' });

// Rutas de prueba
router.post('/datos-curso', articleController.datosCruso);
router.get('/test-de-controlador', articleController.test);
// Rutas utiles
router.post('/save', articleController.save);
// sacar los ultimos articulos con el signo de interrogacion
// se vuelve un parametro opcional en la url
router.get('/articles/:last?', articleController.getArticles);
// un articulo en concreto (en este caso el id es obligatorio)
router.get('/article/:id', articleController.getArticle);
// get obtiene valores
// post envia o guardar cosas en la BD o al backend
// put se utiliza en metodos para actualizar
// delete para borrar
router.put('/article/:id', articleController.update);
// delete para borrar
router.delete('/article/:id', articleController.delete);
// upload (middleware)
router.post('/upload-image/:id', md_upload, articleController.upload);
// obteniendo imagen
router.get('/get-image/:image', md_upload, articleController.getImage);
// buscar articulos
router.get('/search/:search', articleController.search);
// con esto estas rutas ya pueden usarse en cualquier parte
module.exports = router;