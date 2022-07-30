const express=require('express');
const bodyParser=require("body-parser");
const mongoose=require('mongoose');
const cors=require('cors');
const Item=require('./models/Item');
const app=express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://rahul:rahul@grid.4tfyk.mongodb.net/kryptoCart?retryWrites=true&w=majority",{useNewUrlParser:true})

app.get("/",function(req,res){
    res.send("Hello");
})

app.post("/insert",async function(req,res){
    const productName=req.body.name;
    const address=req.body.address;
    const itemOrderedAt=req.body.date;
    const warrenty=req.body.warrenty;
    const price=req.body.price;
    const item1=new Item({
        productName:productName,
        address:address,
        itemOrderedAt:itemOrderedAt,
        expiryDate:warrenty,
        price:price
    });  
    res.send("Items inserted");
    item1.save();
});

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