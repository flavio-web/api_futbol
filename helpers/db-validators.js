const mongoose = require('mongoose');
const Usuario = require("../models/user");


const emailExiste = async ( email ) => {
    const validarEmail = await Usuario.findOne({ email });
    if( validarEmail ){
        throw new Error(`El email ${email} ya está registrado en la BD.`);
    }
}


const existeUsuarioById = async ( id ) => {

    if( mongoose.Types.ObjectId.isValid( id ) ){
        const existeId = await Usuario.findById( id );

        if( !existeId ){
            throw new Error(`El ID ${id} no existe en la BD.`);
        }
    }else{
        throw new Error(`El ID ${id} no es válido.`);
    }
}

module.exports = {
    emailExiste,
    existeUsuarioById
}