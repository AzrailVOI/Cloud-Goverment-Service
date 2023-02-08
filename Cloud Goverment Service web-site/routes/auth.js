var express = require('express');
var router = express.Router();
var user = {
    username: this.username,
    password: this.password
}
var users = [
    {
        username: "Vlad",
        password: "1234"
    },
    {
        username: "Taras",
        password: "1111"
    }
]
global.person = user
person.username = null
person.password = null
router.get('/', function(req, res, next) {
    person.username = null
    person.password = null
    const { auth } = req.cookies;
    if (auth.username != null && auth.password != null) {
    // res.send(`Welcome, ${auth.username}. Your password is ${auth.password}.`);
        person.username = auth.username
        person.password = auth.password
        language = auth.language
        let cheak = [];
        cheak = users.map((oneUser)=>{return oneUser.username === person.username && oneUser.password === person.password;})
        console.log(cheak)
        console.log(cheak.includes(true))
        if (cheak.includes(true)){
            switch (language) {
                case "uk-UA":
                    res.redirect("uk-UA/profile")
                    break;
                case "ru-RU":
                    res.redirect("ru-RU/profile")
                    break;
                case "en-US":
                    res.redirect("en-US/profile")
                    break;
                default:
                    console.error('langError')
                    break;
            }
        }
        if (person.username === "Vlad") {
            middlename = {ua: "Ілліч", ru: 'Ильич', en: 'Illych'}
            uname = {ua: "Владислав", ru: 'Владыслав', en: 'Vladyslav'}
            lastname = {ua: "Овчарук", ru: 'Овчарук', en: 'Ovcharuk'}
            dayofbirth = '14.01.2005'
            nationality = {ua: "Україна", ru: 'Украина', en: 'Ukraine'}
            docnum = '0071734223'
            dateex = '21.01.2026'
            dateiss = '21.01.2021'
            kem = {ua: "Орган 1433", ru: 'Орган 1433', en: 'Agency 1433'}
            itn = '3435678899'
            sexText = {ua: "чоловічий", ru: 'мужской', en: 'male'}
        } else if (person.username == "Taras") {
            middlename = {ua: "Григорович", ru: 'Григорьевич', en: 'Hryhorovych'}
            uname = {ua: "Тарас", ru: 'Тарас', en: 'Taras'}
            lastname = {ua: "Шевченко", ru: 'Шевченко', en: 'Shevchenko'}
            dayofbirth = '09.03.1814'
            nationality = {ua: "Словаччина", ru: 'Словакия', en: 'Slovak'}
            docnum = '007174987'
            dateex = '12.12.1828'
            dateiss = '10.03.1861'
            kem = {ua: "Орган 1433", ru: 'Орган 1433', en: 'Agency 1433'}
            itn = '3848723154'
            sexText = {ua: "чоловічий", ru: 'мужской', en: 'male'}
        }
  } else {
        if (person.username == null && person.password == null){

            res.render('auth', { });
        } else {
            if (language == "uk-UA"){
                res.redirect("uk-UA/home")
            }else if (language == "en-US"){
                res.redirect("en-US/home")
            }else if (language == "ru-RU"){
                res.redirect("ru-RU/home")
            }

        }
  }

});
router.post('/', async (req, res, next) => {
    await console.log("User " + req.body.uname + " " + req.body.pass);
    person.username = req.body.uname
    person.password = req.body.pass
    language = req.body.language
    let cheak = [];
    cheak = users.map((oneUser)=>{return oneUser.username === person.username && oneUser.password === person.password;})
    console.log(cheak)
    console.log(cheak.includes(true))
    if (cheak.includes(true)){
        res.cookie('auth', {username: person.username, password: person.password, language: language}, { maxAge: 900000, httpOnly: true });
        switch (language) {
            case "uk-UA":
                res.redirect("uk-UA/profile")
                break;
            case "ru-RU":
                res.redirect("ru-RU/profile")
                break;
            case "en-US":
                res.redirect("en-US/profile")
                break;
            default:
                console.error('langError')
                break;
        }
    }else {
        let message = "Ошибка авторизации"
        res.send(`
        <!DOCTYPE html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>Authorization</title>
  <link href="stylesheets/authstyle.css" rel="stylesheet" type="text/css">
  <link href="stylesheets/style.css" rel="stylesheet" type="text/css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
  <link href="https://fonts.googleapis.com/css2?family=PT+Sans&amp;display=swap" rel="stylesheet">
  <script>
    alert('${message}');
  </script>
</head>
<div class="auth-logo-div-div">
  <div class="auth-logo-div"><img class="auth-logo" src="images/logo.webp" alt=""></div>
</div>
<form id="auth" action="/" method="POST">
  <div class="container">
    <div>
      <label><b>Login</b></label>
      <input id="login" type="text" placeholder="Type login" name="uname">
      <label><b>Password</b></label>
      <input id="psw" type="password" placeholder="Type password" name="pass">
      <label><b>Language</b></label><br>
      <select name="language">
        <option value="uk-UA">Українська (Державна)</option>
        <option value="en-US">English (USA)</option>
        <option value="ru-RU">Русский</option>
      </select>
    </div>
    <input id="btn" type="submit" value="Log In">
  </div>
</form>
<script src="socket.io/socket.io-1.4.5.js"></script>
<script src="javascripts/auth.js"></script>
        `)
        // res.render("authError", {})
    }

    if (person.username === "Vlad") {
        middlename = {ua: "Ілліч", ru: 'Ильич', en: 'Illych'}
        uname = {ua: "Владислав", ru: 'Владыслав', en: 'Vladyslav'}
        lastname = {ua: "Овчарук", ru: 'Овчарук', en: 'Ovcharuk'}
        dayofbirth = '14.01.2005'
        nationality = {ua: "Україна", ru: 'Украина', en: 'Ukraine'}
        docnum = '0071734223'
        dateex = '21.01.2026'
        dateiss = '21.01.2021'
        kem = {ua: "Орган 1433", ru: 'Орган 1433', en: 'Agency 1433'}
        itn = '3435678899'
        sexText = {ua: "чоловічий", ru: 'мужской', en: 'male'}
    } else if (person.username == "Taras") {
        middlename = {ua: "Григорович", ru: 'Григорьевич', en: 'Hryhorovych'}
        uname = {ua: "Тарас", ru: 'Тарас', en: 'Taras'}
        lastname = {ua: "Шевченко", ru: 'Шевченко', en: 'Shevchenko'}
        dayofbirth = '09.03.1814'
        nationality = {ua: "Словаччина", ru: 'Словакия', en: 'Slovak'}
        docnum = '007174987'
        dateex = '12.12.1828'
        dateiss = '10.03.1861'
        kem = {ua: "Орган 1433", ru: 'Орган 1433', en: 'Agency 1433'}
        itn = '3848723154'
        sexText = {ua: "чоловічий", ru: 'мужской', en: 'male'}
    }
});

module.exports = router;
