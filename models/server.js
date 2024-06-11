const express = require('express');
const { dbConnection } = require('../database/config.js');

class Server{

    constructor(){
        this.app        = express();
        this.port       = process.env.PORT || 8080;
        
        this.userPath   = '/api/users';
        this.authPath   = '/api/auth';
        
        //conexion DB
        this.connectDB();

        //middlewares
        this.middlewares();

        //rutas
        this.routes();

    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use( express.static('public') );
        this.app.use( express.json() );
    }

    routes(){
        this.app.use(this.userPath, require('../routes/user.route.js') );
        this.app.use(this.authPath, require('../routes/auth.route.js') );
    }


    listen(){
        this.app.listen( this.port, () => {
            console.log(`Api Futbol NodeJs - Express ejecutanose en el puerto: ${this.port}`)
        })
    }

}

module.exports = Server;