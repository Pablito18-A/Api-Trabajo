const express = require('express')
const router = express.Router();
const clienteController = require('../controllers/cliente.controllers')
const servicioController = require('../controllers/servicio.controllers')
const usuarioController = require('../controllers/usuario.controllers')

router.get('/', clienteController.home)

router.get('/formulario', clienteController.formulario) 

router.get('/formularioServicios', servicioController.formulario) 

router.get('/landingpage', usuarioController.landingpage)

// servicios

router.get('/servicios', servicioController.listar);
router.get('/servicios/:nombre', servicioController.consultarServicio);
router.post('/servicios', servicioController.insert);
router.put('/servicios/:nombre', servicioController.update)
router.delete('/servicios/:nombre', servicioController.delete)

// clientes

router.get('/clientes', clienteController.listar)
router.get('/clientes/:correo', clienteController.consultarId)
router.post('/clientes', clienteController.insert)
router.put('/clientes/:correo', clienteController.update)
router.delete('/clientes/:correo', clienteController.delete)

router.post('/enviar', usuarioController.contactar)

module.exports = router;