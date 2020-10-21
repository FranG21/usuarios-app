const express = require('express');
const InfoSalud = require('../modelo/info_salud');
const router = new express.Router();

router.post('/info_salud', async(req, res) => {

  const infoSalud = new InfoSalud(req.body);

  try {
    const info = await infoSalud.save();
    res.status(201).send(info);
  } catch (e) {
    res.status(400).send(e.message);
  }
})

module.exports = router;
