const bookshelf = require('../controlador/conexion');
const validator = require('validator');
const joi = require('joi')
const modelbase = require('bookshelf-modelbase')(bookshelf)

const medicacion = modelbase.extend({
  tableName: 'medicacion',
  hasTimestamps: false,
  initialize() {
    this.on('saving', async(model) => {
      const medicamento = model.get('medicacion').toUpperCase()
      const existe = await medicacion.findOne({ medicacion: medicamento })

      if (existe) {

      }
    })
  }
})

module.exports = medicacion
