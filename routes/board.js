var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('./config/database');
var connection  = mysql.createConnection(dbconfig);

router.get('/list', function(req, res) {
    res.redirect('/board/1');
});
router.get('/list/:page',function (req,res) {
    var query=connection.query('select id,title,writer,hit,DATE_FORMAT(moddate, "%Y/%m/%d %T") as moddate from board',function (err,rows) {
        if(err)  console.log(err);
        console.log('rows : ',rows);
        res.render('list',{title:'Board List',rows:rows});
    })
});

router.get('/read/:id',function (req,res) {
    var query=connection.query('select title, content from board where id = "' +req.params.id  + '"',function (err,rows) {
        if(err)console.log(err);
        console.log('rows : ',rows);

        res.render('read',{rows:rows});
    })
});

module.exports = router;
