const express = require('express');
const Usuario = require('../modelo/usuario');
const Token = require('../modelo/token');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');
const router = express.Router();

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
router.patch('/usuario/modi', async(req, res) => {
  try {
    await Usuario.update(req.body, { id: 6 });
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
});

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
