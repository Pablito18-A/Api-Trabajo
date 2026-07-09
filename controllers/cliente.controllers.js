const modeloCliente = require('../models/cliente.model');
const { sendEmail } = require('../services/email.service')

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
    const { nombre, email, telefono } = req.body

    let clientesNuevo = {
      nombre: req.body.nombre,
      email: req.body.email,
      telefono: req.body.telefono
    }

    const clientes = await modeloCliente.insertOne(clientesNuevo);
    const asunto = "Bienvenido a nuestro sistema";
    const mensaje = `Bienvenido ${nombre} al sistema de la ficha 3194107`
     await sendEmail(email, asunto, mensaje)
    res.redirect('/api/v1/clientes')
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.update = async (req, res) => {
  try {
    const emailBuscar = req.params.correo;
    const { nombre, telefono } = req.body

    let datosActualizados = {
      nombre: req.body.nombre,
      telefono: req.body.telefono
    };

    const asunto = "Actualizacion de datos exitosa";
    const mensaje = `Hola ${nombre}, te confirmamos que tus datos de contacto (Telefono: ${telefono}) han sido actualizados en nuestro sistema`;

    await sendEmail(emailBuscar, asunto, mensaje)

    const clienteActualizado = await modeloCliente.findOneAndUpdate(
      { email: emailBuscar },
      { $set: datosActualizados },
      { new: true } 
    );

    console.log(clienteActualizado)
    res.json(clienteActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


exports.delete = async (req, res) => {
  try {
    const emailBuscar = req.params.correo;
    console.log("Buscando en BD el email:", emailBuscar);
    const asunto = "Eliminaste tu cuenta con exito";
    const mensaje = `Eliminaste tu cuenta con el correo asociado ${emailBuscar}, espereamos que vuelvas :D`;

    await sendEmail(emailBuscar, asunto, mensaje);
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