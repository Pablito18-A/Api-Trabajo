const mongoose = require('../config/connectiondb');

const usuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: [true, 'El correo debe ser unico']
    },
    password: {
        type: String,
        trim: true,
        mixLength: [7, 'Ingresaste una contraseña muy corta']
    },
    rol:{
        type: String,
        default: 'invitado',
        enum: ['cliente', 'empleado', 'administrador']
    }
},{versionKey:false});


module.exports = mongoose.model('usuario', usuarioSchema);