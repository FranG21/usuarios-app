const express = require('express');
const Aseguradora = require('../modelo/aseguradora');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/aseguradora', async(req, res) => {
  const aseguradora = new Aseguradora(req.body);
  try {
    const objAseguradora = await aseguradora.save();
    res.status(201).send(objAseguradora);
  } catch (e) {
    res.status(400).send(e.message);
  }
})

router.patch('/aseguradora/modificar', auth, async(req, res) => {
  try {
    await Aseguradora.validarCampos(req.body);

    await Aseguradora.update({ aseguradora: req.body.aseguradora.toUpperCase() }, { id: req.body.id });

    res.send();
  } catch (e) {
    res.status(400).send(e.message);
  }
})

module.exports = router;
