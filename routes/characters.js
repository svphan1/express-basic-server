const express = require('express');
const router = express.Router();
// const characters = require('../data.json');

//Connection to database through knex
const knex = require('../db/connection')

//GET all route
router.get('/', (req, res) => {
  knex('character')
  .orderBy('id', 'asc')
  .then(characters => {
    // Can only res.json once we have received the response/data from the db 
    res.json({characters: characters});
  })
})

//GET one route
router.get('/:id', (req, res, next) => {
  const id = req.params.id

  knex('character')
  .where('id', id) //or ({ id: id})
  .then(character => {
    res.json({ character: character[0] }) //[0] to send back just the item, so no array
  })
})


router.post('/', (req, res, next) => {
  //Pull the data that is to be posted from the request body
  const body = req.body
  console.log('hello from post')
  console.log(body)
 
  knex('character')
    .insert(body)
    .returning('*')
    .then(character => {
      // console.log(response)
      res.json({ character: character[0] })
    })
  
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const body = req.body

  knex('character')
    .where('id', id)
    .update(body)
    .returning('*')
    .then(updatedCharacter => {
      res.json({ character: updatedCharacter[0] })
    })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id

  knex('character')
    .where('id', id)
    .delete()
    .returning('*')
    .then(deletedCharacter => {
      res.json({character : deletedCharacter[0] })
    })
})



module.exports = router