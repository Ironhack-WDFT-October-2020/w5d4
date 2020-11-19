const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const { loginCheck } = require('./middlewares');

router.get('/', loginCheck(), (req, res, next) => {
  // to show all the rooms
  Room.find()
    .then(rooms => {
      res.render('rooms/index', { roomsList: rooms })
    })
    .catch(error => {
      next(error);
    });
  // only show the rooms that the logged in user created
  // Room.find({ owner: req.user._id }).then(rooms => {
  //   res.render('rooms/index', { roomsList: rooms })
  // })
  //   .catch(err => {
  //     next(err);
  //   })
})

router.get('/add', (req, res) => {
  res.render('rooms/add');
});

router.post('/', (req, res, next) => {
  // if you are not authenticated then you are redirected to '/rooms'
  // if (!req.isAuthenticated()) {
  //   res.redirect('/rooms');
  // }
  const { price, name, description } = req.body;
  Room.create({
    price,
    name,
    description,
    owner: req.user._id
  })
    .then(room => {
      res.redirect('/rooms')
    })
    .catch(error => {
      next(error);
    })
});

router.get('/:id', (req, res) => {
  // an admin can delete any room 
  // a user can only delete a room that they created  
  const query = { _id: req.params.id };
  // console.log('before if', query);
  if (req.user.role !== 'admin') {
    query.owner = req.user._id
  }
  // console.log('after if', query);
  Room.findOneAndDelete(query)
    .then(() => {
      res.redirect('/rooms')
    })
    .catch(err => {
      next(err);
    })

})

module.exports = router;