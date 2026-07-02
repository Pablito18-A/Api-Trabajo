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

app.listen(9800);