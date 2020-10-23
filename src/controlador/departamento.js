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

    await Departamento.update({ departamento: req.body.departamento.toUpperCase() }, { id: req.body.id });

    res.send();
  } catch (e) {
    res.status(400).send(e.message);
  }
})

router.get('/departamento/lista', auth, async(req, res) => {
  try {
    const lista = await Departamento.collection().fetchPage({
      pageSize: 10,
      page: 1
    })
    res.send(lista);
  } catch (e) {

  }
})

module.exports = router
