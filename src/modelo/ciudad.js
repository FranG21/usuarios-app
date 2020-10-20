const bookshelf = require('../controlador/conexion');
const validator = require('validator');
const joi = require('joi')
const modelbase = require('bookshelf-modelbase')(bookshelf)

const ciudad = modelbase.extend({
  tableName: 'ciudad',
  hasTimestamps: false,
  initialize() {
    this.on('saving', async(model) => {

    })
  }
})

module.exports = ciudad
