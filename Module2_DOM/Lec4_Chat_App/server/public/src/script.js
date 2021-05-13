let chatInput = document.querySelector(".chat-input");
let chatWindow = document.querySelector(".chat-window");
let myName = document.querySelector(".me .user-name");

let userName = prompt("Enter your name");
myName.textContent = userName;

chatInput.addEventListener("keypress", function(e){
    if(e.key == "Enter" && chatInput.value)
    {
        let chatDiv = document.createElement("div");
        chatDiv.classList.add("chat");
        chatDiv.classList.add("right");
        chatDiv.textContent = userName + " : " + chatInput.value;
        chatWindow.append(chatDiv);
        
        // when user send a chat msg to chat window, emit a socket event for server
        socket.emit("chat", {userName, chat: chatInput.value});
        chatInput.value = "";

        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
});