const jwt = require('jsonwebtoken');
const Usuario = require('../../modelo/usuario');
const Departamento = require('../../modelo/departamento');
const Ciudad = require('../../modelo/ciudad');
const Aseguradora = require('../../modelo/aseguradora');
const Medicacion = require('../../modelo/medicacion');
const InfoContacto = require('../../modelo/info_contacto');
const InfoSeguro = require('../../modelo/info_seguro');
const InfoSalud = require('../../modelo/info_salud');
const Token = require('../../modelo/token');

const usuarioOne = {
  id: 0,
  correo: 'frang@gmail.com',
  clave: 'francisco123456',
  token: ''
}

const usuarioTwo = {
  id: 0,
  correo: 'david@gmail.com',
  clave: 'francisco',
  token: ''
}

const departamentoOne = {
  id: 0,
  departamento: "usulutan"
}

const ciudadOne = {
  id: 0,
  ciudad: 'apaneca',
  id_departamento: 0
}

const aseguradoraOne = {
  id: 0,
  aseguradora: 'REPUESTOS'
}

const medicamentoOne = {
  id: 0,
  medicamento: 'Acetaminofen'
}

const medicamentoTwo = {
  id: 0,
  medicamento: 'aspirina'
}

const infoContactoOne = {
  id: 0,
  direccion: "Canton las venturas",
  telefono: "2362-4211",
  id_ciudad: 0
}

const infoSeguroOne = {
  id: 0,
  num_identificador: 22122,
  fecha_vigencia: "2020-12-10",
  id_aseguradora: 0
}

const infoSaludOne = {
  id: 0,
  condiciones: "dolor",
  medicacion: 0,
  alergias: 0
}


const setupDatabase = async() => {
  await Token.where('id', '!=', 0).destroy({ require: false });
  await InfoContacto.where('id', '!=', 0).destroy({ require: false });
  await InfoSeguro.where('id', '!=', 0).destroy({ require: false });
  await InfoSalud.where('id', '!=', 0).destroy({ require: false });
  await Usuario.where({ status: true }).destroy({ require: false });
  await Ciudad.where('id', '!=', 0).destroy({ require: false });
  await Departamento.where('id', '!=', 0).destroy({ require: false });
  await Aseguradora.where('id', '!=', 0).destroy({ require: false });
  await Medicacion.where('id', '!=', 0).destroy({ require: false });

  const user = await new Usuario({ correo: usuarioOne.correo, clave: usuarioOne.clave }).save();
  const token = await Token.generarAuthToken(user);
  usuarioOne.id = parseInt(user.get('id'));
  usuarioOne.token = '' + token.get('token');

  const user2 = await new Usuario({ correo: usuarioTwo.correo, clave: usuarioTwo.clave }).save();
  const token2 = await Token.generarAuthToken(user2);
  usuarioTwo.id = parseInt(user2.get('id'));
  usuarioTwo.token = '' + token2.get('token');

  const objDepartamento = await new Departamento({ departamento: departamentoOne.departamento }).save();
  departamentoOne.id = parseInt(objDepartamento.get('id'));

  const objCiudad = await new Ciudad({ ciudad: ciudadOne.ciudad, id_departamento: departamentoOne.id }).save();
  ciudadOne.id = parseInt(objCiudad.get('id'));
  ciudadOne.id_departamento = departamentoOne.id;

  const objAseguradora = await new Aseguradora({ aseguradora: aseguradoraOne.aseguradora }).save();
  aseguradoraOne.id = parseInt(objAseguradora.get('id'));

  const objMedicamentoOne = await new Medicacion({ medicamento: medicamentoOne.medicamento }).save();
  medicamentoOne.id = parseInt(objMedicamentoOne.get('id'));
  const objMedicamentoTwo = await new Medicacion({ medicamento: medicamentoTwo.medicamento }).save();
  medicamentoTwo.id = parseInt(objMedicamentoTwo.get('id'));

  infoContactoOne.id_ciudad = ciudadOne.id;
  const objInfoContacto = await new InfoContacto({
    telefono: infoContactoOne.telefono,
    direccion: infoContactoOne.direccion,
    id_ciudad: infoContactoOne.ciudad,
    id_usuario: usuarioOne.id
  }).save();
  infoContactoOne.id = parseInt(objInfoContacto.get('id'));

  infoSeguroOne.id_aseguradora = aseguradoraOne.id;
  const objInfoSeguro = await new InfoSeguro({
    num_identificador: 21111,
    fecha_vigencia: "2020-10-10",
    id_aseguradora: infoSeguroOne.id_aseguradora
  }).save();
  infoSeguroOne.id = parseInt(objInfoSeguro.get('id'));

  infoSaludOne.medicacion = medicamentoOne.id;
  infoSaludOne.alergias = medicamentoTwo.id;

  const objInfoSalud = await new InfoSalud({
    condiciones: "mal estar",
    medicacion: infoSaludOne.medicacion,
    alergias: infoSaludOne.alergias,
    id_usuario: usuarioOne.id
  }).save();
  infoSaludOne.id = parseInt(objInfoSalud.get('id'));
}

module.exports = {
  usuarioOne,
  usuarioTwo,
  infoContactoOne,
  infoSeguroOne,
  infoSaludOne,
  departamentoOne,
  ciudadOne,
  aseguradoraOne,
  medicamentoOne,
  medicamentoTwo,
  setupDatabase
};
