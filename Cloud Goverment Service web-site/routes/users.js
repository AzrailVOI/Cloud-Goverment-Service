var express = require('express');
var router = express.Router();

/* GET users listing. */
  router.get('/', function(req, res, next) {
    res.render('userlabel', { probel: " ",
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
  });

module.exports = router;
