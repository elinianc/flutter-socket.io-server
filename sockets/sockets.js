const { io } = require('../index') ;
const Band = require('../Models/band');

const Bands = require('../models/bands') ;

const bands = new Bands() ;

bands.addBand( new Band('Queen') ) ;
bands.addBand( new Band('Bon Jovi') ) ;
bands.addBand( new Band('Heroes del Silencio') ) ;
bands.addBand( new Band('Meatllica') ) ;
bands.addBand( new Band('Iron maiden') ) ;
//console.log(bands);

// Mensajes de  Sockets
io.on('connection', client => {

    console.log('Cliente conectadazzooo'); 

    client.emit('active-bands', bands.getBand() ) ;

    // client.on('event', data => { /* … */ });
  client.on('disconnect', () => { 
      console.log('Cliente desconectado'); 
    } );

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload );

        io.emit( 'mensaje', { admin: 'Nuevo mensaje'})
    }) ;

    client.on('vote-band', (payload) => {
        
        bands.voteBand( payload.id) ;
        io.emit('active-bands', bands.getBand() ) ;

    }) ;

    client.on('add-band', (payload) => {
        const newBand = new Band(payload.name) ;
        bands.addBand(newBand) ;
        io.emit('active-bands', bands.getBand() ) ;

    }) ;

    client.on('delete-band', (payload) => {
        
        bands.deleteBands( payload.id) ;
        io.emit('active-bands', bands.getBand() ) ;

    }) ;

} ) ;
