var express = require('express');
var router = express.Router();

const maria = require('../database/connect/maria');

maria.queryreturn("show tables;").then(value=> {console.log(value)})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/create', function(req,res){
  maria.query('CREATE TABLE DEPARTMENT ('
    + 'DEPART_CODE INT(11) NOT NULL,'
    + 'NAME VARCHAR(200) NULL DEFAULT NULL COLLATE utf8mb3_general_ci,'
    + 'PRIMARY KEY (DEPART_CODE) USING BTREE)', function(err,rows,fields){
      if(!err){
        res.send(rows);
      } else{
        console.log("err : "+err);
        res.send(err);
      }
    });
});

router.get('/drop', function(req,res){
  maria.query('DROP TABLE DEPARTMENT', function(err,rows,fields){
    if(!err){
      res.send(rows);
    } else{
      console.log("err : " + err);
      res.send(err);
    }
  });
});

router.get('/select', function(req,res){
  maria.query('SELECT * FROM DEPARTMENT', function(err,rows,fields){
    if(!err){
      res.send(rows);
    } else{
      console.log("err : "+err);
      res.send(err);
    }
  });
});



router.get('/api/get/demo', function(req,res){
  res.status(200).json({
    "message" : "call get api demo"
  });
});

router.post('/api/post/demo', function(req,res){
  res.status(200).json({
    "message" : " call post api demo"
  });
});


router.post('/reg',async(req,res)=>{
  var id = req.body.user_id;
  var pwd = req.body.user_pwd;
  var idoverlap = await maria.queryreturn(`select * from login where ID = '${id}' and PASSWORD = '${pwd}';`)
  if(idoverlap == 0){
    var regquery = await maria.queryreturn(`insert into login(ID,PASSWORD) values('${id}','${pwd}')`)
    if(regquery == 0){
      res.send("다시 시도해주세요!")
    } else{
      res.send("회원가입 성공!")
    }
  }
  else{
    res.send("이미 등록된 계정이 있습니다.")
  }
});
module.exports = router;
