const express = require('express')
const Ciudad = require('../modelo/ciudad')
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

module.exports = router;
