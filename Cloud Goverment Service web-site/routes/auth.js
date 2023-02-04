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
        username: "Petya",
        password: "1111"
    }
]
global.person = user
person.username = undefined
person.password = undefined
router.get('/', function(req, res, next) {
    res.render('auth', { });
});
router.post('/', async (req, res, next) => {
    await console.log("User " + req.body.uname + " " + req.body.pass);
    person.username = req.body.uname
    person.password = req.body.pass
    /*users.map((oneUser)=>{

    })*/
    if (users.map((oneUser)=>{return oneUser.username === person.username && oneUser.password === person.password;})){

        res.redirect("/profile")
    }else {

        res.send("Ошибка авторизации")
    }

    if (person.username === "Vlad"){
        global.middlename = "Illych"
        global.uname = "Vladyslav"
        global.lastname = "Ovcharuk"
        global.sexText = "male"
        global.dayofbirth = "14.01.2005"
        global.nationality = "Ukrainian"
        global.docnum = "0071734223"
        global.dateex = "21.01.2026"
        global.dateiss = "21.01.2021"
        global.kem = "1436"
        global.itn = "3435678899"
    }else if(person.username == "Petya"){
        global.middlename = "Pertovich"
        global.uname = "Petr"
        global.lastname = "Ronko"
        global.sexText = "male"
        global.dayofbirth = "12.02.2002"
        global.nationality = "Austrian"
        global.docnum = "0041412723"
        global.dateex = "25.05.2025"
        global.dateiss = "25.05.2020"
        global.kem = "1436"
        global.itn = "6535458877"
    }
});



module.exports = router;
