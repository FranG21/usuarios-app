const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('./usuario');
const bookshelf = require('../controlador/conexion');
const modelbase = require('bookshelf-modelbase')(bookshelf);

const Token = modelbase.extend({
  tableName: 'token',
  hasTimestamps: false
}, {
  findByCredentials: async(correo, clave) => {
    //console.log(correo)
    const usuario = JSON.parse(JSON.stringify(await Usuario.findOne({ correo }, { require: false })));
    console.log(clave)
    if (!usuario) {
      throw new Error('No existe ningun usuario con este correo');
    }

    console.log(usuario.clave)

    const isMatch = await bcrypt.compare(clave, usuario.clave);
    console.log(usuario)
    if (!isMatch) {
      throw new Error('Verifique su correo y contraseña');
    }

    return usuario
  },
  generarAuthToken: async(usuario) => {
    const token = jwt.sign({ _id: usuario.id_usuario }, 'mitoken');
    const tokens = new Token({ token, id_usuario: usuario.id_usuario });

    await tokens.save();
    return tokens;
  }

})

module.exports = Token;
