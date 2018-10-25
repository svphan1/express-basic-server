const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let port = process.env.PORT || 3000;

//Route imports
const characterRoutes = require('./routes/characters');

//general middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('🐔🐩🐔')
})

//Any requests that START with /characters, send to this router file
app.use('/characters', characterRoutes)


//Get the data into the 'database'
app.use(notFound)
//General purpose 'catch' all errors
app.use(errorHandler)

function notFound(err, req, res, next) {
  res.status(404).send({error: 'Not found!', status: 404, url: req.originalUrl})
}

function errorHandler(err, req, res, next) {
  console.error('NOPE, LOL', err)
  const stack =  process.env.NODE_ENV !== 'production' ? err.stack : undefined
  res.status(500).send({error: err.message, stack, url: req.originalUrl})
}

app.listen(port, () => console.log(`Server running on port ${port}`))