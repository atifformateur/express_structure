//import du packet express
const express = require('express');

//crée l'application express
const app = express();

app.get('/test', (req, res)=>{
    console.log('route test ok');
    res.send('test de la route test ok');
})

//export app
module.exports = app;