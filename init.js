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
const allChats=[{
    from:"banna",
    to:"goutam",
    mms:"hello",
    created_at:new Date()
},
{
    from:"chetan",
    to:"goutam",
    mms:"hello 2",
    created_at:new Date() 
},{
from:"banna",
to:"chetan",
mms:"hello3",
created_at:new Date()},
{
    from:"goutam",
    to:"chetan",
    mms:"hello4",
    created_at:new Date()},{
        from:"narendra",
        to:"chetan",
        mms:"hello5",
        created_at:new Date()},
        {
            from:"chetan",
            to:"banna",
            mms:"hello3",
            created_at:new Date()},

]

Chat.insertMany(allChats)
 
