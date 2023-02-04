var express = require('express');
var router = express.Router();
/* GET home page. */

router.get('/', function(req, res, next) {
  if (person.username == null && person.password == null){
      res.redirect("/")
  }else{
      res.render('uk-UA/index')
  }
});

// серверный код



module.exports = router;
