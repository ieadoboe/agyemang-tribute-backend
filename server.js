const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { response } = require('express');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'superman',
    database : 'postgres'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {
  knex.select( '*' ).from('posts')
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json("Unable to GET"))
})

app.post('/submit', (req, res) => {
  const { name, body } = req.body;
  knex('posts')
    .returning('*')
    .insert({
      name: name,
      body: body
    })
    .catch(err => res.status(400).json("Unable to submit"))
}) 

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`)
});