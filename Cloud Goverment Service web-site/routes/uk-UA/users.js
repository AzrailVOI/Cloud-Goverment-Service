var express = require('express');
var router = express.Router();


/* GET users listing. */
  router.get('/', async function(req, res, next) {
  const { auth } = req.cookies;
  if (auth == undefined || auth.username == null && auth.password == null){
      res.redirect("/")
    }else{
      await res.render('uk-UA/userlabel', { probel: " ",
      middlename: middlename.ua,
      uname: uname.ua,
      lastname: lastname.ua,
      sex: sexText.ua,
      dayofbirth: dayofbirth,
      nationality: nationality.ua,
      documentnumber: docnum,
      dateofexpiry: dateex,
      dateofissue: dateiss,
      authority: kem.ua,
      itn: itn});
    }

  });

module.exports = router;
