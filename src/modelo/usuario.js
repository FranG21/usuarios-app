const bookshelf = require('../controlador/conexion');
const validator = require('validator');
const joi = require('joi');
const modelbase = require('bookshelf-modelbase')(bookshelf);

const shema = joi.object({
  correo: joi.string().required().pattern(new RegExp('/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i'))
})

const usuario = modelbase.extend({
  tableName: 'usuario',
  hasTimestamps: false,
  initialize() {
    this.on('saving', async(model) => {
      const email = model.get('correo');
      const existe = await usuario.findOne({ correo: email }, { require: false });

      if (existe) {
        throw new Error('Ya existe un usuario con esta direccion de correo');
      }
    })
  }

})

// usuario.create({
//   correo: 'aa',
//   clave: 'algo',
//   status: false
// }).then(() => {
//   return usuario.findOne({ correo: 'aa' });
// })

// // then(function () {
// //   return User.findOne({ firstName: 'Grayson' }, { require: true });
// // })

// usuario.count().then((count) => {
//   console.log(`Hay ${count} usaurios`);
// })

module.exports = usuario;
