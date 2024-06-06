const { request, response } = require('express');

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

module.exports = {
    userGet,
    userById
};