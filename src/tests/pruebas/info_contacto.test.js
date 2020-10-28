const request = require('supertest');
const app = require('../app');

const { usuarioOne, usuarioTwo, ciudadOne, setupDatabase } = require('../fixtures/db');

beforeEach(setupDatabase);

test('Probando insertar informacion de contacto', async() => {
  await request(app).post('/info_contacto')
    .set('Authorization', `Bearer ${usuarioTwo.token}`)
    .send({
      direccion: "Canton las primaveras",
      telefono: "2234-1234",
      id_ciudad: ciudadOne.id
    }).expect(201);

  await request(app).post('/info_contacto').send({
    invalido: 'fallo'
  }).expect(401)
});

test('Probar modificar informacion de contacto', async() => {

  await request(app)
    .patch('/info_contacto/modificar')
    .set('Authorization', `Bearer ${usuarioOne.token}`)
    .send({
      telefono: '2121-2121',
      direccion: 'Canton la palma bendita',
      id_ciudad: ciudadOne.id
    }).expect(200);

  await request(app)
    .patch('/info_contacto/modificar')
    .set('Authorization', `Bearer ${usuarioOne.token}`)
    .send({
      campo: 'falla'
    }).expect(400);
});

test('Prueba obtener registro por ID usuario', async() => {
  await request(app)
    .get('/info_contacto/lista')
    .set('Authorization', `Bearer ${usuarioOne.token}`)
    .send()
    .expect(200);
});

test('Prueba obtener registro por ID', async() => {
  await request(app)
    .get('/info_contacto/lista/' + usuarioOne.id)
    .set('Authorization', `Bearer ${usuarioOne.token}`)
    .send()
    .expect(200);
});
