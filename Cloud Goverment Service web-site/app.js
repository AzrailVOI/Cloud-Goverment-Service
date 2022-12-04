var createError = require('http-errors');
var express = require('express');
var path = require('path');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sass = require('node-sass');
const { Sequelize, DataTypes, Model, QueryTypes  } = require('sequelize')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(passport.initialize())
// app.use(passport.session())

app.use('/home', indexRouter);
app.use('/profile', usersRouter);
app.use('/', authRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//functions
function getTable(nametable) {
    return sequelize.query(`SELECT * FROM ${nametable}`, {type: QueryTypes.SELECT,})

}

//Id, Username, Password, AccessLevel       4, 'JohnAdmin', 'adminjn', 5
function sendtoTable(nametable, [...colums], [...values]) {
    let colel = ``
    let valel = ``
    colums.map((el)=>{
        if (el == colums[colums.length - 1]){
            colel = colel + el
        }else{
            colel = colel + el + `, `
        }
    });
    values.map((el)=>{
        if (el == values[values.length - 1]){
            valel = valel + el
        }else{
            valel = valel + el + `, `
        }

    });
    console.log("colel: ", colel, "\nvalel:", valel)
    return sequelize.query(`INSERT INTO ${nametable} (${colel}) VALUES (${valel})`);

}

function updateTable(nametable, [...colums], [...values], nameid, id) {
    let set = ``;
    let i = 0;
    colums.map((col)=>{
        if (col == colums[colums.length - 1]){
            set = set + col + "=" + values[i]
        }else {
            set = set + col + "=" + values[i] + ", "
        }
        i++
        /*values.map((val)=>{

        });*/
    });


    // return sequelize.query(`INSERT INTO ${nametable} (${colel}) VALUES (${valel})`);
    return sequelize.query(`UPDATE ${nametable} SET ${set} WHERE ${nameid} = ${id};`);

}
function entertoServer(serverhost, serverdialect, serverport, databasename, username, password) {
    return new Sequelize(databasename, username, password, {
        host: serverhost,
        dialect: serverdialect,
        port: serverport
    });
}

//Main Code

/*
const sequelize =  new Sequelize('CGSDB', 'Vlad', 'qwerty1', {
  host: 'MRowa-PC',
  dialect: 'mssql',
  // port: "1433"
});*/




const sequelize = entertoServer("MRowa-PC", 'mssql', '1433', 'CGSDB', 'Vlad', 'qwerty1')

sequelize
    .authenticate()
    .then(() => console.log('Connected.'))
    .catch((err) => console.error('Connection error: ', err))
var status = 0;
getTable('UsersTable')
    .then((data) => {
      // console.log(data[0].Username)
      console.log(data)

    })

getTable('UsersTable')
      .then((data) => {
        data.forEach((el) =>{
          let a = el.Username
          console.log(a)
          if (el.Username == "John4"){
            console.log("Nice")
            status = 1;
          }else{
            console.log("Not Nice")
          }
        })
          console.log(status)
          if (status === 0){
              sendtoTable('UsersTable', ['Id', 'Username', 'Password', 'AccessLevel'], [7, '\'John4\'', '\'pass4\'', 1]);
          }
      })

getTable('PassportsTable')
    .then((data)=>{
        let n = 1; //->3
        global.middlename = data[n].MiddleName;
        global.uname = data[n].FirstName;
        global.lastname = data[n].LastName;
        let sex = data[n].Sex
        if (sex === 1){
            global.sexText = "male"
        } else if(sex === 0){
            global.sexText = "female"
        } else {
            global.sexText = "other"
        }
        global.dayofbirth = data[n].DayOfBirth
        global.nationality = data[n].Nationality
        global.docnum = data[n].DocumentNumber
        global.dateex = data[n].DateOfExpiry
        global.dateiss = data[n].DateOfIssue
        global.kem = data[n].Authority
        global.itn = data[n].IndividualTaxpayerNumber
        let cols = Reflect.ownKeys(data[0])
        if (data[n].PassportId == 2){
            console.log(data)
        }else {
            sendtoTable('PassportsTable', cols, [2, 2, "'Vasia'", "'Prokofievich'", "'Pupkin'", 3, "'1921-01-14'", "'Ukraine'", 0071223134, "'2026-12-12'", "'1999-01-01'", "1433"])
            console.log(data)
        }
        // updateTable('PassportsTable', ['FirstName', 'MiddleName', 'LastName'], [`'Velky'`], 'PassportId', 4)
    })

module.exports = app;
