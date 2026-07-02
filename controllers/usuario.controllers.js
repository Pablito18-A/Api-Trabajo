const modeloUsuario = require('../models/usuario.model');
const servicioEmail = require('../services/email.service')


exports.listar = async (req,res)=>{
  try {
    const usuarios = await modeloUsuario.find();
    res.render('pages/usuario', {usuario:usuario});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.insert = async (req, res) => {
  try {
    let usuarioNuevo = {
      email: req.body.email,
      password: req.body.password,
      rol: req.body.rol
    }
    const usuario = await modeloUsuario.insertOne(usuarioNuevo);
    res.render('pages/usuario', {mensaje:"Registrado exitosamente"})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.landingpage = async (req,res)=>{
  try {
    const usuarios = await modeloUsuario.find();
    res.render('pages/landingpage', );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.contactar = async (req, res)=>{
    const asunto = req.body.asunto
    const destinatario = req.body.mail
    const coment = req.body.comment
    servicioEmail.sendEmail(destinatario, asunto, coment)
}