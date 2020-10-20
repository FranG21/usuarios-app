const bookshelf = require('../controlador/conexion');
const validator = require('validator');
const joi = require('joi')
const modelbase = require('bookshelf-modelbase')(bookshelf)

// const departamento = bookshelf.Model.extend({
//   tableName: 'departamento'
// })

const shema = joi.object({
  correo: joi.string().required().pattern(new RegExp('/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i'))
})

const usuario = modelbase.extend({
  tableName: 'usuario',
  hasTimestamps: false
})

usuario.create({
  correo: 'aa',
  clave: 'algo',
  status: false
}).then(() => {
  return usuario.findOne({ correo: 'aa' });
})

// then(function () {
//   return User.findOne({ firstName: 'Grayson' }, { require: true });
// })

usuario.count().then((count) => {
  console.log(`Hay ${count} usaurios`);
})

//module.exports = departamento;
