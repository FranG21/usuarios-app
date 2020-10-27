const request = require('supertest');
const app = require('../app');
const Departamento = require('../../modelo/departamento');
//require('../../modelo/usuario');

const { setupDatabase } = require('../fixtures/db');

beforeEach(setupDatabase);

test('Probando insertar departamento', async() => {


  await request(app).post('/departamento').send({
    departamento: 'sonsonate'
  }).expect(201);

  await request(app).post('/departamento').send({
    departamento: 'sonsonate'
  }).expect(400)

})

// test('Mostrar tarea', async() => {
//   const response = await request(app)
//     .get('/departamento/lista')
//     .send()
//     .expect(200)

//   //expect(response.body.length).toEqual(2)
// })
