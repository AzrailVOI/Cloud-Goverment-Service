var express = require('express');
var router = express.Router();
const mysql = require('mysql2/promise');

/* GET users listing. */

router.get('/', async function(req, res, next) {
    const cgsdb = await mysql.createConnection({
        host: '127.0.0.1',
        port: '3306',
        user: 'Wlad',
        password: 'QWErty1234',
        database: 'CGSDB1'
    });
    const world = await mysql.createConnection({
        host: '127.0.0.1',
        port: '3306',
        user: 'Wlad',
        password: 'QWErty1234',
        database: 'world'
    });
    let [...cgsdirt] = await cgsdb.execute(`select * from users`);
    let [...countries_dirt] = await world.execute(`SELECT * FROM country;`);
    let cgsusers = cgsdirt[0]
    let countries = countries_dirt[0]
    console.log(cgsusers)
    console.log(countries)
    let code_name_country = []
    countries.map((el)=>{
        code_name_country.push({code: el.Code, name: el.Name})
    })
    console.log("==================")
    console.log(code_name_country)
    res.render('signup', {
        options_country: code_name_country
    });
});
module.exports = router;
