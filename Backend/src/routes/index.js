const { Router } = require('express');
const router = Router();

const User = require('../models/User');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.send('hello')
});

router.post('/signup', async(req, res) => {
    const { email, password } = req.body;
    const newUser = new User({ email, password });
    await newUser.save();
    const token = await jwt.sign({ _id: newUser._id }, 'secretkey');
    res.status(200).json({ token });
});

router.post('/signin', async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).send('The email doen\' exists');
    if (user.password !== password) return res.status(401).send('Wrong Password');

    const token = jwt.sign({ _id: user._id }, 'secretkey');

    return res.status(200).json({ token });
});

router.get('/tasks', (req, res) => {
    res.json([{
            _id: '1',
            name: "task one",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '2',
            name: "task two",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '3',
            name: "task three",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
    ])
});

router.get('/private-tasks', verifyToken, (req, res) => {
    res.json([{
            _id: '1',
            name: "task one",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '2',
            name: "task two",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '3',
            name: "task three",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
    ])
});

async function verifyToken(req, res, next) {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send('Unauhtorized Request');
        }
        let token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            return res.status(401).send('Unauhtorized Request');
        }

        const payload = await jwt.verify(token, 'secretkey');
        if (!payload) {
            return res.status(401).send('Unauhtorized Request');
        }
        req.userId = payload._id;
        next();
    } catch (e) {
        //console.log(e)
        return res.status(401).send('Unauhtorized Request');
    }
}



/*ARTICLES*/

var articleController = require('../controllers/article');

// creando middleware para subida de imagenes
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: '../upload/articles' });

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