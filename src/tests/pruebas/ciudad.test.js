const request = require('supertest');
const app = require('../app');

const { usuarioOne, ciudadOne, setupDatabase } = require('../fixtures/db');

beforeEach(setupDatabase);

test('Probando insertar departamento', async() => {
  await request(app).post('/ciudad')
    .set('Authorization', `Bearer ${usuarioOne.token}`)
    .send({
      ciudad: "Soyapango",
      id_departamento: ciudadOne.id_departamento
    }).expect(201);

  await request(app).post('/ciudad').send({
    ciudad: 'fallo'
  }).expect(401)
});

test('Probar modificar ciudad', async() => {

  await request(app)
    .patch('/ciudad/modificar/' + ciudadOne.id)
    .set('Authorization', `Bearer ${usuarioOne.token}`)
    .send({
      ciudad: "ilopango",
      id_departamento: ciudadOne.id_departamento
    }).expect(200);

  await request(app)
    .patch('/ciudad/modificar/' + ciudadOne.id)
    .set('Authorization', `Bearer ${usuarioOne.token}`)
    .send({
      campo: 'falla'
    }).expect(400);
});

test('Prueba lista ciudad', async() => {
  await request(app)
    .get('/ciudad/lista')
    .set('Authorization', `Bearer ${usuarioOne.token}`)
    .send()
    .expect(200);
});

test('Prueba obtener ciudad unica', async() => {
  await request(app)
    .get('/ciudad/lista/' + ciudadOne.id)
    .set('Authorization', `Bearer ${usuarioOne.token}`)
    .send()
    .expect(200);
});
