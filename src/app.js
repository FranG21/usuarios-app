const express = require('express');
require('pg');
const routerDepartamento = require('./controlador/departamento');
const routerCiudad = require('./controlador/ciudad')
const routerMedicacion = require('./controlador/medicacion')
const app = express();

app.use(express.json());
app.use(routerDepartamento);
app.use(routerCiudad);
app.use(routerMedicacion);

module.exports = app;
