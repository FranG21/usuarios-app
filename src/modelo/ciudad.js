const bookshelf = require('../controlador/conexion');
const validator = require('validator');
const joi = require('joi');
const modelbase = require('bookshelf-modelbase')(bookshelf);

const ciudad = modelbase.extend({
  tableName: 'ciudad',
  hasTimestamps: false,
  initialize() {
    this.on('saving', async(model) => {

      const city = model.get('ciudad').toUpperCase();
      const existe = await ciudad.findOne({ ciudad: city }, { require: false });

      if (existe) {
        throw new Error('Ya existe una ciudad con este nombre');
      }
      model.set('ciudad', city);

    })
  }

})

module.exports = ciudad;
