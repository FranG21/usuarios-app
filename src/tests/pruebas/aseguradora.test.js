const request = require('supertest');
const app = require('../app');

const { usuarioOne, aseguradoraOne, setupDatabase } = require('../fixtures/db');

beforeEach(setupDatabase);

test('Probando insertar aseguradora', async() => {
  await request(app).post('/aseguradora')
    .set('Authorization', `Bearer ${usuarioOne.token}`)
    .send({
      aseguradora: 'Seguro de vida'
    }).expect(201);

  await request(app).post('/aseguradora').send({
    aseguradora: 'fallo'
  }).expect(401)
});

test('Probar modificar aseguradora', async() => {

  await request(app)
    .patch('/aseguradora/modificar/' + aseguradoraOne.id)
    .set('Authorization', `Bearer ${usuarioOne.token}`)
    .send({
      aseguradora: 'Seguro de auto'
    }).expect(200);

  await request(app)
    .patch('/aseguradora/modificar' + aseguradoraOne.id)
    .set('Authorization', `Bearer ${usuarioOne.token}`)
    .send({
      campo: 'falla'
    }).expect(404);
});

test('Prueba lista ciudad', async() => {
  await request(app)
    .get('/aseguradora/lista')
    .set('Authorization', `Bearer ${usuarioOne.token}`)
    .send()
    .expect(200);
});

test('Prueba obtener ciudad unica', async() => {
  await request(app)
    .get('/aseguradora/lista/' + aseguradoraOne.id)
    .set('Authorization', `Bearer ${usuarioOne.token}`)
    .send()
    .expect(200);
});
