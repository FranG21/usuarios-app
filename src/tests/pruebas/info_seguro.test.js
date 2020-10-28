const request = require('supertest');
const app = require('../app');

const { usuarioOne, usuarioTwo, infoSeguroOne, setupDatabase } = require('../fixtures/db');

beforeEach(setupDatabase);

test('Probando insertar informacion de seguro', async() => {
  await request(app).post('/info_seguro')
    .set('Authorization', `Bearer ${usuarioTwo.token}`)
    .send({
      num_identificador: 33331111,
      fecha_vigencia: "2021-09-14",
      id_aseguradora: infoSeguroOne.id_aseguradora
    }).expect(201);

  await request(app).post('/info_seguro').send({
    invalido: 'fallo'
  }).expect(401)
});

test('Prueba obtener registro por ID usuario', async() => {
  await request(app)
    .get('/info_seguro/lista')
    .set('Authorization', `Bearer ${usuarioOne.token}`)
    .send()
    .expect(200);
});

test('Prueba obtener registro por ID', async() => {
  await request(app)
    .get('/info_seguro/lista/' + usuarioOne.id)
    .set('Authorization', `Bearer ${usuarioOne.token}`)
    .send()
    .expect(200);
});
