const bookshelf = require('../controlador/conexion');
const validator = require('validator');
const joi = require('joi');
bookshelf.plugin(require('bookshelf-modelbase').pluggable)
  //const modelbase = require('bookshelf-modelbase')(bookshelf);
const Departamento = require('../modelo/departamento');

const Ciudad = bookshelf.model('Ciudad', {
  tableName: 'ciudad',
  hasTimestamps: false,
  departamento() {
    return this.belongsTo('Departamento', 'id_departamento')
  },
  initialize() {
    this.on('creating', async(model) => {

      const city = model.get('ciudad').toUpperCase();
      const existe = await Ciudad.findOne({ ciudad: city }, { require: false });

      if (existe) {
        throw new Error('Ya existe una ciudad con este nombre');
      }
      model.set('ciudad', city);

    })
  }

}, {
  validarCampos: async(ciudad) => {
    const existe = await Ciudad.findOne({ id: ciudad.id }, { require: false });

    if (!existe) {
      throw new Error('No se encuentra un resgristo con este ID');
    }

    const objDepartamento = await Departamento.findOne({ id: ciudad.id_departamento }, { require: false });

    console.log(objDepartamento)

    if (!objDepartamento) {
      throw new Error('No existe ningun departamento con este ID');
    }

    const city = ciudad.ciudad.toUpperCase();
    console.log(city)
    const objciudad = await Ciudad.findOne({ ciudad: city }, { require: false });

    if (objciudad && (ciudad.id !== objciudad.get('id'))) {
      throw new Error('Ya existe una ciudad con este nombre');
    }
  }
})

//visible:['campo1','campo2']
module.exports = Ciudad;
