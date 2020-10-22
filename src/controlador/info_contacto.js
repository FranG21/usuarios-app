const express = require('express');
const InfoContacto = require('../modelo/info_contacto');
const auth = require('../middleware/auth');
const router = new express.Router();


router.post('/info_contacto', async(req, res) => {
  const infoContacto = new InfoContacto(req.body);
  try {
    const info = await infoContacto.save();
    res.status(201).send(info);
  } catch (e) {
    res.status(400).send(e.message);
  }
})

router.patch('/info_contacto/modificar', auth, async(req, res) => {
  try {
    await InfoContacto.validarCampos(req.body, req.user.get('id'));
    const id = await InfoContacto.findOne({ id_usuario: req.user.get('id') }, { require: false });

    await InfoContacto.update({
      telefono: req.body.telefono,
      direccion: req.body.direccion,
      id_ciudad: req.body.id_ciudad
    }, { id: id.get('id') });

    res.send()
  } catch (e) {
    res.status(400).send(e.message);
  }
})

module.exports = router;
