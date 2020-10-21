const bookshelf = require('../controlador/conexion');
const modelbase = require('bookshelf-modelbase')(bookshelf);

const Aseguradora = modelbase.extend({
  tableName: 'aseguradora',
  hasTimestamps: false,
  initialize() {
    this.on('saving', async(model) => {
      const aseguradora = model.get('aseguradora').toUpperCase();
      const existe = await Aseguradora.findOne({ aseguradora }, { require: false });

      if (existe) {
        throw new Error('Ya existe una aseguradora con este nombre')
      }
      model.set('aseguradora', aseguradora)
    })
  }
})

module.exports = Aseguradora;
