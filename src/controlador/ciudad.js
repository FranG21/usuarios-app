const express = require('express')
const Ciudad = require('../modelo/ciudad')
const auth = require('../middleware/auth');
const router = new express.Router()

router.post('/ciudad', async(req, res) => {

  const ciudad = new Ciudad(req.body)
  try {
    const ciu = await ciudad.save()
    res.status(201).send(ciu)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

router.patch('/ciudad/modificar', auth, async(req, res) => {
  try {
    await Ciudad.validarCampos(req.body);

    await Ciudad.update({
      ciudad: req.body.ciudad.toUpperCase(),
      id_departamento: req.body.id_departamento
    }, { id: req.body.id });

    res.send();
  } catch (e) {
    res.status(400).send(e.message);
  }
})

router.get('/ciudad/lista', auth, async(req, res) => {
  try {
    const lista = await Ciudad.collection().fetchPage({
      pageSize: 10,
      page: 1,
      withRelated: ['departamento']
    })
    res.send(lista);
  } catch (e) {

  }
})

module.exports = router;
