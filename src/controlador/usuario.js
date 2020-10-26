const express = require('express');
const Usuario = require('../modelo/usuario');
const InfoSalud = require('../modelo/info_salud');
const InfoContacto = require('../modelo/info_contacto');
const InfoSeguro = require('../modelo/info_seguro');
const Token = require('../modelo/token');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');
const bcrypt = require('bcryptjs');
const router = express.Router();
const request = require('request-promise');
fb = require('../middleware/oauth');

router.post('/usuario', async(req, res) => {

  const usuario = new Usuario(req.body);
  try {
    const user = await usuario.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
})

router.post('/usuario/login', async(req, res) => {
  try {
    const user = await Token.findByCredentials(req.body.correo, req.body.clave);
    const token = await Token.generarAuthToken(user);
    res.send(token);
  } catch (e) {
    res.status(400).send(e.message);
  }
})

router.post('/usuario/logout', auth, async(req, res) => {
  try {
    const token = await Token.findOne({ token: req.token }, { require: false })
    await Token.where({ token: req.token }).destroy();
    res.send();
  } catch (e) {
    res.status(400).send(e.message);
  }
})

router.get('/usuario/oauth/facebook', async(req, res) => {
  const url = 'https://www.facebook.com/v4.0/dialog/oauth?client_id=3402313643181496&redirect_uri=http://localhost:3000/usuario/login/facebook&scope=email&response_type=code&auth_type=rerequest';
  res.send({ url })
})

router.get('/usuario/login/facebook', async(req, res) => {
  const url = 'https://graph.facebook.com/v8.0/oauth/access_token?client_id=' + process.env.CLIENTE_ID + '&redirect_uri=http://localhost:3000/usuario/login/facebook' + '&client_secret=' + process.env.CLIENTE_SECRETO + '&code=' + req.query.code;
  try {
    const tokenAccess = await request({ url, json: true });
    const urlTwo = 'https://graph.facebook.com/me?fields=id,name,email&access_token=' + tokenAccess.access_token;
    const datosUsuario = await request({ url: urlTwo, json: true })

    const usuarioToken = await Usuario.existeUsuario(datosUsuario.email, datosUsuario.id);
    const token = await Token.generarAuthToken(usuarioToken);
    res.send({ datosUsuario, token });
  } catch (e) {

  }

})

const upload = multer({
  limits: {
    fileSize: 10000000
  },
  fileFilter(req, file, cb) {

    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Archivo debe ser formato de imagen unicamente'));
    }
    cb(undefined, true);
  }
})

router.patch('/usuario/modificar', auth, async(req, res) => {
  try {
    await Usuario.validarCampos(req.body, req.user.id);
    const clave = await bcrypt.hash(req.body.clave, 8);

    await Usuario.update({ correo: req.body.email, clave }, { id: req.user.id });

    res.send();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.patch('/usuario/eliminar', auth, async(req, res) => {
  try {

    await Usuario.update({ status: false }, { id: req.user.id });
    await Token.where({ id_usuario: req.user.id }).destroy();

    res.send();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


router.get('/usuario/lista', auth, async(req, res) => {
  try {

    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;

    const lista = await Usuario.collection().query('where', 'status', '=', true).fetchPage({
      pageSize,
      page
    })
    res.send({ lista, pagination: lista.pagination });
  } catch (e) {

  }
})

router.get('/usuario/lista/:id', auth, async(req, res) => {
  try {

    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;

    const lista = await Usuario.where({ id: req.params.id, status: true }).fetchPage({
      pageSize,
      page
    })
    res.send({ lista, pagination: lista.pagination });
  } catch (e) {

  }
})

router.get('/usuario/me', auth, async(req, res) => {
  try {

    console.log(req.user.get('id'))
    const usuario = await Usuario.where({ id: req.user.get('id'), status: true }).fetch()

    const infoContacto = await InfoContacto.where({ id_usuario: req.user.get('id') }).fetch({
      withRelated: ['ciudad']
    })

    const infoSalud = await InfoSalud.where({ id_usuario: req.user.get('id') }).fetch({
      withRelated: ['medicacion', 'alergia']
    });
    const infoSeguro = await InfoSeguro.where({ id_usuario: req.user.get('id') }).fetch({
      withRelated: ['aseguradora']
    });

    res.send({ usuario, infoContacto, infoSalud, infoSeguro });
  } catch (e) {
    res.send(e)
  }
})

router.post('/usuario/avatar', auth, upload.single('avatar'), async(req, res) => {
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
  req.user.set('foto', buffer);

  await Usuario.update({ foto: buffer }, { id: req.user.get('id') });
  res.send();
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message });
})



//Despues lo borras
router.get('/users/:id/avatar', async(req, res) => {
  try {
    const user = await Usuario.findOne({ id: req.params.id }, { require: false })

    if (!user || !user.get('foto')) {
      throw new Error()
    }

    res.set('Content-Type', 'image/jpg')
    res.send(user.get('foto'))
  } catch (e) {
    res.status(404).send()
  }
})


module.exports = router;
