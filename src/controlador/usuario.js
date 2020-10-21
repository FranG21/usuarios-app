const express = require('express');
const Usuario = require('../modelo/usuario');
const Token = require('../modelo/token');
const auth = require('../middleware/auth')
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

router.patch('/usuario/me', auth, (req, res) => {
  res.send()
})

module.exports = router;
