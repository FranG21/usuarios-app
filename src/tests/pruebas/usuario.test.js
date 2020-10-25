const request = require('supertest');
const app = require('../app');
const Usuario = require('../../modelo/usuario');

beforeEach(async() => {
  await Usuario.where({ status: true }).destroy()
})

test('Probando insertar usuario', async() => {

  const user = await request(app).post('/usuario').send({
    correo: 'franciscomar@gmail.com',
    clave: 'francisco123456'
  }).expect(201)

  // console.log(user.body.id)
})
