import express from "express";
import {Server} from "socket.io";
import {createServer} from "http";

const app=express();
const server=createServer(app);
const io = new Server(server);


var users=[];
var waiting=[];

const match=(user)=>{
    if(waiting.length==0){
        waiting.push(user);
    }else{
        let possible = [];
        waiting.forEach((e,i)=>{
            if(!user.blocklist.includes(e.socket.id)){
                possible.push({...e,index:i});
            }
        })
        if(possible.length){
            io.to(possible[0].socket.id).emit('match',{
                id:user.socket.id,
                ...user.socket.handshake.auth,
            });
            io.to(user.socket.id).emit('match',{
                id:possible[0].socket.id,
                ...possible[0].socket.handshake.auth,
            });

            waiting=waiting.filter(e=>{if(e==possible[0]){return false}else{return true}});
        }else{
            waiting.push(user);
        }
    }
}

io.on('connection', async (socket)=>{
    users= await (await io.sockets.fetchSockets()).map(e=>{return(
        {
            id:e.id,
            ...e.handshake.auth,
        }
    )});
    console.clear();
    console.log(users);
    console.log("Waiting",waiting.length);
    socket.on('find',(blocklist)=>{
        match({socket,blocklist});
    })
    socket.on('message',(data)=>{
        console.log(data);
        if(socket.id==data.from){
            socket.to(data.to).emit('message',data);
        }
    })
});


app.get('/test',(req,res)=>{
    console.log("😋");
    res.send("😋");
})


app.get('/clear',(req,res)=>{
    waiting=[];
    res.send("cleared");
})

server.listen(8080);