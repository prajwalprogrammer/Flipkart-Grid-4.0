const express=require('express');
const bodyParser=require("body-parser");
const mongoose=require('mongoose');
const cors=require('cors');
const Item=require('./models/Item');
const dotenv = require('dotenv');
const twilio = require('twilio');
const https=require("https");
require('dotenv').config();

const {LINK,AUTH,ACCOUNT}=process.env

const accountSid =ACCOUNT; // Your Account SID from www.twilio.com/console
const authToken = AUTH; // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);
const app=express();
app.use(express.json());
app.use(cors());

mongoose.connect(LINK,{useNewUrlParser:true})

app.get("/",function(req,res){
    res.send("Hello");
})

app.post("/insert",async function(req,res){
    const productName=req.body.name;
    const address=req.body.address;
    const itemOrderedAt=req.body.date;
    const warrenty=req.body.warrenty;
    const price=req.body.price;
    const des=req.body.des;
    const uri=req.body.uri;
    const item1=new Item({
        productName:productName,
        address:address,
        itemOrderedAt:itemOrderedAt,
        expiryDate:warrenty,
        price:price,
        des:des,
        uri:uri,
    });  
    res.send("Items inserted");
    item1.save();
});

app.post("/sendMes",async function(req,res){
    const phoneNumber=req.body.phone;
    console.log(phoneNumber);
    client.messages
    .create({
        body: 'Your warrenty card is ready. You can claim your warrenty card at NEW WARRENTIES section.',
        to: '+91'+phoneNumber, // Text this number
        from: '+19788787732', // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));

})

app.get("/read",function(req,res){
    Item.find({},(err,result)=>{
        if(err){
            res.send(err);
        }
        res.send(result);
    })
});

app.delete("/delete/:id",function(req,res){
    const id=req.params.id;
    Item.findByIdAndRemove(id).exec();
})

app.listen(3001,function(){
    console.log("Server has started on port 3001");
})