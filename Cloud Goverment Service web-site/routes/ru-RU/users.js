var express = require('express');
var router = express.Router();


/* GET users listing. */
  router.get('/', async function(req, res, next) {
  const { auth } = req.cookies;
  if (auth == undefined || auth.username == null && auth.password == null){
      res.redirect("/")
    }else{
      await res.render('ru-RU/userlabel', { probel: " ",
      middlename: middlename.ru,
      uname: uname.ru,
      lastname: lastname.ru,
      sex: sexText.ru,
      dayofbirth: dayofbirth,
      nationality: nationality.ru,
      documentnumber: docnum,
      dateofexpiry: dateex,
      dateofissue: dateiss,
      authority: kem.ru,
      itn: itn});
    }

  });

module.exports = router;
