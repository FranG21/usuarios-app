const bookshelf = require('../controlador/conexion');
const validator = require('validator');
const modelbase = require('bookshelf-modelbase')(bookshelf);

const InfoUsuario = modelbase.extend({
  tableName: 'info_contacto',
  hasTimestamps: false,
  initialize() {
    this.on('saving', async(model) => {
      const telefono = model.get('telefono');
      const existe = await InfoUsuario.findOne({ telefono }, { require: false });

      console.log(validator.isMobilePhone(telefono, 'es-ES'))

      if (false) {
        throw new Error('No es un numero de telfono valido');
      } else if (existe) {
        throw new Error('Ya hay un usuario con este numero');
      }
    })
  }
})

module.exports = InfoUsuario;
