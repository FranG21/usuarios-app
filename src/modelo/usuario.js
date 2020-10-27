const bookshelf = require('../controlador/conexion');
const validator = require('validator');
const InfoContacto = require('../modelo/info_contacto');
const bcrypt = require('bcryptjs');
bookshelf.plugin(require('bookshelf-modelbase').pluggable)

// const shema = joi.object({
//   correo: joi.string().required().pattern(new RegExp('/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i'))
// })

const Usuario = bookshelf.model('Usuario', {
  tableName: 'usuario',
  hasTimestamps: false,
  infocontacto() {
    return this.hasMany('InfoContacto');
  },
  initialize() {
    this.on('creating', async(model) => {
      const email = model.get('correo');
      const existe = await Usuario.findOne({ correo: email, status: true }, { require: false });

      if (existe) {
        throw new Error('Ya existe un usuario con esta direccion de correo');
      } else if (!validator.isEmail(email)) {
        throw new Error('Correo invalido');
      }

      model.set("status", true);
      model.set("clave", await bcrypt.hash(model.get('clave'), 8));
    })
  }

}, {
  validarCampos: async(usuario, id) => {

    const existe = await Usuario.findOne({ correo: usuario.email, status: true }, { require: false });

    if (existe && (id !== existe.get('id'))) {
      throw new Error('Ya existe un usuario con esta direccion de correo');

    } else if (!validator.isEmail(usuario.email)) {
      throw new Error('Correo invalido');
    }

  },
  existeUsuario: async(correo, clave) => {
    const existe = await Usuario.findOne({ correo, status: true }, { require: false })

    if (!existe) {
      const usuario = new Usuario({
        correo,
        clave
      });
      return await usuario.save();
    }

    return existe;
  }
})

//usuario.update({ clave: "12345" }, { id: 6 }).then()

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

module.exports = Usuario;
