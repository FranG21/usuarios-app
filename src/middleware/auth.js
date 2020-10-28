const jwt = require('jsonwebtoken');
const Token = require('../modelo/token');
const User = require('../modelo/usuario');

const auth = async(req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const existe = await Token.findOne({ id_usuario: decoded._id, 'token': token }, { require: false });

    if (!existe) {
      throw new Error();
    }

    req.token = token;
    req.user = await User.findOne({ id: existe.get('id_usuario') }, { require: false });
    next();
  } catch (e) {
    res.status(401).send({ error: 'Favor auntenticarse' });
  }
}

module.exports = auth;
