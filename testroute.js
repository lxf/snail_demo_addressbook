var express=require('express');
var router=express.Router();

router.use(function Test1(req,res,next){
	console.log('每次都会走这:'+new Date());
	next();
});

router.get('/',function(req,res){
	res.send('hello 这是express.router');
});

router.get('/test',function(req,res){
	res.send('test');
});

module.exports=router;