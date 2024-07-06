const { request, response } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/user');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async( req = request, res = response ) => {

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ email });
        if( !usuario ){
            return res.status( 400 ).json({
                status: false,
                message: 'Usuario o contraseña incorrectos - email'
            });
        }

        //validar si el usuario esta activo
        if( !usuario.estado ){
            return res.status( 400 ).json({
                status: false,
                message: 'Usuario bloqueado o suspendido.'
            });
        }

        //validar contraseña
        const validarPassword = bcrypt.compareSync( password, usuario.password );
        if( !validarPassword ){
            return res.status( 400 ).json({
                status: false,
                message: 'Usuario o contraseña incorrectos - password'
            });
        }

        //generar el JWT (token)
        console.log(usuario.id);
        const token = await generarJWT( usuario.id );

        res.json({
            status: true,
            result: usuario,
            token
        });

        
    } catch (error) {
        console.log( error );
        return res.status( 500 ).json({
            status: false,
            message: 'Oops! Algo salió mal.'
        });
    }

}

const validarToken = async( req = request, res = respose ) => {
    const token = req.header('x-token');

    if( !token ){
        return res.status( 401 ).json({
            status: false,
            message: 'Debe enviar el token'
        });
    }

    try {

        const KEY = process.env.SECRET_KEY;
        const { uid } = jwt.verify( token, KEY );

        //leer el usuario que corresponde al uid
        const usuario = await Usuario.findById( uid );
        if( !usuario ){
            res.status( 401 ).json({
                status: false,
                message: 'Token no válido - usuario no existe en BD'
            });
        }

        //verificar que el usuario este activo
        if( !usuario.estado ){
            res.status( 401 ).json({
                status: false,
                message: 'Token no válido - usuario bloqueado o suspendido.'
            });
        }


        res.json({
            status: true,
            result: usuario,
            token,
            message: 'Token correcto'
        });

        
    } catch (error) {
        console.log( error );
        res.status( 500 ).json({
            status: false,
            message: 'Token no válido'
        });
    }
}

module.exports = {
    login,
    validarToken
}