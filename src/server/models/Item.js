const mongoose=require('mongoose');
const itemSchema=new mongoose.Schema({
    productName:String,
    address:String,
    itemOrderedAt:String,
    expiryDate:String,
    price:String,
    des:String,
    uri:String
});
const Item=mongoose.model("Item",itemSchema);
module.exports=Item;