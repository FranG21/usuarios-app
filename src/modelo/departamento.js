const bookshelf = require('../controlador/conexion');
const validator = require('validator');
const joi = require('joi');
bookshelf.plugin(require('bookshelf-modelbase').pluggable);

const Departamento = bookshelf.model('Departamento', {
  tableName: 'departamento',
  hasTimestamps: false,
  municipios() {
    return this.hasMany('Ciudad');
  },
  initialize() {
    this.on('creating', async(model) => {

      const dep = model.get('departamento').toUpperCase();
      const existe = await Departamento.findOne({ departamento: dep }, { require: false });

      if (existe) {
        throw new Error('Ya existe un departamento con este nombre');
      }
      model.set('departamento', dep);

    })
  }
}, {
  validarCampos: async(departamento) => {

    const existe = await Departamento.findOne({ id: departamento.id }, { require: false });

    if (!existe) {
      throw new Error('No se encuentra ningun resgristo con este ID');
    }

    const dep = departamento.departamento.toUpperCase();
    const objdepartamento = await Departamento.findOne({ departamento: dep }, { require: false });

    if (objdepartamento && (departamento.id !== objdepartamento.get('id'))) {
      throw new Error('Ya existe un departamento con este nombre');
    }

  }
});

module.exports = Departamento;
