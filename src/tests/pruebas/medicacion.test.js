const request = require('supertest');
const app = require('../app');

const { usuarioOne, medicamentoOne, medicamentoTwo, setupDatabase } = require('../fixtures/db');

beforeEach(setupDatabase);

test('Probando insertar medicacion', async() => {
  await request(app).post('/medicacion')
    .set('Authorization', `Bearer ${usuarioOne.token}`)
    .send({
      medicamento: 'novalgina'
    }).expect(201);

  await request(app).post('/medicacion').send({
    medicamento: 'fallo'
  }).expect(401)
});

test('Probar modificar medicamento', async() => {

  await request(app)
    .patch('/medicacion/modificar/' + medicamentoOne.id)
    .set('Authorization', `Bearer ${usuarioOne.token}`)
    .send({
      medicamento: 'panadol'
    }).expect(200);

  await request(app)
    .patch('/medicacion/modificar/' + medicamentoOne.id)
    .set('Authorization', `Bearer ${usuarioOne.token}`)
    .send({
      campo: 'falla'
    }).expect(400);
});

test('Prueba lista ciudad', async() => {
  await request(app)
    .get('/medicacion/lista')
    .set('Authorization', `Bearer ${usuarioOne.token}`)
    .send()
    .expect(200);
});

test('Prueba obtener ciudad unica', async() => {
  await request(app)
    .get('/medicacion/lista/' + medicamentoOne.id)
    .set('Authorization', `Bearer ${usuarioOne.token}`)
    .send()
    .expect(200);
});
