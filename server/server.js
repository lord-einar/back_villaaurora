// Carga de configuracion
require('./config/config');

//Carga de dependencias
const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const app = express();

//CORS

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Rutas
app.use(require('./routes/index'));

//Inicio del servidor
app.listen(process.env.PORT, () => {
    console.log('Escuchamdo en puerto', process.env.PORT);
});


//Inicio de la base de datos
mongoose.connect(process.env.DB, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE!!!');
});