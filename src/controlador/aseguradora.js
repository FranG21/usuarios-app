const express = require('express');
const Aseguradora = require('../modelo/aseguradora');
const InfoSeguro = require('../modelo/info_seguro');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/aseguradora', auth, async(req, res) => {
  const aseguradora = new Aseguradora(req.body);
  try {
    const objAseguradora = await aseguradora.save();
    res.status(201).send(objAseguradora);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.patch('/aseguradora/modificar/:id', auth, async(req, res) => {
  try {
    await Aseguradora.validarCampos(req.params.id, req.body);

    await Aseguradora.update({ aseguradora: req.body.aseguradora.toUpperCase() }, { id: req.params.id });

    res.send();
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get('/aseguradora/lista', auth, async(req, res) => {
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;

    const lista = await Aseguradora.collection().fetchPage({
      pageSize,
      page
    });

    res.send({ lista, pagination: lista.pagination });
  } catch (e) {

  }
});

router.get('/aseguradora/lista/:id', auth, async(req, res) => {
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;

    const listaAseguradora = await Aseguradora.collection()
      .query('where', 'id', '=', req.params.id).fetch({ require: false });

    if (!listaAseguradora) {
      return res.status(404).send();
    }

    const listaInfoSeguro = await InfoSeguro.collection().
    query('where', 'id_aseguradora', '=', req.params.id).fetchPage({
      pageSize,
      page
    });

    res.send({ listaAseguradora, listaInfoSeguro, pagination: listaInfoSeguro.pagination });
  } catch (e) {

  }
});

module.exports = router;
