let onlineList = document.querySelector(".online-list");

// emit username to server side from client side
// on custom event userConnected
socket.emit("userConnected", userName);

// append user joined msg to chat window
socket.on("join", function(dataObj){
    let joinDiv = document.createElement("div");
    joinDiv.classList.add("chat");
    joinDiv.classList.add("join");
    joinDiv.textContent = `A wild ${dataObj.userName} appeared`;
    chatWindow.append(joinDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    addInOnlineList(dataObj);
});

// append user left msg to chat window
socket.on("userDisconnected", function(dataObj){
    let userLeftDiv = document.createElement("div");
    userLeftDiv.classList.add("chat");
    userLeftDiv.classList.add("leave");
    userLeftDiv.textContent = `${dataObj.userName} left`;
    chatWindow.append(userLeftDiv);

    deleteFromOnlineList(dataObj.id);
});

// append sender's msg to chat window
socket.on("senderMsg", function(chatObj){
    let chatDiv = document.createElement("div");
    chatDiv.classList.add("chat");
    chatDiv.classList.add("left");
    chatDiv.textContent = chatObj.userName + " : " + chatObj.chat;
    chatWindow.scrollTop = chatWindow.scrollHeight;
    chatWindow.append(chatDiv); 
})

// append all online users to my list except me
socket.on("online-list", function(userList)
{
    for(let i = 0; i < userList.length; i++)
    {
        if(userList[i].id != socket.id)
        {
            let userDiv = document.createElement("div");
            userDiv.classList.add("user");
            userDiv.setAttribute("id", userList[i].id);
            userDiv.innerHTML = ` <div class="user-image">
                                  <img src="src/new.png" alt=""></div>
                                  <div class="user-name">${userList[i].userName}</div>`
            onlineList.append(userDiv);
        } 
    }
})

// delete left users from online list div
function deleteFromOnlineList(id)
{
    document.querySelector(`#${id}`).remove();
}

// add new users to online list div
function addInOnlineList(userObj)
{
    let userDiv = document.createElement("div");
    userDiv.classList.add("user");
    userDiv.setAttribute("id", userObj.id);
    userDiv.innerHTML = ` <div class="user-image">
                          <img src="src/new.png" alt=""></div>
                          <div class="user-name">${userObj.userName}</div>`
    onlineList.append(userDiv);
}