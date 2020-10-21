const express = require('express');
const InfoSeguro = require('../modelo/info_seguro');
const router = new express.Router();

router.post('/info_seguro', async(req, res) => {

  const infoSeguro = new InfoSeguro(req.body);

  try {
    const info = await infoSeguro.save();
    res.status(201).send(info);
  } catch (e) {
    res.status(400).send(e.message);
  }
})

module.exports = router;
