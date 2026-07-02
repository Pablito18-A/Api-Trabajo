const modeloCliente = require('../models/cliente.model');

exports.listar = async (req,res)=>{
  try {
    const clientes = await modeloCliente.find();
    console.log(clientes)
    res.render('pages/clientes', {clientes:clientes});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.consultarId = async (req, res) => {
  try {
    const clientes = await modeloCliente.find({email:req.params.correo});
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.insert = async (req, res,next) => {
  try {
    let clientesNuevo = {
      nombre: req.body.nombre,
      email: req.body.email,
      telefono: req.body.telefono
    }
    const clientes = await modeloCliente.insertOne(clientesNuevo);
    res.redirect('/api/v1/clientes')
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.update = async (req, res) => {
  try {
    // 1. Extraemos el correo de la URL (ej. /clientes/juan@email.com)
    const emailBuscar = req.params.correo; 
    
    // 2. Extraemos los nuevos datos que nos envía el frontend
    let datosActualizados = {
      nombre: req.body.nombre,
      telefono: req.body.telefono
    };

    // 3. Buscamos y actualizamos en la base de datos
    // IMPORTANTE: { new: true } le dice a Mongoose que te devuelva el dato YA modificado.
    const clienteActualizado = await modeloCliente.findOneAndUpdate(
      { email: emailBuscar },
      { $set: datosActualizados },
      { new: true } 
    );

    res.json(clienteActualizado); // Respondemos al frontend que todo salió bien
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


exports.delete = async (req, res) => {
  try {
    const emailBuscar = req.params.correo;
    console.log("Buscando en BD el email:", emailBuscar);
    const clientes = await modeloCliente.deleteOne(
      { email: emailBuscar }
    );
    console.log(emailBuscar)
    console.log("Resultado de la búsqueda:", clientes);
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.formulario = async (req, res) => {
  res.render('pages/formularioClientes', {mensaje:""})
}

exports.home = async (req, res) => {
  res.render('pages/home', {mensaje: ""})
}