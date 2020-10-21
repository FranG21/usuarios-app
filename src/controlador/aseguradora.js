const express = require('express');
const Aseguradora = require('../modelo/aseguradora');
const router = new express.Router();

router.post('/aseguradora', async(req, res) => {
  const aseguradora = new Aseguradora(req.body);
  try {
    const objAseguradora = await aseguradora.save();
    res.status(201).send(objAseguradora);
  } catch (e) {
    res.status(400).send(e.message);
  }
})

module.exports = router;
