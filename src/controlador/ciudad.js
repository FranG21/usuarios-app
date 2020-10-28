const express = require('express');
const Ciudad = require('../modelo/ciudad');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/ciudad', auth, async(req, res) => {
  const ciudad = new Ciudad(req.body);
  try {
    const ciu = await ciudad.save();
    res.status(201).send(ciu);

  } catch (e) {
    res.status(400).send(e.message);
  }
})

router.patch('/ciudad/modificar/:id', auth, async(req, res) => {
  try {

    await Ciudad.validarCampos(req.params.id, req.body);

    await Ciudad.update({
      ciudad: req.body.ciudad.toUpperCase(),
      id_departamento: req.body.id_departamento
    }, { id: req.params.id });

    res.send();
  } catch (e) {
    res.status(400).send(e.message);
  }
})

router.get('/ciudad/lista', auth, async(req, res) => {
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;

    const lista = await Ciudad.collection().fetchPage({
      pageSize,
      page,
      withRelated: ['departamento']
    });

    res.send({ lista, pagination: lista.pagination });
  } catch (e) {

  }
})

router.get('/ciudad/lista/:id', auth, async(req, res) => {
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;

    const lista = await Ciudad.collection().query('where', 'id', '=', req.params.id).fetchPage({
      pageSize,
      page,
      withRelated: ['departamento']
    });

    res.send({ lista, pagination: lista.pagination });
  } catch (e) {

  }
});

module.exports = router;
