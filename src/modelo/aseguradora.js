const bookshelf = require('../controlador/conexion');
const modelbase = require('bookshelf-modelbase')(bookshelf);

const Aseguradora = modelbase.extend({
  tableName: 'aseguradora',
  hasTimestamps: false,
  initialize() {
    this.on('creating', async(model) => {
      const aseguradora = model.get('aseguradora').toUpperCase();
      const existe = await Aseguradora.findOne({ aseguradora }, { require: false });

      if (existe) {
        throw new Error('Ya existe una aseguradora con este nombre')
      }
      model.set('aseguradora', aseguradora)
    })
  }
}, {
  validarCampos: async(aseguradora) => {
    const existe = await Aseguradora.findOne({ id: aseguradora.id }, { require: false });

    if (!existe) {
      throw new Error('No se encuentra ningun resgristo con este ID');
    }

    const nomAseguradora = aseguradora.aseguradora.toUpperCase();
    const objaseguradora = await Aseguradora.findOne({ aseguradora: nomAseguradora }, { require: false });

    if (objaseguradora && (aseguradora.id !== objaseguradora.get('id'))) {
      throw new Error('Ya existe una aseguradora con este nombre');
    }
  }
})

module.exports = Aseguradora;
