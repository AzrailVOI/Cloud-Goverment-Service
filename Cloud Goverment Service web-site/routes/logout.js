var express = require('express');
var router = express.Router();

router.get('/logout', (req, res, next) => {
  person.username = "sss";
  person.password = undefined;
  console.log('Successfully logged out', person.username, person.password);
  res.render('logout', { title: 'Express' });
});



module.exports = router;
