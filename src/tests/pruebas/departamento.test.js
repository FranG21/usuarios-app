const request = require('supertest');
const app = require('../app');
const Departamento = require('../../modelo/departamento');

beforeEach(async() => {
  await Departamento.where('id', '!=', 0).destroy()
})

test('Probando insertar usuario', async() => {

  await request(app).post('/departamento').send({
    departamento: 'qq'
  }).expect(201)

  // console.log(user.body.id)
})

// test('Mostrar tarea', async() => {
//   const response = await request(app)
//     .get('/departamento/lista')
//     .send()
//     .expect(200)

//   //expect(response.body.length).toEqual(2)
// })

// const dep = await Departamento.findById(18)
//expect(dep.get('departamento')).toEqual('USULUTAN')
