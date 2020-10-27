const jwt = require('jsonwebtoken');
const Usuario = require('../../modelo/usuario');
const Departamento = require('../../modelo/departamento');
const Token = require('../../modelo/token');

const usuarioOne = {
  correo: 'frang@gmail.com',
  clave: 'francisco123456',
  token: ''
}

const usuarioTwo = {
  correo: 'david@gmail.com',
  clave: 'francisco',
}

const departamentoOne = {
  departamento: "usu"
}

const setupDatabase = async() => {
  await Token.where('id', '!=', 0).destroy({ require: false });
  await Usuario.where({ status: true }).destroy({ require: false });
  await Departamento.where('id', '!=', 0).destroy({ require: false });
  const user = await new Usuario({ correo: usuarioOne.correo, clave: usuarioOne.clave }).save();
  await new Usuario(usuarioTwo).save();
  await new Departamento(departamentoOne).save();
  const token = await Token.generarAuthToken(user);
  usuarioOne.token = '' + token.get('token');
}

module.exports = { usuarioOne, setupDatabase };
