// con ayuda de mongoose se modelan los datos que se van a estar guardando
// estructura de los usuarios, o lo que compondra a la tabla usuario

// metodo schema = modelo
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: String,
    password: String
}, {
    // con timestamp queda el registro de fechas de creacion
    // o modificacion de manera automatica
    timestamps: true
});
// el modelo recibe el nombre del modelo y el esquema en el que va 
// estar basado y con ello se podra guardar o consultar datos
module.exports = model('User', userSchema, 'users');