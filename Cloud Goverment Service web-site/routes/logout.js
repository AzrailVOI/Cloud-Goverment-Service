var express = require('express');
var router = express.Router();


/* GET users listing. */

router.get('/', async function(req, res, next) {
  if (person.username != null && person.password != null){
    await res.render('logout', {});
    person.username = null
    person.password = null
    language = null
    console.log(person.username, person.password)
  } else if(person.username == null && person.password == null){
    res.redirect("/")
  }
});



module.exports = router;
