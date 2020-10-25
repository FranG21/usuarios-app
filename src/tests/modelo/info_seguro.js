const bookshelf = require('../controlador/conexion');
bookshelf.plugin(require('bookshelf-modelbase').pluggable);

const InfoSeguro = bookshelf.model('InfoSeguro', {
  tableName: 'info_seguro',
  hasTimestamps: false,
  aseguradora() {
    return this.belongsTo('Aseguradora', 'id_aseguradora');
  },
  initialize() {
    this.on('creating', async(model) => {
      const num_identificador = model.get('num_identificador');
      const existe = await InfoSeguro.findOne({ num_identificador }, { require: false })

      if (existe) {
        throw new Error('Ya existe un usuario con este numero de identificador')
      }
    })
  }
}, {
  validarDatos: async(infoSeguro, id) => {
    const num_identificador = infoSeguro.num_identificador

    const objInfo = await InfoSeguro.findOne({ num_identificador }, { require: false })

    if (objInfo && (id !== objInfo.get('id_usuario'))) {
      throw new Error('Ya existe un usuario con este numero de identificador')
    }
    console.log('otro punto')
  },
  validarUsuarioUnico: async(id) => {
    const existe = await InfoSeguro.findOne({ id_usuario: id }, { require: false });

    if (existe) {
      throw new Error('Este usuario ya esta creado');
    }
  }
})

module.exports = InfoSeguro;
