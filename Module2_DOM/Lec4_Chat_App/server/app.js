const express = require("express");
const {Server} = require("socket.io");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

let userList = [];

// default template in public directory
app.use(express.static("public"));

io.on("connection", function(socket){
    console.log(socket.id + " connected !!!");

    // when a user connects
    socket.on("userConnected", function(userName)
    {
        let userObject = {id: socket.id, userName: userName};
        userList.push(userObject);

        // for self and show who's online except me 
        socket.emit("online-list", userList);

        // broadcast a msg to all other clients when a user joined, except user
        socket.broadcast.emit("join", userObject);
        console.log(userList);
    });

    // when a user sends a msg
    socket.on("chat", function(chatObj)
    {
        socket.broadcast.emit("senderMsg", chatObj);
    });

    // when a user disconnects
    socket.on("disconnect", function(){
        let leftUserObj;
        let remainingUsers = userList.filter(function(userObj)
        {
            if(userObj.id == socket.id)
            {
                leftUserObj = userObj;
                return false;
            }
            return true;
        });
        userList = remainingUsers;
        socket.broadcast.emit("userDisconnected", leftUserObj);
    });   
})

server.listen(5500, function(){
    console.log("Server started at port 5500 !!");
})