const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false); /* forzamos a que los metodos antiguos se desactiven que solo funcionen los metodos actuales de la version de mongo */
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/api_rest_blog', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));