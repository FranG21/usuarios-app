const request = require('supertest');
const app = require('../app');
const Usuario = require('../../modelo/usuario');
//require('../../modelo/departamento');

const { setupDatabase } = require('../fixtures/db')

beforeEach(setupDatabase);

test('Probando insertar usuario', async() => {

  // console.log('AMGIO')
  const user = await request(app).post('/usuario').send({
      correo: 'franciscomar@gmail.com',
      clave: 'fran1234'
    }).expect(201)
    // console.log('QUEPASOS')
    // console.log(user.body.id)
})
