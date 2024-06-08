const mongoose = require('mongoose');
const Usuario = require("../models/user");


const emailExiste = async ( email ) => {
    const validarEmail = await Usuario.findOne({ email });
    if( validarEmail ){
        throw new Error(`El email ${email} ya está registrado en la BD.`);
    }
}

module.exports = {
    emailExiste
}