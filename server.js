const express = require("express");


const app = express();
const http = require('http').createServer(app);
app.use(express.static(__dirname+'/public'));
app.get("/",function(req,res){
    // console.log(req);
    res.sendFile(__dirname+'/index.html');
});

 const PORT=process.env.PORT||3000

// app.listen(3000,function(){
//     console.log("server started at port 3000")
// });
http.listen(PORT,()=>{
    console.log("server starting");
})
const io=require('socket.io')(http)

const users={};
io.on('connection',socket=>{
    socket.on ('new-user-joined',name=>{
        // console.log("hello ",name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    })
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id]; 
    })
})