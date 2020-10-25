const express = require('express');
const InfoSeguro = require('../modelo/info_seguro');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/info_seguro', auth, async(req, res) => {
  const infoSeguro = new InfoSeguro(req.body);

  try {
    await InfoSeguro.validarUsuarioUnico(req.user.get('id'));

    infoSeguro.set('id_usuario', req.user.get('id'));
    const info = await infoSeguro.save();
    res.status(201).send(info);
  } catch (e) {
    res.status(400).send(e.message);
  }
})

router.patch('/info_seguro/modificar', auth, async(req, res) => {
  try {
    await InfoSeguro.validarDatos(req.body, req.user.get('id'));
    const id = await InfoSeguro.findOne({ id_usuario: req.user.get('id') }, { require: false });

    await InfoSeguro.update({
      num_identificador: req.body.num_identificador,
      fecha_vigencia: req.body.fecha_vigencia,
      id_aseguradora: req.body.id_aseguradora
    }, { id: id.get('id') });

    res.send();
  } catch (e) {
    res.status(400).send(e.message);
  }
})

module.exports = router;
