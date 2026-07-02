require('dotenv').config();
const express = require('express');
const clienteController = require('./controllers/cliente.controllers')
const servicioController = require('./controllers/servicio.controllers');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const enrutamiento = require('./routes/enrutamiento.router')
app.use('/api/v1', enrutamiento);

app.set('view engine', 'ejs')

// servicios

app.get('/servicios', servicioController.listar);

app.get('/servicios/:nombre', servicioController.consultarServicio);

app.post('/servicios', servicioController.insert);

app.put('/servicios/:nombre', servicioController.update);

app.delete('/servicios/:nombre', servicioController.delete)

//clientes

app.get('/clientes', clienteController.listar);

app.get('/clientes/:correo', clienteController.consultarId);

app.post('/clientes', clienteController.insert);

app.put('/clientes/:correo', clienteController.update);

app.delete('/clientes/:correo', clienteController.delete);

app.listen(9800);