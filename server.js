const io = require("socket.io")(4000,{
    cors:{
        origin:"*",
    },
});

const users = {}

io.on('connection', socket =>{
    socket.emit('message',"Welcome here...")
   socket.on('new_user', name=>{
       users[socket.id]=name;
       socket.broadcast.emit('user-connected',name);
   }) 
   socket.on('disconnect',()=>{
       socket.broadcast.emit("user-disconnected",users[socket.id])
       delete users[socket.id];
   });
   socket.on('new_message',message=>{
       socket.broadcast.emit('chat-message',{message:message,name:users[socket.id]})
   })

})