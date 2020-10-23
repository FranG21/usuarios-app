const bookshelf = require('../controlador/conexion');
bookshelf.plugin(require('bookshelf-modelbase').pluggable);

const Aseguradora = bookshelf.model('Aseguradora', {
  tableName: 'aseguradora',
  hasTimestamps: false,
  infoseguros() {
    return this.this.hasMany('InfoSeguro');
  },
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
