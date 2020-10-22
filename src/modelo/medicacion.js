const bookshelf = require('../controlador/conexion');
const validator = require('validator');
const modelbase = require('bookshelf-modelbase')(bookshelf);

const medicacion = modelbase.extend({
  tableName: 'medicacion',
  hasTimestamps: false
    // initialize() {
    //   this.on('saving', async(model) => {

  //     const medicamento = model.get('medicamento').toUpperCase();
  //     const existe = await medicacion.findOne({ medicamento }, { require: false });

  //     if (existe) {
  //       throw new Error('Ya existe un medicamento con este nombre');
  //     }
  //     model.set('medicamento', medicamento);

  //   })
  // }

})

//medicacion.update({ medicamento: 'Prueba' }, { id: 4 })

module.exports = medicacion
