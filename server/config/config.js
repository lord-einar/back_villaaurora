//======================
//Puerto
//======================

process.env.PORT = process.env.PORT || 3000;

//======================
//Entorno
//======================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//======================
//Base de datos
//======================

let URLDB;

if (process.env.NODE_ENV == 'dev') {
    URLDB = 'mongodb://localhost/territorios';
} else {
    URLDB = process.env.BBDD;
}

process.env.DB = URLDB;