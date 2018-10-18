const express = require('express');
const app = express();
let port = 3600
const characters = require('./data.json')

app.get('/', (req, res) => {
  res.send('🐔')
})

app.get('/characters', (req, res) => {
  res.json({characters: characters});
})

// app.get('/characters/:id', (req, res) => {
//   res.json(characters[req.params.id-1])
// })

// for (i = 0; i < characters.length; i++) {
//   if (characters[i].id == id) {
//     res.json(characters[i])
//   }
// })

app.get('/characters/:id', (req, res) => {
  const id = req.params.id
  const character = characters.filter(character => {
    return character.id == id
  })
  res.json({ character})  
})


app.listen(port, () => console.log('Server running on port 3000'))