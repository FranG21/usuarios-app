const express = require('express');
const Departamento = require('../modelo/departamento');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/departamento', async(req, res) => {

  const departamento = new Departamento(req.body);
  try {
    const dep = await departamento.save();
    res.status(201).send(dep);
  } catch (e) {
    res.status(400).send(e.message);
  }
})

router.patch('/departamento/modificar', auth, async(req, res) => {
  try {
    await Departamento.validarCampos(req.body);
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

router.get('/departamento', async(req, res) => {
  res.send(req.departamento);
})

module.exports = router
