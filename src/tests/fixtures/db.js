const jwt = require('jsonwebtoken');
const Usuario = require('../../modelo/usuario');
const Departamento = require('../../modelo/departamento');
const Token = require('../../modelo/token');

const usuarioOne = {
  correo: 'frang@gmail.com',
  clave: 'francisco123456'
}

const usuarioTwo = {
  correo: 'david@gmail.com',
  clave: 'francisco'
}

const departamentoOne = {
  departamento: "usu"
}

const setupDatabase = async() => {
  await Usuario.where({ status: true }).destroy();
  await Departamento.where('id', '!=', 0).destroy();
  await new Usuario(usuarioOne).save();
  await new Usuario(usuarioTwo).save();
  await new Departamento(departamentoOne).save();

}

module.exports = { setupDatabase };
