const bookshelf = require('../controlador/conexion');
const modelbase = require('bookshelf-modelbase')(bookshelf);

const InfoSeguro = modelbase.extend({
  tableName: 'info_seguro',
  hasTimestamps: false,
  initialize() {
    this.on('saving', async(model) => {
      const num_identificador = model.get('num_identificador');
      const existe = await InfoSeguro.findOne({ num_identificador }, { require: false })

      if (existe) {
        throw new Error('Ya existe un usuario con este numero de identificador')
      }
    })
  }
})

module.exports = InfoSeguro;
