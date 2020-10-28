const bookshelf = require('../controlador/conexion');
bookshelf.plugin(require('bookshelf-modelbase').pluggable);

const InfoSalud = bookshelf.model('InfoSalud', {
  tableName: 'info_salud',
  hasTimestamps: false,
  medicacion() {
    return this.belongsTo('Medicacion', 'medicacion');
  },
  alergia() {
    return this.belongsTo('Medicacion', 'alergias');
  },
  initialize() {
    this.on('creating', async(model) => {

      const medicamento = model.get('medicacion');
      const alergias = model.get('alergias');

      if (medicamento === alergias) {
        throw new Error('La medicacion y las alegias deben de ser diferentes');
      }

    });
  }
}, {
  validarDatos: async(infoSalud) => {

    if (infoSalud.medicacion === infoSalud.alergias) {
      throw new Error('La medicacion y las alegias deben de ser diferentes');
    }
  },
  validarUsuarioUnico: async(id) => {
    const existe = await InfoSalud.findOne({ id_usuario: id }, { require: false });

    if (existe) {
      throw new Error('Este usuario ya esta creado');
    }
  }
});

module.exports = InfoSalud;
