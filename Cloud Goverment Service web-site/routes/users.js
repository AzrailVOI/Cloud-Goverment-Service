var express = require('express');
var router = express.Router();


/* GET users listing. */
  router.get('/', async function(req, res, next) {
    if (person.username === undefined && person.password === undefined){
      res.redirect("/")
    }else{
      await res.render('userlabel', { probel: " ",
      middlename: middlename,
      uname: uname,
      lastname: lastname,
      sex: sexText,
      dayofbirth: dayofbirth,
      nationality: nationality,
      documentnumber: docnum,
      dateofexpiry: dateex,
      dateofissue: dateiss,
      authority: kem,
      itn: itn});
    }

  });

module.exports = router;
