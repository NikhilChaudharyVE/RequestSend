var express = require('express');
var router = express.Router();
var path=require('path');
const Router=require("express").Router();
const schema=require('../models/schema');
const bodyparser=require('body-parser');
const { prependOnceListener } = require('process');
var global;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
// register page

router.get('/register', function(req, res, next) {

  res.render('register');
console.log("id is => ",req.query.id)
const id=req.query.id;
router.post('/register',function(req,res){
  try{
    console.log("running Function ")
var{
    name,
    
    email,
    password,
  }=req.body;
  
  
  console.log(name);
  //if(password === cpassword){
    // password=await bcrypt.hash(password,9);
    // console.log("pass check ->"+password);
    var userData= new schema({
     name,
     email,
     password
    })
  
    userData.save(err=>{
     if(err){
       console.log("error is :---> ",err)
       
       res.render('dashboard', { name: ' email alredy exist' });
     }else{
      PointUpdate(id);
  res.render('dashboard',{name:'data stored succesfully'})
      
     }
    })
    
 }catch(error){
    console.log("if error :-",error)

    res.render('dashboard', { name: ' Error in code ' });
  }

 
})
});
//login
router.get('/login',function(req,res){

  res.render('login.ejs');
})
router.post('/login',async function(req,res){
  console.log("login function is run")
  try {
    
  var {
    email,
    password
  }=req.body;
  //const result=await
  schema.findOne({email:email },async(err,result)=>{
    //pass word  decrypt
    console.log("password value  before bcrypt => ",password);

  console.log(" stored password value => ", result.password);
      if(email===result.email && password===result.password)
    {
     global=result._id;
    console.log("id is := ",global)
         res.render('loginPage');
        console.log("login succesfull")
  
    }else{
      console.log("email doesnt match");
      res.render('dashboard', { name:'Email and Password are not Matched' });
    }
  })
  
} catch (error) {
    console.log("if error are ", error)
}
})

  router.post('/LoginPage',async function(req,res){
    sendRequestMail(req.body.email);
    console.log('sent req function has been run  ',req.body.email)
    console.log("global value are => ",global)
    setTimeout(() => {
      res.render('dashboard.ejs',{name:'email has been sent '})
    },15000)
   // PointUpdate();
  })
  // Email send Function
  const sendRequestMail=async(Eemail)=>{
    try{
      
      const nodemailer=require('nodemailer');
      const msg={
      from:"nikhilchaudharyb08@gmail.com",
      to:Eemail,
      subject:"nodemailer Testing",
      html: '<h1>This mail for registartion </h1><br><br><br><p>click here for registeration => <a href="http://localhost:3000/register?id='+global+'">click here</a></p>'
      };
      nodemailer.createTransport({
      service:'gmail',
      auth:{
      user:"nikhilchaudharyb08@gmail.com",
      pass:"vjdwpeguxvzvbcru"
      },
      port:465,
      host:"smtp.gmail.com"
      })
      .sendMail(msg,(err)=>{
      if(err){
      return console.log('error',err)
      }else{
      return console.log('Email sent');
      }
      })
      
        }catch(error){
          console.log(error.message)
        }
      }
      // point Updated function 

        const PointUpdate=async(id)=>{
          try {
            console.log("PointUpdateFunction is runniing ",id);
            schema.findOne({_id:id},async(err,result)=>{
              var updated=result.point;
              updated=updated+5;
              var update=await schema.updateOne({_id:id},{$set:{point:updated}})
            })
          } catch (error) {
            console.log("err are : ",error);
          }
        }