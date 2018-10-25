const express = require('express');
const router = express.Router();
const characters = require('../data.json');


router.get('/', (req, res) => {
  res.json({characters: characters});
})

router.get('/:id', (req, res, next) => {
  const id = req.params.id

  const character = characters.filter(character => {
    return character.id == id
  })[0]

  if (!character.id) {
    next()
  }

  res.json({ character })  
})


router.post('/', (req, res, next) => {
  //Pull the data that is to be posted from the request body
  const body = req.body
  console.log(body)
  //Insert new data into characters array
  //WE NEED BODY PARSER

  characters.push(body)
  res.json({ body: body })
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const body = req.body

  const updatedCharacters = characters.map(character => {
    if(character.id == id)  {
      return body
    }
    return character
  })
  console.log('updated', updatedCharacters)
  res.json({characters : updatedCharacters})
})

router.delete('/:id', (req, res) => {
  const id = req.params.id

  const survivors = characters.filter(character => {
    return character.id != id
  })
  res.json({characters : survivors})
})



module.exports = router