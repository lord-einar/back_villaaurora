var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var registroSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    direccion: { type: String },
    telefono: { type: String, required: [true, "El teléfono es requerido"] },
    territorio: { type: Number, required: false },
    estado: { type: String, required: true, default: "Para llamar" },
    hermano: { type: String, required: false },
    observaciones: { type: String, required: false },
    activo: { type: Boolean, required: false }
});


module.exports = mongoose.model('Registro', registroSchema);