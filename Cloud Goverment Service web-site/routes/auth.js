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
    if (auth != undefined && auth.username != null && auth.password != null) {
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
        res.render('authError')
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
