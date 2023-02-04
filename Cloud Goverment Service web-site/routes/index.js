var express = require('express');
var router = express.Router();
/* GET home page. */

router.get('/', function(req, res, next) {
  if (person.username === undefined && person.password === undefined){
      res.redirect("/")
  }else{
    res.render('index', { title: 'Express' });
  }
});

// серверный код



module.exports = router;
