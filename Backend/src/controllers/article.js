'use strict'

var validator = require('validator');
// importando el modelo y es la conexion directa con los metodos 
// que interactuan con la BD
var Article = require('../models/article');
// importando modulo de file System (fs)
var fs = require('fs');
// saca ruta del archivo en el servidor
var path = require('path');

var controller = {
    datosCruso: (req, res) => {
        console.log('Hola mundo');
        return res.status(200).send({
            curso: 'Master en FrameworksJS',
            autor: 'Victor Robles',
            url: 'udemy'
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy la accion test de mi controlador'
        });
    },
    //guardar un articulo
    save: (req, res) => {
        // Recoger los parametros por post
        var params = req.body;
        console.log(params);
        // Validar datos
        try {
            // el resultado de validateTitle sera true
            // cuando no este vacio params.title
            // buscar validaciones en web validator node
            var validateTitle = !validator.isEmpty(params.title);
            var validateContent = !validator.isEmpty(params.content);

        } catch (err) {
            return res.status(200).send({
                message: 'Faltan datos por enviar'
            });
        }

        if (validateTitle && validateContent) {
            // Crear el objeto a guardar
            var article = new Article();
            // Asginar valores al objeto
            article.title = params.title;
            article.content = params.content;
            if (article.image) {
                article.image = params.image;
            } else {
                article.image = null;
            }
            // Guardar el articulo
            article.save((err, articleStored) => {
                if (err || !articleStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El articulo no se guardo'
                    });
                }
                // Devolver una respuesta
                return res.status(200).send({
                    status: 'Success',
                    article: articleStored
                });
            });


        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos'
            });
        }


    },

    getArticles: (req, res) => {

        var query = Article.find({});

        var last = req.params.last;

        if (last || last != undefined) {
            // limite de datos en la consulta
            query.limit(3);
        }

        /* Find
         aqui se puede condicionar (if) fecha es ""
         si el valor es mayor o = a , etc
         en este caso Article.find se queda vacio por que quiere que arroje todo
         lo que tiene dentro
         */

        /* sort con este metodo se puede ordenar de forma ascendente
        en conjunto con el id con el menos por delante
        el resultado es del mas nuevo al mas viejo
        */
        query.sort('-_id').exec((err, articles) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver articulos'
                });
            }

            if (!articles) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos por mostrar'
                });
            }

            return res.status(200).send({
                status: 'Success',
                articles
            });
        });
    },
    // metodo para sacar solo un articulo en concreto
    getArticle: (req, res) => {

        // Recoger el id de la url
        var articleId = req.params.id;
        // Comprobar que existe
        if (!articleId || articleId == undefined) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe el articulo'
            });
        }
        // Buscar el articulo 
        Article.findById(articleId, (err, article) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los datos'
                });
            }

            if (!article) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el articulo'
                });
            }

            // Devolver una respuesta
            return res.status(200).send({
                status: 'Success',
                article
            });
        });
    },
    // actualizacion
    update: (req, res) => {
        // Recoger el id del articulo por la url
        var articleId = req.params.id;
        // Recoger los datos que llegan por put
        var params = req.body;
        //Validar los datos
        try {
            // cuando la variable title no este vacia validateTitle sera true
            var validateTitle = !validator.isEmpty(params.title);
            var validateContent = !validator.isEmpty(params.content);
        } catch (err) {
            return res.status(404).send({
                status: 'error',
                message: 'Faltan datos por enviar '
            });
        }

        if (validateTitle && validateContent) {
            //Hacer la consulta (find and update)
            // metodo busca uno y actualizalo
            // primero se le pasa el id del articulo que se quiere actualizar
            // despues params es un objeto con los datos que yo quiero actualziar
            // el parametro true que es de opciones el cual devuelve el objeto actualizado y no el anterior
            // y al ultimo una funcion de callback donde esta el error o el articulo actualizado
            Article.findOneAndUpdate({ _id: articleId }, params, { new: true }, (err, articleUpdated) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    });
                }
                if (!articleUpdated) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el articulo'
                    });
                }
                return res.status(200).send({
                    status: 'Success',
                    article: articleUpdated
                });
            });

        } else {
            // Devolver una respuesta
            return res.status(200).send({
                status: 'error',
                message: 'La validacion no es correcta'
            });
        }
    },
    delete: (req, res) => {
        // Recoger el id de la url
        var articleId = req.params.id;
        // find and delete
        Article.findOneAndDelete({ _id: articleId }, (err, articleRemoved) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar'
                });
            }
            if (!articleRemoved) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No se borro el articulo, talvez no existe'
                });
            }
            return res.status(200).send({
                status: 'Success',
                article: articleRemoved
            });
        });
    },

    upload: (req, res) => {
        // Configurar el connect multiparty routes/article
        // se configura para poder subir el archivo
        var file_name = "imagen no subida ...";
        // Recoger el fichero que se envia
        if (!req.files) {
            return res.status(404).send({
                status: 'error',
                message: 'No se encontro el archivo'
            });
        }
        // Conseguir el nombre y la extension del archivo
        // en esta variable se almacenara el path de la imagen
        var file_path = req.files.file0.path;
        console.log(file_path);
        // las barras dentro del parentesis varian segun el SO
        // split divide en trozos (la path, la extencion y el nombre de la imagen)
        // ademas se renombra la imagen para que
        // no se repita en el servidor
        // split sirve para separar dependiendo de lo que le coloques dentro de las comillas
        var file_split = file_path.split('/');
        // windows
        //  var file_split = file_path.split('\\');

        // Nombre del archivo del split son 3 pero empeza como 0,1 y 2
        // el nombre esta en la posicion 2
        var file_name = file_split[2];


        // Extension del fichero
        var extension_split = file_name.split('.');
        // en windows
        // var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];


        // Comprobar la extension (solo imagenes), si es valido borrar el fichero
        if (file_ext != 'jpg' && file_ext != 'png' && file_ext != 'gif' && file_ext != 'jpeg') {
            // borrar un archivo subido
            // buscar y subir el articulo
            fs.unlink(file_path, (err) => {
                return res.status(200).send({
                    status: 'error',
                    message: 'La extensión de la imagen no es válida'
                });
            });
        } else {
            // Si todo es valido
            var articleId = req.params.id;
            //   if (articleId) {
            // Buscar el articulo, asignarle un nombre y actualizarlo
            // al usar new true te arroja la version mas actual sin tener que refrescar
            Article.findOneAndUpdate({ _id: articleId }, { image: file_name }, { new: true }, (err, articleUpdated) => {
                if (err || !articleUpdated) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al guardar la imagen del articulo',
                        image: file_path
                    });
                }

                return res.status(200).send({
                    status: 'Success',
                    article: articleUpdated
                });
            });
            /*   } else {
                   return res.status(200).send({
                       status: 'Success',
                       image: file_name
                   });

               }*/

        }
    }, // end upload file

    // se saca el nombre del fichero a traves del url
    getImage: (req, res) => {

        // sacar fichero que llega por la url
        var file = req.params.image;
        // sacar la path completa del archivo
        var path_file = './upload/articles/' + file;
        // comprobar si el fichero existe
        fs.exists(path_file, (exists) => {
            if (exists) {
                // libreria que existe dentro de express
                // resolve sirve para resolver ruta y sacar el 
                // fichero como tal
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(404).send({
                    status: 'error',
                    message: 'La imagen no existe'
                });
            }
        });
    },

    search: (req, res) => {
        // Sacar el string a buscar
        var searchString = req.params.search;
        // Find or (para varias condiciones)
        // el or¿perador or de esta forma se usa en mongoose y/o mongoDB
        // corchetes de un array
        Article.find({
                "$or": [
                    // si el searchString esta incluido dentro del titulo o el content
                    // me va a sacar los articulos
                    { "title": { "$regex": searchString, "$options": "i" } },
                    { "content": { "$regex": searchString, "$options": "i" } }
                ]
            })
            .sort([
                ['date', 'descending']
            ])
            .exec((err, articles) => {

                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error en la peticion'
                    });
                }

                if (!articles || articles.length <= 0) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No hay articulos que coincidan con la busqueda'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    articles
                });
            });
        // con el sort se dan reglas para ordenas lo que se visualizara
        // en este caso es por la fecha y de forma descendente
        // con exec se ejecuta directamente el query con mongoDB
    }

}; // end controller


module.exports = controller;