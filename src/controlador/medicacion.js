const express = require('express')
const Medicacion = require('../modelo/medicacion')
const router = new express.Router()

router.post('/medicacion', async(req, res) => {

  const medicacion = new Medicacion(req.body)
  try {
    const medicamento = await medicacion.save()
    res.status(201).send(medicamento)
  } catch (e) {
    res.status(400).send(e.messaje)
  }
})

module.exports = router
