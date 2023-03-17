import express from "express";
import {Server} from "socket.io";
import {createServer} from "http";

const app=express();
const server=createServer(app);
const io = new Server(server);


var users=[];


io.on('connection', async (socket)=>{
    users= await (await io.sockets.fetchSockets()).map(e=>{return(
        {
            id:e.id,
            ...e.handshake.auth,
        }
    )});
    console.clear();
    console.log(users);
});


app.get('/test',(req,res)=>{
    console.log("😋");
    res.send("😋");
})
server.listen(8080);