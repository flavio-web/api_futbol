const { Schema, model  } = require('mongoose');

const UserSchema = Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre es obligatorio.' ]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

module.exports = model( 'Usuario', UserSchema );