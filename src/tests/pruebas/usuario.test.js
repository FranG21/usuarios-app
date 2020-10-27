const request = require('supertest');
const app = require('../app');
const Usuario = require('../../modelo/usuario');
//const Token = require('../../modelo/token');
//require('../../modelo/departamento');

const { usuarioOne, setupDatabase } = require('../fixtures/db');
const Token = require('../../modelo/token');

beforeEach(setupDatabase);

test('Prueba insertar usuario', async() => {

  const user = await request(app).post('/usuario').send({
    correo: 'franciscomar@gmail.com',
    clave: 'fran1234'
  }).expect(201)
})

test('Prueba login', async() => {

  const response = await request(app).post('/usuario/login').send({
    correo: usuarioOne.correo,
    clave: usuarioOne.clave
  }).expect(200)

  const objToken = await Token.findOne({ token: response.body.token }, { require: false });

  expect(response.body.token).toBe(objToken.get('token'));
})

test('Prueba credenciales malas', async() => {

  await request(app).post('/usuario/login').send({
    correo: usuarioOne.correo,
    clave: 'nel123456'
  }).expect(400);
})

test('Prueba lista usuario', async() => {
  await request(app)
    .get('/usuario/lista')
    .set('Authorization', `Bearer ${usuarioOne.token}`)
    .send()
    .expect(200);
})

test('Prueba lista usuario sin autenticacion', async() => {
  await request(app)
    .get('/usuario/lista')
    .send()
    .expect(401);
})

test('Prueba usuario unico', async() => {
  await request(app)
    .get('/usuario/me')
    .set('Authorization', `Bearer ${usuarioOne.token}`)
    .send()
    .expect(200);
})

test('Prueba agregar imagen', async() => {

  // await request(app)
  //   .post('/usuario/avatar')
  //   .set('Authorization', `Bearer ${usuarioOne.token}`)
  //   .attach('avatar', '../tests/fixtures/profile-pic.jpg')
  //   .expect(200)

  //const user = await User.findById(userOneId)
  //expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Probar modificar usuario', async() => {

  await request(app)
    .patch('/usuario/modificar')
    .set('Authorization', `Bearer ${usuarioOne.token}`)
    .send({
      email: 'francisco12431@gmail.com',
      clave: 'fran1319'
    }).expect(200);

})
