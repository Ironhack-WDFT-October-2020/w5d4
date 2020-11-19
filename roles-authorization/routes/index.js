const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  // passport syntax: req.user to get the logged in user
  console.log(req.user);
  res.render('index', { user: req.user });
});

module.exports = router;
