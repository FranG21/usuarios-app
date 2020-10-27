const jwt = require('jsonwebtoken');
const Usuario = require('../../modelo/usuario');
const Departamento = require('../../modelo/departamento');
const Ciudad = require('../../modelo/ciudad');
const Aseguradora = require('../../modelo/aseguradora');
const Token = require('../../modelo/token');

const usuarioOne = {
  id: 0,
  correo: 'frang@gmail.com',
  clave: 'francisco123456',
  token: ''
}

const usuarioTwo = {
  correo: 'david@gmail.com',
  clave: 'francisco',
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

const setupDatabase = async() => {
  await Token.where('id', '!=', 0).destroy({ require: false });
  await Usuario.where({ status: true }).destroy({ require: false });
  await Ciudad.where('id', '!=', 0).destroy({ require: false });
  await Departamento.where('id', '!=', 0).destroy({ require: false });
  await Aseguradora.where('id', '!=', 0).destroy({ require: false });

  const user = await new Usuario({ correo: usuarioOne.correo, clave: usuarioOne.clave }).save();
  await new Usuario(usuarioTwo).save();
  const token = await Token.generarAuthToken(user);
  usuarioOne.id = parseInt(user.get('id'));
  usuarioOne.token = '' + token.get('token');

  const objDepartamento = await new Departamento({ departamento: departamentoOne.departamento }).save();
  departamentoOne.id = parseInt(objDepartamento.get('id'));

  const objCiudad = await new Ciudad({ ciudad: ciudadOne.ciudad, id_departamento: departamentoOne.id }).save();
  ciudadOne.id = parseInt(objCiudad.get('id'));
  ciudadOne.id_departamento = departamentoOne.id;

  const objAseguradora = await new Aseguradora({ aseguradora: aseguradoraOne.aseguradora }).save();
  aseguradoraOne.id = parseInt(objAseguradora.get('id'));


}

module.exports = { usuarioOne, departamentoOne, ciudadOne, aseguradoraOne, setupDatabase };
