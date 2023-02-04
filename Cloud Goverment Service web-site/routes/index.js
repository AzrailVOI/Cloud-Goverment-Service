var express = require('express');
var router = express.Router();
/* GET home page. */

router.get('/', function(req, res, next) {
  if (person.username === "" && person.password === ""){
      res.redirect("/")
  }else{
    res.render('index', { title: 'Express' });
  }
});

module.exports = router;
