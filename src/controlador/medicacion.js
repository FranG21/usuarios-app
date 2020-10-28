const express = require('express');
const Medicacion = require('../modelo/medicacion');
const InfoSalud = require('../modelo/info_salud');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/medicacion', auth, async(req, res) => {

  const medicacion = new Medicacion(req.body);
  try {
    const medicamento = await medicacion.save();
    res.status(201).send(medicamento);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.patch('/medicacion/modificar/:id', auth, async(req, res) => {
  try {
    await Medicacion.validarCampos(req.params.id, req.body);

    await Medicacion.update({ medicamento: req.body.medicamento.toUpperCase() }, { id: req.params.id });

    res.send();
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get('/medicacion/lista', auth, async(req, res) => {
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;

    const lista = await Medicacion.collection().fetchPage({
      pageSize,
      page
    });

    res.send({ lista, pagination: lista.pagination });
  } catch (e) {

  }
});

router.get('/medicacion/lista/:id', auth, async(req, res) => {
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;

    const listaMedicacion = await Medicacion.collection().query('where', 'id', '=', req.params.id).fetch();

    const listaInfoSaludMedicacion = await InfoSalud.collection()
      .query('where', 'medicacion', '=', req.params.id).fetchPage({
        pageSize,
        page,
        require: false
      });

    const listaInfoSaludAlergias = await InfoSalud.collection()
      .query('where', 'alergias', '=', req.params.id).fetch({ require: false });

    res.send({
      listaMedicacion,
      listaInfoSaludMedicacion,
      listaInfoSaludAlergias,
      pagination: listaInfoSaludMedicacion.pagination
    });

  } catch (e) {

  }
});

module.exports = router;
