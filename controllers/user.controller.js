const { request, response } = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/user');

const userGet = ( req = request, res = response ) => {
    res.json({
      message: 'get - /usuario'
    });
}

const userById = ( req = request, res = response ) => {
    const id = req.params.id;
    res.json({
        id,
        message: 'get - /usuario/:id'
    });
}


const userPost = ( req = request, res = response ) =>{

    const { nombre, email, password, estado, isAdmin, imagen } = req.body;

    const usuario = new Usuario({ nombre, email, password, estado, isAdmin, imagen });

    //encriptar password
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt );

    //grabar usuario
    usuario.save();

    res.json({
        status: true,
        message: 'Usuario registrado correctamente.',
        result: { nombre, email, password, estado, isAdmin, imagen }
    });
}

module.exports = {
    userGet,
    userById,
    userPost
};