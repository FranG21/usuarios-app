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

router.post('/usuario/loginface', async(req, res) => {
  try {
    const fc = fb.getLoginStatus(res)
    res.send(fc);
  } catch (e) {
    res.status(400).send(e.message);
  }
})
module.exports = router;
