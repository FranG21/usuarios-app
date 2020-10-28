const request = require('supertest');
const app = require('../app');

const { usuarioOne, usuarioTwo, medicamentoOne, medicamentoTwo, setupDatabase } = require('../fixtures/db');

beforeEach(setupDatabase);

test('Probando insertar informacion de salud', async() => {
  await request(app).post('/info_salud')
    .set('Authorization', `Bearer ${usuarioTwo.token}`)
    .send({
      condiciones: "dolor de espalda",
      medicacion: medicamentoOne.id,
      alergias: medicamentoTwo.id
    }).expect(201);

  await request(app).post('/info_salud').send({
    invalido: 'fallo'
  }).expect(401)
});

test('Prueba obtener registro por ID usuario', async() => {
  await request(app)
    .get('/info_salud/lista')
    .set('Authorization', `Bearer ${usuarioOne.token}`)
    .send()
    .expect(200);
});

test('Prueba obtener registro por ID', async() => {
  await request(app)
    .get('/info_salud/lista/' + usuarioOne.id)
    .set('Authorization', `Bearer ${usuarioOne.token}`)
    .send()
    .expect(200);
});
