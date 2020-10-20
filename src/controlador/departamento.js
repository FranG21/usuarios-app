const express = require('express')
const Departamento = require('../modelo/departamento')
const router = new express.Router()

router.post('/departamento', async(req, res) => {

  const departamento = new Departamento(req.body)
  try {
    const dep = await departamento.save()
    res.status(201).send(dep)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

router.get('/departamento', async(req, res) => {
  res.send(req.departamento)
})

module.exports = router
