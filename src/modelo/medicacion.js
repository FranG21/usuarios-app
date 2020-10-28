const bookshelf = require('../controlador/conexion');
const validator = require('validator');
bookshelf.plugin(require('bookshelf-modelbase').pluggable);

const Medicacion = bookshelf.model('Medicacion', {
  tableName: 'medicacion',
  hasTimestamps: false,
  medicacion() {
    return this.this.hasMany('InfoSalud');
  },
  initialize() {
    this.on('creating', async(model) => {

      const medicamento = model.get('medicamento').toUpperCase();
      const existe = await Medicacion.findOne({ medicamento }, { require: false });

      if (existe) {
        throw new Error('Ya existe un medicamento con este nombre');
      }
      model.set('medicamento', medicamento);

    });
  }

}, {
  validarCampos: async(id, medicamento) => {
    const existe = await Medicacion.findOne({ id }, { require: false });

    if (!existe) {
      throw new Error('No se encuentra ningun resgristo con este ID');
    }

    const nomMedicamento = medicamento.medicamento.toUpperCase();
    const objMedicamento = await Medicacion.findOne({ medicamento: nomMedicamento }, { require: false });

    if (objMedicamento && (id !== objMedicamento.get('id'))) {
      throw new Error('Ya existe un medicamento con este nombre');
    }
  }
});

module.exports = Medicacion;
