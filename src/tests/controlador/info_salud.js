const express = require('express');
const InfoSalud = require('../modelo/info_salud');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/info_salud', async(req, res) => {
  const infoSalud = new InfoSalud(req.body);

  try {
    await InfoSalud.validarUsuarioUnico(req.user.get('id'));

    infoSalud.set('id_usuario', req.user.get('id'));
    const info = await infoSalud.save();

    res.status(201).send(info);
  } catch (e) {
    res.status(400).send(e.message);
  }

})

router.patch('/info_salud/modificar', auth, async(req, res) => {
  try {
    await InfoSalud.validarDatos(req.body)
    const id = await InfoSalud.findOne({ id_usuario: req.user.get('id') }, { require: false })
    console.log(id)
    await InfoSalud.update({
      condiciones: req.body.condiciones,
      alergias: req.body.alergias,
      medicacion: req.body.medicacion
    }, { id: id.get('id') });

    res.send();
  } catch (e) {
    res.status(400).send(e.message);
  }
})

module.exports = router;
