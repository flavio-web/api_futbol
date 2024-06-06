const express = require('express');

class Server{

    constructor(){
        this.app        = express();
        this.port       = process.env.PORT || 8080;
        
        this.userPath   = '/api/users';

        //middlewares
        this.middlewares();

        //rutas
        this.routes();

    }

    middlewares(){
        this.app.use( express.static('public') );
        this.app.use( express.json() );
    }

    routes(){
        this.app.use(this.userPath, require('../routes/user.route.js') );
    }


    listen(){
        this.app.listen( this.port, () => {
            console.log(`Api Futbol NodeJs - Express ejecutanose en el puerto: ${this.port}`)
        })
    }

}

module.exports = Server;