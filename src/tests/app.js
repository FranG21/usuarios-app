const express = require('express');
require('pg');
const routerAsegurada = require('./controlador/aseguradora')
const routerDepartamento = require('./controlador/departamento');
const routerCiudad = require('./controlador/ciudad');
const routerInfoContacto = require('./controlador/info_contacto');
const routerInfoSalud = require('./controlador/info_salud');
const routerInfoSeguro = require('./controlador/info_seguro');
const routerMedicacion = require('./controlador/medicacion');
const routerUsaurio = require('./controlador/usuario');
const app = express();

app.use(express.json());
app.use(routerDepartamento);
app.use(routerCiudad);
app.use(routerMedicacion);
app.use(routerUsaurio);
app.use(routerAsegurada);
app.use(routerInfoContacto);
app.use(routerInfoSalud);
app.use(routerInfoSeguro);

module.exports = app;
