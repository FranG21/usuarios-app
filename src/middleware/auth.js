const jwt = require('jsonwebtoken');
const Token = require('../modelo/token');
const User = require('../modelo/usuario');

const auth = async(req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'mitoken');
    console.log(decoded)
    const existe = await Token.findOne({ id_usuario: decoded._id, 'token': token }, { require: false })
    console.log(existe.get('id_usuario'))

    if (!existe) {
      throw new Error();
    }


    req.token = token;
    req.user = await User.findOne({ id_usuario: existe.get('id_usuario') });
    next();
  } catch (e) {
    res.status(401).send({ error: 'Favor auntenticarse' })
  }


}

module.exports = auth;
