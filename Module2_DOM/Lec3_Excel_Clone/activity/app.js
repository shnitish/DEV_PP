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
})

server.listen(5500, function(){
    console.log("Server started at port 5500 !!");
})