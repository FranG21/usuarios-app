const bookshelf = require('../controlador/conexion');
const validator = require('validator');
const joi = require('joi')
const modelbase = require('bookshelf-modelbase')(bookshelf)

const departamento = modelbase.extend({
  tableName: 'departamento',
  hasTimestamps: false,
  initialize() {
    this.on('saving', async(model) => {

      const dep = model.get('departamento').toUpperCase()
      const existe = await departamento.findOne({ departamento: dep }, { require: false })

      console.log(existe)
      if (existe) {
        throw new Error('Ya existe un departamento con este nombre')
      }
      model.set('departamento', dep)

    })
  }
})

const buscar = async(dep) => {
  const buscar = await departamento.findOne({ departamento: dep })
  const algo = JSON.parse(JSON.stringify(buscar))
  console.log(algo.departamento)
  return buscar
}

buscar('SANTA ANA')


module.exports = departamento
