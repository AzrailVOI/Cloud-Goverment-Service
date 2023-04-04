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
var DBconnectionConfig = {
            host: '127.0.0.1',
            port: '3306',
            user: 'Wlad',
            password: 'QWErty1234',
            database: 'CGSDB1'
        }

var confirmCode = 0;
var confirmEmail = false
var confirmError = 0;
var emailAddress = ''
var currentPage = registration.current_page;
var completeSignUp = false
var isEmailNotExists = false
var isLoginNotExists = false
var isPage1TypedCorrect = null
function mailHTML(code){
    return `
<div class="container" style="font-family: 'Montserrat'; font-weight: 300; font-size: 1.15em; width: 75%; margin: 0 auto;">
    <h1 class="title" style="display: block; text-align: center; font-size: 2.1em; font-weight: 600;">Dear User!</h1>
    <div class="text" style="font-size: 1em;">
        <p>
            Thank you for registering with Cloud Government Service. To confirm your email address and complete the registration process, you are required to enter the following confirmation code:
        </p>
        <div class="code-div" style="display: block; margin: 0 auto; width: 100%; text-align: center;">
            <p class="code" style="display: inline-block; padding: 1rem 2rem; border: .3rem solid #000; border-radius: 2rem; font-size: 2.1em; font-weight: 600;">${code}</p>
        </div>
        <p>Please enter this code in the confirmation field.</p>
        <p>If you have any questions or issues while using our service, please do not hesitate to contact our <a href="support" class="support" style="font-family: 'Montserrat'; font-weight: 300; font-size: 1em;">support team</a></p>
        <div class="footer" style="margin-top: 2em;">
            <span style="display: block; padding-top: .5em;">Best regards,</span>
            <span style="display: block; padding-top: .5em; font-weight: 500;">Cloud Government Service Team</span>
        </div>

    </div>

</div>
    `
}

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
    var cgsdb = await mysql.createConnection(DBconnectionConfig);
    const pageNumber = Number(req.query.page);
    console.log(`Страница номер ${req.query.page + "||" + pageNumber}`);
    const isPage = pageNumber == currentPage
    if (!isPage){
        res.redirect(`/signup?page=${currentPage}`)
    }
    if (pageNumber === 3 && isPage){

        let [...cgsdirt] = await cgsdb.execute(`select * from users`);
        let [...countries_dirt] = await cgsdb.execute(`SELECT * FROM countries ORDER BY name;`);
        let cgsusers = cgsdirt[0]
        var countries = countries_dirt[0]
        console.log(cgsusers)
        // console.log(countries)
        var countriesSent = false;
    }








                                      /*SOCKET START*/
    var typedCode = 0;
    var typedCodeMsg = false;
    var SignUpFormDataReceived = false
    var sentMail = false;
    var checkEmailMess = false;
    var checkLoginMess = false;
    var typedPage1Mess = false;
    var typedPage1ErrMess = false;

    io.on('connection', socket=> {
        console.log("New signup socket");

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
        if (!checkEmailMess){
            socket.on('checkEmail', async email=>{
                let [...emails] = await cgsdb.execute(`select email from users`);
                console.log("Emails: ", emails[0])
                let isEmailInDB = false
                for (let i = 0; i < emails[0].length; i++) {
                    console.log('io', emails[0][i].email, email)
                    if (emails[0][i].email == email){
                        isEmailInDB = true
                    }
                }
                if (!isEmailInDB){
                    console.log('sent if')
                    socket.emit('emailError', false)
                    isEmailNotExists = true
                }else if (isEmailInDB){
                    console.log('sent else')
                    socket.emit('emailError', true)
                }
            })
            checkEmailMess = true
        }
        if (!checkLoginMess){
            socket.on('checkLogin', async login =>{
                let [...logins] = await cgsdb.execute(`select login from users`);
                let isLoginInDB = false
                for (let i = 0; i < logins[0].length; i++) {
                    // console.log('login', logins[0][i].login, login)
                    if (logins[0][i].login == login){
                        isLoginInDB = true
                    }
                }
                if (!isLoginInDB){
                    socket.emit('loginError', false)
                    isLoginNotExists = true
                }else if (isLoginInDB){
                    socket.emit('loginError', true)
                }
            })
        }
        if (!sentMail){
            socket.on('email', (email)=>{
                console.log("CE", confirmCode, email)
                if (isEmailNotExists){
                    emailAddress = email
                }else{
                    isEmailNotExists = false
                    isLoginNotExists = false
                }
                sentMail = true
            })
        }
        if (!typedPage1ErrMess){
            if (isPage1TypedCorrect === false && pageNumber == 1){
                socket.emit('typedPage1Err', false)
            }
            typedPage1ErrMess = true
        }
        if (!typedPage1Mess){
            socket.on('page1Typed', typeObj =>{
                if (typeObj.emailType && typeObj.passType && typeObj.loginType){
                    isPage1TypedCorrect = true
                }else {
                    isPage1TypedCorrect = false
                }
            })
            typedPage1Mess = true
        }







    })
                                      /*SOCKET END*/



    console.log("After Socket",isEmailNotExists, 'page', pageNumber)
    if (pageNumber === 2 && isPage && isEmailNotExists){

        let [...confCodes] = await cgsdb.execute(`select email, confirm_code from users`);
            confCodes[0].map((el)=>{
                let randomCount = Math.floor(Math.random() * 900000) + 100000;
                if (randomCount == el.confirm_code){
                    let randomCount = Math.floor(Math.random() * 900000) + 100000;
                }else if (confirmError === 0 && confirmCode == 0 && emailAddress != el.email){
                    confirmCode = randomCount
                    userData.confirm_code = confirmCode
                }
            })
        console.log(emailAddress, confirmCode);


        const transporter = nodemailer.createTransport({
                host: "smtp.mail.ru",
                port: 465,
                secure: true,
                auth: {
                    user: 'cloud-goverment-service@list.ru',
                    pass: 'usAb4m3XwZBpRmpgFrYS' }
            });

// Определение объекта письма
        const mailOptions = {
            from: 'cloud-goverment-service@list.ru', // адрес электронной почты отправителя
            to: `${emailAddress}`, // адрес электронной почты получателя
            subject: 'Confirm Code: Cloud Goverment Service', // тема письма
            html: mailHTML(confirmCode)
        };

// Отправка письма
        if (registration.status === 'new'){
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Письмо успешно отправлено: ' + info.response);
                }
            });
            registration.status = 'continue'
        }

    }else if (pageNumber === 2 && isPage && !isEmailNotExists){
        res.redirect('/signup?page=1')
    }









    if (req.query.page == undefined){
        res.redirect('/signup?page=1')
    }

    if (pageNumber === 4 && isPage){
        if (confirmEmail == true){
            console.log("User data: ", userData, "SignUp:", signupCompleted)
            if (userData.login != undefined){

                // await cgsdb.execute(`INSERT INTO users (login, password, email, confirm_code) VALUES ('${userData.login}', '${userData.password}', '${userData.email}', '${userData.confirm_code}')`);
                completeSignUp = true
                console.log(pageNumber, completeSignUp)

                if (completeSignUp){
                    registration.status = 'complete'
                    registration.current_page = 1
                    registration.name = `${userData.fname} ${userData.mname} ${userData.lname}`
                    confirmCode = 0;
                    confirmEmail = false
                    confirmError = 0;
                    emailAddress = ''
                    currentPage = registration.current_page;
                    completeSignUp = false
                    isEmailNotExists = false
                    isLoginNotExists = false
                    isPage1TypedCorrect = null
                    typedCode = 0;
                    typedCodeMsg = false;
                    SignUpFormDataReceived = false
                    sentMail = false;
                    checkEmailMess = false;
                    checkLoginMess = false;
                    typedPage1Mess = false;
                    typedPage1ErrMess = false;
                    res.redirect('/')
                }
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

    if (req.body.confirm_email != undefined && currentPage == 2){
        currentPage = 3
        registration.current_page = 3
        res.redirect('/signup?page=3')
    }else if (req.body.fname != undefined && currentPage == 3){
        currentPage = 4
        registration.current_page = 4
        res.redirect('/signup?page=3')
    }
    else if (currentPage == 1){

        console.log('To Page 2?', isPage1TypedCorrect)
        if (isPage1TypedCorrect){
            currentPage = 2
            registration.current_page = 2
            res.redirect('/signup?page=2')

        }else {
            currentPage = 1
            registration.current_page = 1
            res.redirect('/signup?page=1')
        }
    }
})
module.exports = router;
