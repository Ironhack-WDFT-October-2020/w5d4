const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

router.get('/', (req, res, next) => {
  Room.find()
    .then(rooms => {
      res.render('rooms/index', { roomsList: rooms })
    })
    .catch(error => {
      next(error);
    });
})

router.get('/add', (req, res) => {
  res.render('rooms/add');
});

router.post('/', (req, res, next) => {
  const { price, name, description } = req.body;
  Room.create({
    price,
    name,
    description,
  })
    .then(room => {
      res.redirect('/rooms')
    })
    .catch(error => {
      next(error);
    })
});

module.exports = router;