const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const { response } = require('express')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.post('/cikan', (request, response) => {
    request.json({close_time: 'tes', timer: '100', stat: 'stopped'})
})


app.get('/timer', db.getTimer)
app.get('/users/:id', db.getUserById)
app.post('/cikan', db.createTimer)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

