const express = require('express');
const app = express();

const Registro = require('../models/registro');

app.get('/', () => {
    res.json({
        msg: "Hola mundo"
    })
})
//================================
// Mostrar todos los registros
//================================
app.get('/registros', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 7;
    limite = Number(limite);

    Registro.find({})
        .exec((err, registros) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Registro.countDocuments({}, (err, conteo) => {

                res.json({
                    registros,
                    conteo
                });

            });

        });

});




//================================
// Mostrar TERRITORIOS
//================================
app.get('/territorios', (req, res) => {

    Registro.aggregate().group({ _id: "$territorio", conteo: { $sum: 1 } })
        .sort("_id")
        .exec((err, lista) => {
            res.json({
                lista
            });
        });
});



//================================
// Mostrar registros por territorio
//================================
app.get('/registros/territorio/:valor', (req, res) => {

    let valor = req.params.valor;

    Registro.find({ territorio: valor })
        .exec((err, registroDB) => {


            if (!registroDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "No se encontró el territorio"
                    }
                });
            }

            res.json({
                registroDB
            });
        });
});

//================================
// Mostrar registros por estado
//================================
app.get('/registros/estado/:valor', (req, res) => {

    let valor = req.params.valor;

    Registro.find({ estado: valor })
        .exec((err, registroDB) => {


            if (!registroDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "No se encontró el territorio"
                    }
                });
            }

            res.json({
                ok: true,
                registroDB
            });
        });
});

//================================
// Mostrar un registro por ID
//================================
app.get('/registros/buscarbyid/:id', (req, res) => {

    let id = req.params.id;

    Registro.find({ _id: id })
        .exec((err, registroDB) => {


            if (!registroDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "No se encontró el registro"
                    }
                });
            }

            res.json({
                registroDB
            });
        });
});

// app.post('/usuarios', [verificarToken, verificarAdminRole], (req, res) => {

//     let body = req.body;

//     let usuario = new Usuario({
//         nombre: body.nombre,
//         email: body.email,
//         password: bcrypt.hashSync(body.password, 10),
//         role: body.role
//     });

//     usuario.save((err, usuarioDB) => {
//         if (err) {
//             return res.status(400).json({
//                 ok: false,
//                 err
//             });
//         }

//         res.json({
//             ok: true,
//             usuario: usuarioDB
//         });
//     });


// });

//================================
// Actualizar un registro por ID
//================================
app.put('/registros/:id', (req, res) => {

    let id = req.params.id;
    console.log(req.body);
    let body = {
        territorio: req.body.territorio,
        estado: req.body.estado,
        hermano: req.body.hermano || "",
        observaciones: req.body.observaciones || "",
        activo: req.body.activo || true
    };

    Registro.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, registroDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            Registro: registroDB
        });
    });



});

// app.delete('/usuarios/:id', [verificarToken, verificarAdminRole], (req, res) => {

//     let id = req.params.id;
//     let cambiaEstado = {
//         estado: false
//     };

//     Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true, context: 'query' }, (err, usuarioBorrado) => {

//         if (err) {
//             return res.status(400).json({
//                 ok: false,
//                 err
//             });
//         }

//         if (!usuarioBorrado) {
//             return res.status(400).json({
//                 ok: false,
//                 error: {
//                     message: 'Mensaje no encontrado'
//                 }
//             });
//         }

//         res.json({
//             mesage: 'Usuario deshabilitado',
//             usuario: usuarioBorrado
//         });
//     });
// });


module.exports = app;