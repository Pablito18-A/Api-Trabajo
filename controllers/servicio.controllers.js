const modeloServicio = require('../models/servicio.model');

exports.listar = async (req, res)=> {
    try {
        const servicios = await modeloServicio.find();
        res.render('pages/servicios', {servicios: servicios});
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}

exports.consultarServicio = async (req, res)=> {
    try {
        const servicios = await modeloServicio.findOne({nombre:req.params.nombre});
        console.log(servicios);
        res.json(servicios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.insert = async (req, res)=> {
    try {
        let nuevoServicio = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            duracionMinutos: req.body.duracionMin,
            precio: req.body.precio,
            categoria: req.body.categoria
        }
        const servicios = await modeloServicio.insertOne(nuevoServicio);
        console.log(nuevoServicio);
        console.log(servicios);
        res.json(servicios);
    } catch (error) {   
        res.status(500).json({ error: error.message });
    }
}

exports.update = async (req, res)=> {
    try {
        const nombreBuscar = req.params.nombre;

        let servicioActualizado = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            duracionMinutos: req.body.duracionMinutos,
            precio: req.body.precio,
            categoria: req.body.categoria
        };
        const servicios = await modeloServicio.findOneAndUpdate(
            { nombre: nombreBuscar },
            { $set: servicioActualizado },
            { new: true }
        );
        console.log("Resultado de la busqueda: ", servicios);
        res.json(servicios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.delete = async (req, res)=> {
    try {
        const nombreBuscar = req.params.nombre;
        console.log("Buscando en BD en el email: ", nombreBuscar);
        const servicios = await modeloServicio.deleteOne(
            { nombre: nombreBuscar }
        );
        res.json(servicios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.servicios = async (req, res) => {
    res.render('pages/servicios', {mensaje: ""})
}

exports.formulario = async (req, res) => {
    res.render('pages/formularioServicios')
}