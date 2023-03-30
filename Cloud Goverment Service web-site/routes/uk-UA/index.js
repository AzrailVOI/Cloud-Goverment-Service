var express = require('express');
var router = express.Router();
/* GET home page. */

router.get('/', function(req, res, next) {
  const { auth } = req.cookies;
  if (auth == undefined || auth.username == null && auth.password == null){
      res.redirect("/")
  }else{
      res.render('uk-UA/index')
  }
});

// серверный код



module.exports = router;
