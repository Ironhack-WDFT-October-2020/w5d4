const express = require('express');
const router = express.Router();
const axios = require('axios');
/* GET home page */



router.get('/', (req, res, next) => {
  // here we want to call the star wars api
  axios.get('https://swapi.py4e.com/api/people')
    .then(response => {
      console.log(response.data.results);
      const list = response.data.results;
      res.render('index', { list })
    })
});

module.exports = router;
