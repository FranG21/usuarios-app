const bookshelf = require('../controlador/conexion');
const validator = require('validator');
bookshelf.plugin(require('bookshelf-modelbase').pluggable);
const Usuario = require('../modelo/usuario');

const InfoContacto = bookshelf.model('InfoContacto', {
  tableName: 'info_contacto',
  hasTimestamps: false,
  usuario() {
    return this.belongsTo('Usuario', 'id_usuario');
  },
  ciudad() {
    return this.belongsTo('Ciudad', 'id_ciudad');
  },
  initialize() {
    this.on('creating', async(model) => {
      const telefono = model.get('telefono');
      const existe = await InfoContacto.findOne({ telefono }, { require: false });

      console.log(validator.isMobilePhone(telefono, 'es-ES'))

      if (false) {
        throw new Error('No es un numero de telfono valido');
      } else if (existe) {
        throw new Error('Ya hay un usuario con este numero');
      }
    })
  }
}, {
  validarCampos: async(infoContacto, id) => {
    const telefono = infoContacto.telefono;
    const objInfo = await InfoContacto.findOne({ telefono }, { require: false });

    if (objInfo && (id !== objInfo.get('id_usuario'))) {
      throw new Error('Ya hay un usuario con este numero');
    }

  },
  validarUsuarioUnico: async(id_usuario) => {
    const existe = await InfoContacto.findOne({ id_usuario }, { require: false });

    if (existe) {
      throw new Error('Este usuario ya esta creado');
    }

  }
})

module.exports = InfoContacto;
