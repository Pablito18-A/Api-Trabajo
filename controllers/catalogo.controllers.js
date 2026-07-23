const modeloProducto = require('../models/producto.model');

exports.listar = async (req, res) => {
    try {
        const productos = await modeloProducto.find();
        
        res.render('pages/catalogo', {productos:productos});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}