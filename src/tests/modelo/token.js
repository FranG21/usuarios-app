const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('./usuario');
const bookshelf = require('../controlador/conexion');
bookshelf.plugin(require('bookshelf-modelbase').pluggable)

const Token = bookshelf.model('Token', {
  tableName: 'token',
  hasTimestamps: false
}, {
  findByCredentials: async(correo, clave) => {
    const usuario = JSON.parse(JSON.stringify(await Usuario.findOne({ correo }, { require: false })));

    if (!usuario) {
      throw new Error('No existe ningun usuario con este correo');
    }

    const isMatch = await bcrypt.compare(clave, usuario.clave);
    console.log(usuario)
    if (!isMatch) {
      throw new Error('Verifique su correo y contraseña');
    }

    return usuario
  },
  generarAuthToken: async(usuario) => {

    const token = jwt.sign({ _id: usuario.id }, 'mitoken');
    const tokens = new Token({ token, id_usuario: usuario.id });

    await tokens.save();
    return tokens;
  }

})

module.exports = Token;
