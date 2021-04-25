
const { Console } = require('console');
const express = require('express') ;
const path = require('path') ; 

// Establece variables de entorno
require('dotenv').config() ;

// App de Express
const app = express() ;

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./sockets/sockets') ;

//server.listen(3000);


// Path público
const publicPath = path.resolve( __dirname, 'public') ;

app.use( express.static( publicPath ) ) ;

server.listen( process.env.PORT, (err) => {
    
    if (err) throw new Error(err) ;

    console.log('Primer Servidor corriendo en puerto', process.env.PORT);

} ) ;