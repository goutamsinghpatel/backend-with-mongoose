const express=require("express");
app=express();
port=8080;
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended: true}));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const mongoose = require('mongoose');
const Chat=require("./models/chat.js")
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}
main().then((data)=>{
    console.log("ok");
})
.catch((err)=>{
    console.log(err)
})


app.listen(port,()=>{
    console.log("server started");

})
//index route//

app.get("/chats",async(req,res)=>{
    const allChats= await Chat.find();
  
   res.render("index.ejs",{allChats});
})
//create new //
app.get("/chats/new",(req,res)=>{
    res.render("create.ejs")
})
app.post("/chats",async(req,res)=>{
    let {from,to,mms}=req.body;
 newchats=new Chat({
    from:from,
    to:to,
    mms:mms,
    created_at:new Date(),    
})

 await newchats.save()
res.redirect("/chats")
})
//edit//
app.get("/chats/:id",(req,res)=>{
    let {id}=req.params;

   res.render("edit.ejs",{id})
})
//update//
app.patch("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let {changemms} =req.body;
let change = await  Chat.findByIdAndUpdate(id,{mms:changemms},{runValidators:true},{new:true})
    res.redirect("/chats")
 console.log(change);
  
})
//delete//
app.delete("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let deleteChat= await Chat.findByIdAndDelete(id)
    res.redirect("/chats");
})