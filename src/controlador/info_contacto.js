const express = require('express');
const InfoContacto = require('../modelo/info_contacto');
const router = new express.Router();

router.post('/info_contacto', async(req, res) => {
  const infoContacto = new InfoContacto(req.body);
  try {
    const info = await infoContacto.save();
    res.status(201).send(info);
  } catch (e) {
    res.status(400).send(e.message);
  }
})

module.exports = router;
