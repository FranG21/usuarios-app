const request = require('supertest');
const app = require('../app');
const Departamento = require('../../modelo/departamento');

const { usuarioOne, departamentoOne, setupDatabase } = require('../fixtures/db');

beforeEach(setupDatabase);

test('Probando insertar departamento', async() => {
  await request(app).post('/departamento')
    .set('Authorization', `Bearer ${usuarioOne.token}`)
    .send({
      departamento: 'sonsonate'
    }).expect(201);

  await request(app).post('/departamento').send({
    departamento: 'sonsonate'
  }).expect(401);

});

test('Probar modificar departamento', async() => {

  await request(app)
    .patch('/departamento/modificar/' + departamentoOne.id)
    .set('Authorization', `Bearer ${usuarioOne.token}`)
    .send({
      departamento: 'san vicente'
    }).expect(200);

  await request(app)
    .patch('/usuario/modificar')
    .set('Authorization', `Bearer ${usuarioOne.token}`)
    .send({
      campo: 'falla'
    }).expect(500);
});

test('Prueba lista departamento', async() => {
  await request(app)
    .get('/departamento/lista')
    .set('Authorization', `Bearer ${usuarioOne.token}`)
    .send()
    .expect(200);
});
