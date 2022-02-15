const socket =io("http://localhost:4000");

const client_name=prompt("name?");
socket.emit('new_user',client_name);
userConnect('You have joined the room')

socket.on('user-connected',name=>{
    listName(`${name} joined`)
})

socket.on('user-disconnected',name=>{
    listName(`${name} left`)
})
socket.on('chat-message',data=>{
    addToChat(`${data.name}:${data.message} `)
})
socket.on("message",(message)=>{
    console.log(message);
})

document.getElementById('send_message').addEventListener('submit',e=>{
    e.preventDefault();
    addToChat(`You: ${document.getElementById('client_message').value}`);
    socket.emit('new_message',document.getElementById('client_message').value);
    document.getElementById('client_message').value="";
})
function addToChat(message){
    msgBox = document.createElement('div');
    msgBox.innerText=message;
    document.getElementById('mainchat').append(msgBox);
}
function listName(message){
    lstBox=document.createElement('div');
    lstBox.innerText=message;
    document.getElementById('listName').append(lstBox)
}
function userConnect(message){
    lstBox=document.createElement('div');
    lstBox.innerText=message;
    document.getElementById('userConnection').append(lstBox);
}