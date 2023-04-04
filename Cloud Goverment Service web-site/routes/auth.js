var express = require('express');
const mysql = require('mysql2');
const socketio = require('socket.io')

var router = express.Router();
var user = {
    userid: this.userid,
    username: this.username,
    password: this.password
}
global.person = user
person.username = null
person.password = null
person.userid = null

router.get('/', async function(req, res, next) {
    console.log("sadas", registration.status)

    //socket start
    var isRegistrationSent = false
    io.on('connection', socket=> {
        console.log("New auth socket");
        if (!isRegistrationSent){
            console.log("registration status", registration.status)
            socket.emit('registration', registration)
            registration.status = 'new'
            registration.name = ''
            isRegistrationSent = true
        }
    })
    // const isBrowser = !req.headers['user-agent'].includes('socket.io');
    // if (isBrowser){
    // console.log("qwertyu", registration.status)
    //
    // }
    //socket end
    person.username = null
    person.password = null
    person.userid = null
    const { auth } = req.cookies;
    if (auth != undefined && auth.username != null && auth.password != null) {
    // res.send(`Welcome, ${auth.username}. Your password is ${auth.password}.`);
        const connection = mysql.createConnection({
            host: '127.0.0.1',
            port: '3306',
            user: 'Vlad',
            password: '1234',
            database: 'CGSDB'
        });
        console.log('Con1nected!');
        connection.connect(function(err) {
            if (err) throw err;
            console.log('Connected!');
        });
        connection.query(`USE CGSDB1; SELECT * FROM users`, function(err, results) {
            if (err) throw err;
            console.log(results);
        });
        connection.end();
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
            sexText = {ua: "чоловіча", ru: 'мужской', en: 'male'}
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
            sexText = {ua: "чоловіча", ru: 'мужской', en: 'male'}
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
    let cheakAuth = false;
    const connection = mysql.createConnection({
        host: '127.0.0.1',
        port: '3306',
        user: 'Wlad',
        password: 'QWErty1234',
        database: 'CGSDB1'
    });
    console.log('Con1nected!');
    connection.connect(function(err) {
        if (err) throw err;
        console.log('Connected!');
    });
    connection.query('SELECT * FROM users JOIN passport_info ON users.id = passport_info.user_id WHERE name = ? AND password = ?', [person.username, person.password], function (error, results, fields) {
        if (error) throw error;

        // Если результаты запроса не пусты, то пользователь существует в таблице
        if (results.length > 0) {
            console.log('Пользователь существует в таблице', results[0].id);
            person.userid = results[0].id
            cheakAuth = true;
            console.log(cheakAuth)
            console.log(results)
            let cheak = [];
            console.log(cheakAuth, " sd")
            if (cheak.includes(true) || cheakAuth){
                console.log("Proverka +")
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
            }
            middlename = {ua: results[0].MiddleName_ua, ru: results[0].MiddleName_ru, en: results[0].MiddleName_en}
            uname = {ua: results[0].FirstName_ua, ru: results[0].FirstName_ru, en: results[0].FirstName_en}
            lastname = {ua: results[0].LastName_ua, ru: results[0].LastName_ru, en: results[0].LastName_en}
            dayofbirth = results[0].DayOfBirth
            nationality = {ua: results[0].Nationality_ua, ru: results[0].Nationality_ru, en: results[0].Nationality_en}
            docnum = results[0].DocumentNumber
            dateex = results[0].DateOfExpiry
            dateiss = results[0].DateOfIssue
            kem = {ua: results[0].Authority_ua, ru: results[0].Authority_ru, en: results[0].Authority_en}
            itn = results[0].ITN
            sexText = {ua: results[0].Sex_ua, ru: results[0].Sex_ru, en: results[0].Sex_en}

        } else {
            console.log('Пользователь не найден в таблице');
            cheakAuth = false;
            res.render('authError')
        }
    });
    connection.end();

});



module.exports = router;
