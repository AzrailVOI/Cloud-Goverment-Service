var express = require('express');
var router = express.Router();


/* GET users listing. */
  router.get('/', async function(req, res, next) {
    if (person.username == null && person.password == null){
      res.redirect("/")
    }else{
      await res.render('en-US/userlabel', { probel: " ",
      middlename: middlename.en,
      uname: uname.en,
      lastname: lastname.en,
      sex: sexText.en,
      dayofbirth: dayofbirth,
      nationality: nationality.en,
      documentnumber: docnum,
      dateofexpiry: dateex,
      dateofissue: dateiss,
      authority: kem.en,
      itn: itn});
    }

  });

module.exports = router;