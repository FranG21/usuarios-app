const bookshelf = require('../controlador/conexion');
const modelbase = require('bookshelf-modelbase')(bookshelf);

const InfoSalud = modelbase.extend({
  tableName: 'info_salud',
  hasTimestamps: false,
  initialize() {
    this.on('creating', async(model) => {
      const medicamento = model.get('medicacion')
      const alergias = model.get('alergias')

      if (medicamento === alergias) {
        throw new Error('La medicacion y las alegias deben de ser diferentes')
      }

    })
  }
}, {
  validarDatos: async(infoSalud) => {

    if (infoSalud.medicacion === infoSalud.alergias) {
      throw new Error('La medicacion y las alegias deben de ser diferentes')
    }
  }
})

module.exports = InfoSalud;
