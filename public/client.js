const socket =io();

const form = document.getElementById('send-container');
const messageInput =document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

var audio = new Audio('sound.mp3');
function scrollToBottom() {
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }
const append =(message,position)=>{
    const messageElement =document.createElement("div");
    messageElement.innerHTML=message;
    messageElement.className = position;
    messageContainer.append(messageElement);
    if(position == "left message"){
        audio.play();
    }
    scrollToBottom();
}

  
  

form.addEventListener('submit',(e)=>{
     e.preventDefault();
     const message =messageInput.value;
append("You : "+message,'right message');
socket.emit('send',message);
messageInput.value =' '; 
})
var  Name =prompt("enter your name to join");
socket.emit('new-user-joined', Name);
console.log(Name)
socket.on('user-joined',Name=>{
append(Name + " joined the chat","left message"); 
})

socket.on('receive',data=>{
    append(data.message+" : "+  data.name,"left message")
    
})
socket.on('left',Name=>{
    append(Name+ " left the chat.","left message")
   
})
