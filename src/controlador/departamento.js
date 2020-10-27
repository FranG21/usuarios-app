const express = require('express');
const Departamento = require('../modelo/departamento');
const Ciudad = require('../modelo/ciudad');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/departamento', auth, async(req, res) => {

  const departamento = new Departamento(req.body);
  try {
    const dep = await departamento.save();
    res.status(201).send(dep);
  } catch (e) {
    res.status(400).send(e.message);
  }
})

router.patch('/departamento/modificar/:id', auth, async(req, res) => {
  try {
    await Departamento.validarCampos({ id: req.params.id, departamento: req.body.departamento });

    await Departamento.update({ departamento: req.body.departamento.toUpperCase() }, { id: req.params.id });

    res.send();
  } catch (e) {
    res.status(400).send(e.message);
  }
})

router.get('/departamento/lista', auth, async(req, res) => {
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;

    const lista = await Departamento.collection().fetchPage({
      pageSize,
      page
    })

    res.send({ lista, pagination: lista.pagination });
  } catch (e) {

  }
})

router.get('/departamento/lista/:id', auth, async(req, res) => {
  try {

    const listaDepartamento = await Departamento.collection().query('where', 'id', '=', req.params.id).fetch();

    const listaCiudad = await Ciudad.collection().query('where', 'id_departamento', '=', req.params.id).fetch();

    res.send({ listaDepartamento, listaCiudad });
  } catch (e) {

  }
})

module.exports = router;
