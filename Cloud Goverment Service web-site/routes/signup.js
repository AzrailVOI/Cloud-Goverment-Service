var express = require('express');
var router = express.Router();
const mysql = require('mysql2/promise');
const http = require("http")
const socketio = require('socket.io')
const cookieParser = require('cookie-parser');

/* GET users listing. */

const nodemailer = require('nodemailer');
/*Node Mail:
* login: cloud-goverment-service@list.ru
* password for account: CGS1130node#
* password for node.js: usAb4m3XwZBpRmpgFrYS
* */
var confirmCode = 0;
var confirmEmail = false
var confirmError = 0;

var userData={
    fname: this.fname,
    mname: this.fname,
    lname: this.fname,
    login: this.login,
    password: this.password,
    email: this.fname,
    confirm_code: this.confirm_code,
    country: this.fname
}
var signupCompleted = false;
router.get('/', async function(req, res, next) {
    const pageNumber = Number(req.query.page);
    console.log(`Страница номер ${req.query.page + "||" + pageNumber}`);

    if (pageNumber === 3){
        const cgsdb = await mysql.createConnection({
            host: '127.0.0.1',
            port: '3306',
            user: 'Wlad',
            password: 'QWErty1234',
            database: 'CGSDB1'
        });
        let [...cgsdirt] = await cgsdb.execute(`select * from users`);
        let [...countries_dirt] = await cgsdb.execute(`SELECT * FROM countries ORDER BY name;`);
        let cgsusers = cgsdirt[0]
        var countries = countries_dirt[0]
        console.log(cgsusers)
        // console.log(countries)
        var countriesSent = false;
    }

    if (pageNumber === 2){
        const cgsdb = await mysql.createConnection({
            host: '127.0.0.1',
            port: '3306',
            user: 'Wlad',
            password: 'QWErty1234',
            database: 'CGSDB1'
        });
        let [...confCodes] = await cgsdb.execute(`select email, confirm_code from users`);

            confCodes[0].map((el)=>{
                let randomCount = Math.floor(Math.random() * 900000) + 100000;
                if (randomCount == el.confirm_code){
                    let randomCount = Math.floor(Math.random() * 900000) + 100000;
                }else if (confirmError === 0){
                    confirmCode = randomCount
                    userData.confirm_code = confirmCode
                }
            })
        console.log(confirmCode);


        /*
        const transporter = nodemailer.createTransport({
                host: "smtp.mail.ru",
                port: 465,
                secure: true,
                auth: {
                    user: 'cloud-goverment-service@list.ru',
                    pass: 'usAb4m3XwZBpRmpgFrYS' }
            },
            {
                from: 'Mailer Test <cloud-goverment-service@list.ru>'
            });

// Определение объекта письма
        const mailOptions = {
            from: 'cloud-goverment-service@list.ru', // адрес электронной почты отправителя
            to: `${userData.email}`, // адрес электронной почты получателя
            subject: 'Test Node.js mail', // тема письма
            text: 'Test' // текст письма
        };

// Отправка письма
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Письмо успешно отправлено: ' + info.response);
            }
        });*/
    }







    var typedCode = 0;
    var typedCodeMsg = false;
    //SOCKET START
    var SignUpFormDataReceived = false
    io.on('connection', socket=> {
        console.log("New socket");

        if (!countriesSent && pageNumber === 3) {
            socket.emit('countries', countries);
            countriesSent = true;
        }
        if (!SignUpFormDataReceived && confirmEmail==true){
            socket.on('signup', (data) => {
                console.log('Response from server:', data);
                userData.email = data.email
                userData.login = data.login
                userData.password = data.password
                userData.fname = data.fname
                userData.mname = data.mname
                userData.lname = data.lname
                userData.country = data.country
                if (data.fullForm == true){
                    signupCompleted = true
                }


            })
            SignUpFormDataReceived = true
        }
        if (!typedCodeMsg){
            socket.on('typecode', (code)=>{
                typedCode = Number(code)
                typedCodeMsg = true
                console.log("TypeCode:", typedCode)
                console.log('typecode act')
                if (confirmCode === typedCode){
                    confirmEmail = true
                }else if (confirmCode != typedCode){
                    confirmEmail = false
                }
                socket.emit('sendcode', confirmEmail)
                console.log('sendcode act')
            })
            typedCodeMsg = true
        }







    })
    //SOCKET END



    if (req.query.page == undefined){
        res.redirect('/signup?page=1')
    }

    if (pageNumber === 3){
        if (confirmEmail == true){
            console.log("User data: ", userData, "SignUp:", signupCompleted)
            if (userData.login != undefined){
                const cgsdb = await mysql.createConnection({
                    host: '127.0.0.1',
                    port: '3306',
                    user: 'Wlad',
                    password: 'QWErty1234',
                    database: 'CGSDB1'
                });
                await cgsdb.execute(`INSERT INTO users (name, password, email, confirm_code) VALUES ('${userData.login}', '${userData.password}', '${userData.email}', '${userData.confirm_code}')`);

            }

        }else{
            confirmError = 1
            console.log(confirmEmail)
            res.redirect('/signup?page=2')
        }
    }
    res.render('signup')

});


router.post("/", async (req, res, next)=>{
    console.log('ok')

    if (req.body.confirm_email != undefined){
        res.redirect('/signup?page=3')
    }else if (req.body.fname != undefined){
        res.redirect('/signup?page=3')
    }
    else{
        res.redirect('/signup?page=2')
    }
})
module.exports = router;
